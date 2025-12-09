import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import multer from "multer";
import FormData from "form-data";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const Postgres_password=process.env.Postgres_password;

const port=5000;
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"Scan-ai",
  password:Postgres_password,
  port:5432
});
db.connect();

// Multer in-memory storage (NO file writing)
const upload = multer({ storage: multer.memoryStorage() });

app.post("/post/invoice",upload.single("file"), async(req,res)=>{
  console.log("inside the invoice route");

  try{ 
   // File comes in req.file
  const file = req.file;
  console.log("file:",{
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  });
  console.log("body",req.body);

  // Convert PDF to Base64
  const base64PDF = file.buffer.toString("base64");

  //gemini url
  const GEMINI_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  //gemini prompt
  const extractionPrompt = `
Extract all invoice fields from the PDF.
Return ONLY a JSON object with the following fields:

{
    "invoice_number": "INV-001",
    "invoice_date": "2024-01-10",
    "due_date": "2024-01-25",
    "seller_name": "ACME GmbH",
    "buyer_name": "Example AG",
    "currency": "EUR",
    "net_total": 50.0,
    "tax_amount": 9.5,
    "gross_total": 59.5,
    "line_items": [
      {
        "description": "Product A",
        "quantity": 10,
        "unit_price": 5.0,
        "line_total": 50.0
      }
    ]
  }

Rules:
- If incorrect or missing, put null.
- Dates must be in YYYY-MM-DD.
- Numbers must be integers or floats without currency symbols.
- Do NOT include explanations, only JSON.
`;
  //gemini call
  const response = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: base64PDF,
                },
              },
              { text: extractionPrompt },
            ],
          },
        ],
      },
      { timeout: 120000 }
    );
  //extract responce from gemini
  let output = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("gemini output is :", output);

  if (!output) {
    console.log("No text output from Gemini.");
    return res.json({
      ok: false,
      extracted: null,
      raw: output,
      message: "No text returned from Gemini. Check prompt or response shape."
    });
  }

  // CLEAN + PARSE GEMINI JSON
  let extractedJSON = null;
  let cleaned = output || "";

  // 1) Remove ```json or ``` wrappers if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/```json/i, "")   // remove opening ```json
      .replace(/```/g, "")       // remove any remaining ```
      .trim();
  }

  // 2) Extract JSON from the first '{' to the last '}'
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = cleaned.slice(firstBrace, lastBrace + 1);

    try {
      extractedJSON = JSON.parse(candidate);
    } catch (err) {
      console.log("JSON.parse failed even after cleaning:", err);
      console.log("candidate that failed:", candidate);
    }
  } else {
    console.log("No JSON object found in output after cleaning.");
  }

    //return result
    console.log("result is ready: ",extractedJSON);
    return res.json({
      ok: true,
      extracted: extractedJSON,
      raw: output,
    });

  }catch(error){
    console.log("the final gemini output shows error:",error.response?.data || error.message)
    //return res.status(500).json({error: "Failed to process invoice",detail: error.response?.data || error.message,});
  }
});

app.post("/post/general",upload.single("file"),async(req,res)=>{
  console.log("inside general route");
  try{
  const file = req.file;
  const { generalAction, generalPrompt } = req.body;

  console.log("file:",{
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  });
  console.log("body",req.body);

  // Convert PDF to Base64
  const base64PDF = file.buffer.toString("base64");

  //gemini url
  const GEMINI_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  //gemini prompt
  const prompt = `
You are an AI assistant processing a generic PDF.
User has selected the task: "${generalAction}".

Additional user instruction (optional):
"${generalPrompt || "No extra instruction"}"

Read the entire PDF carefully and produce the output accordingly and quickly.

Rules:
- Your response MUST be plain text only.
- Do NOT wrap the output in markdown or code fences.
- If summarizing → produce 8–12 bullet points.
- If extracting headings → list the most important section titles.
- If Q&A →generate relatable questions and answer concisely using content from the PDF only.
- If custom instruction → follow it exactly.
    `;

  // Call Gemini
  const response = await axios.post(
    GEMINI_URL,
      {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: base64PDF,
                },
              },
              { text: prompt },
            ],
          },
        ],
      },
      { timeout: 120000 }
    );

  // Extract Gemini output (TEXT only)
  const output =response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  console.log("general PDF output:", output);

  return res.json({
    ok: true,
    action: generalAction,
    output,
  });
  }catch(error){
    console.log("error in general route:",error.response?.data || error.message);
    return res.status(500).json({
      ok: false,
      error: error.response?.data || error.message,
    });
  }
});

// Simple login route: store user in PostgreSQL and return the record
app.post("/auth/login", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ ok: false, error: "Name and email are required" });
    }

    // Insert or update user by email
    const result = await db.query(
      `
      INSERT INTO scanai_users (name, email)
      VALUES ($1, $2)
      ON CONFLICT (email)
      DO UPDATE SET name = EXCLUDED.name
      RETURNING id, name, email, created_at;
      `,
      [name.trim(), email.trim()]
    );
    console.log("inserted into postgress");

    const user = result.rows[0];

    return res.json({
      ok: true,
      user,
    });
  } catch (err) {
    console.error("Error in /auth/login:", err);
    return res.status(500).json({
      ok: false,
      error: "Failed to login user",
    });
  }
});


app.listen(port,()=>{
  console.log("the server is running at",port);
});