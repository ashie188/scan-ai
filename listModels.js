// listModels.js
import axios from "axios";

const API_KEY = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";

async function listModels() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    const resp = await axios.get(url, { timeout: 20000 });
    const models = resp.data.models || [];
    console.log("Found models:", models.length);

    // Print each model name + any available metadata keys
    models.forEach((m) => {
      console.log("-----");
      console.log("name:", m.name);
      if (m.displayName) console.log("displayName:", m.displayName);
      // print any listed "supportedMethods" or "capabilities" if present
      if (m.supportedMethods) {
        console.log("supportedMethods:", m.supportedMethods);
      } else if (m.description) {
        console.log("description:", m.description.slice(0, 200));
      }
    });

    // check specifically for gemini-1.5-flash
    const want = "models/gemini-1.5-flash";
    const found = models.find((x) => x.name === want);
    if (found) {
      console.log("\n✅ model found:", want);
      if (found.supportedMethods) console.log("supportedMethods:", found.supportedMethods);
    } else {
      console.log(`\n❌ ${want} not found in the list for this key.`);
    }
  } catch (err) {
    console.error("Error listing models:", err.response?.data ?? err.message ?? err);
    process.exit(1);
  }
}

listModels();
