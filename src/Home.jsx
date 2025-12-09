// src/Home.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import ResultPanel from "./ResultPanel";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function Home() {
  const [mode, setMode] = useState("invoice"); // "invoice" | "general"
  const [file, setFile] = useState(null);
  const [generalAction, setGeneralAction] = useState("summarize"); // new state for general mode selection
  const [generalPrompt, setGeneralPrompt] = useState(""); // only used when custom chosen
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // SINGLE function: handles file input selection and basic validation
  function handleFileChange(e) {
    const chosen = e.target.files?.[0] ?? null;
    if (!chosen) {
      setFile(null);
      return;
    }
    if (chosen.type !== "application/pdf") {
      alert("Please select a PDF file (.pdf)");
      setFile(null);
      e.target.value = "";
      return;
    }
    if (chosen.size > MAX_FILE_SIZE) {
      alert("File too large. Max 15 MB.");
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(chosen);
  }

  async function evalute(){
    console.log("inside the evalute");
    //creating form data to send the file to backend(can't directly send the file)
    const form = new FormData();
    form.append("file", file);
    form.append("mode", mode);
    form.append("generalAction", mode === "general" ? generalAction : "");
    form.append("generalPrompt", mode === "general" ? generalPrompt : "");
    console.log(form);
    setLoading(true);
    setError("");
    setResult(null);

    try{
      let response;
      if(mode==="invoice"){ //invoice pdf
        console.log("calling the invoice route");
        response=await axios.post("http://localhost:5000/post/invoice",form);

      }else{ //general pdf
        console.log("calling the general route");
        response=await axios.post("http://localhost:5000/post/general",form);

      }
      console.log("backend result:", response.data);
      setResult(response.data);
    }catch(err){
      console.log("error while doing evaluate, the error is",err);
      setError(err?.response?.data?.error || err.message || "Something went wrong");
    }finally {
      setLoading(false);
    }
  }

  return (
    <div className="home-root">
      {/* HERO / INTRO */}
      <section className="hero-intro">
        <div className="intro-wrap">
          <div className="intro-left">
            <h1 className="brand-title">Scan-AI — Intelligent PDF & Invoice Assistant</h1>

            <p className="lead">
              Upload an invoice or any PDF and get fast, reliable outputs — invoices turned into
              structured fields ready for ingestion, or document-level summaries, Q&A and
              custom transformations. Built with privacy-first principles: files are sent only to
              your backend so keys and control remain with you.
            </p>

            <div className="cta-row">
              <button
                className={`cta ${mode === "invoice" ? "cta-active" : ""}`}
                onClick={() => { setMode("invoice"); }}
              >
                Invoice PDF
              </button>
              <button
                className={`cta ${mode === "general" ? "cta-active muted" : "muted"}`}
                onClick={() => { setMode("general"); }}
              >
                General PDF
              </button>
            </div>
          </div>

          <div className="intro-right">
            <div className="promo-card">
              <div className="promo-title">One interface — many outcomes</div>
              <div className="promo-body">
                <ul>
                  <li><strong>Invoice mode:</strong> field extraction + QC rules</li>
                  <li><strong>General mode:</strong> summarize, extract, ask questions</li>
                  <li><strong>Control:</strong> all model calls run on your server</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODE CHOOSER + UPLOAD */}
      <main className="main-wrap">
        <section className="choose-row">
          <div className={`mode-box ${mode === "invoice" ? "selected" : ""}`} onClick={() => setMode("invoice")}>
            <div className="mode-header">Invoice PDF</div>
            <div className="mode-note">Extract invoice number, date, totals, parties & run QC.</div>
          </div>

          <div className={`mode-box ${mode === "general" ? "selected" : ""}`} onClick={() => setMode("general")}>
            <div className="mode-header">General PDF</div>
            <div className="mode-note">Summarize, extract headings, Q&A or custom prompts.</div>
          </div>
        </section>

        <section className="upload-panel">
          {/* Left: Upload area */}
          <div className="upload-left">
            <div className="upload-head">
              <h3>{mode === "invoice" ? "Invoice Upload" : "PDF Upload"}</h3>
              <p className="upload-sub">{mode === "invoice" ? "We will extract invoice fields." : "Choose what you'd like to extract (General PDF)."}</p>
            </div>

            {/* Hidden input triggered by label */}
            <label className="drop-area">
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="visually-hidden"
              />
              <div className="drop-content">
                <div className="drop-emoji">📁</div>
                <div className="drop-title">Click to choose a PDF or drop it from your desktop</div>
                <div className="drop-sub">Accepted: .pdf • Max size: 10 MB</div>
                <p className="enter-link">click to enter</p>
              </div>
            </label>

            {/* GENERAL MODE: show selection UI for what to extract */}
            {mode === "general" && (
              <div className="general-options" style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Choose what to extract</div>

                <label className="option-row">
                  <input
                    type="radio"
                    name="generalAction"
                    value="summarize"
                    checked={generalAction === "summarize"}
                    onChange={(e) => setGeneralAction(e.target.value)}
                  />
                  <span className="option-text"><strong>Summarize</strong> — short, manager-friendly summary</span>
                </label>

                <label className="option-row">
                  <input
                    type="radio"
                    name="generalAction"
                    value="extract_headings"
                    checked={generalAction === "extract_headings"}
                    onChange={(e) => setGeneralAction(e.target.value)}
                  />
                  <span className="option-text"><strong>Extract Headings</strong> — list headings & sections</span>
                </label>

                <label className="option-row">
                  <input
                    type="radio"
                    name="generalAction"
                    value="qna"
                    checked={generalAction === "qna"}
                    onChange={(e) => setGeneralAction(e.target.value)}
                  />
                  <span className="option-text"><strong>Q&A</strong> — ask custom questions after processing  </span>
                </label>

                <label className="option-row">
                  <input
                    type="radio"
                    name="generalAction"
                    value="custom"
                    checked={generalAction === "custom"}
                    onChange={(e) => setGeneralAction(e.target.value)}
                  />
                  <span className="option-text"><strong>Custom prompt</strong> — provide a short instruction</span>
                </label>

                {/* show prompt box only when custom selected */}
                {generalAction === "custom" && (
                  <textarea
                    className="textarea customtextarea"
                    placeholder="Enter a short instruction for the model (e.g., 'Extract 5 key takeaways aimed at product managers')"
                    value={generalPrompt}
                    onChange={(e) => setGeneralPrompt(e.target.value)}
                    style={{ marginTop: 10 }}
                  />
                )}
              </div>
            )}

            {file ? (
              <div className="file-card">
                <div className="file-left">
                  <div className="file-name">{file.name}</div>
                  <div className="file-meta">{(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}</div>
                </div>
                <div className="file-actions">
                  <button
                    className="file-clear"
                    onClick={() => {
                      setFile(null);
                      if (inputRef.current) inputRef.current.value = "";
                    }}
                  >
                    Clear
                  </button>
                  <button
                    className="file-go"
                    onClick={evalute}
                      // placeholder start: user will implement backend call
                      /*const payload = {
                        mode,
                        fileName: file.name,
                        generalAction: mode === "general" ? generalAction : null,
                        generalPrompt: mode === "general" ? generalPrompt : null,
                      };
                      alert("Start upload (implement backend). Payload preview in console.");
                      console.log(payload);*/
                  >
                    Start
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-file">No file chosen yet</div>
            )}
          </div>

          {/* Right: Mode info */}
          <aside className="upload-right">
            <div className="info-card">
              <h4>{mode === "invoice" ? "Invoice fields (typical)" : "General PDF actions"}</h4>
              {mode === "invoice" ? (
                <ul>
                  <li><strong>Identifiers:</strong> invoice_number, external_reference</li>
                  <li><strong>Parties:</strong> seller_name, buyer_name, tax IDs</li>
                  <li><strong>Dates:</strong> invoice_date, due_date</li>
                  <li><strong>Money:</strong> currency, net_total, tax_amount, gross_total</li>
                  <li><strong>Line items:</strong> description, qty, unit_price (when available)</li>
                </ul>
              ) : (
                <ul>
                  <li>Summaries (short/long)</li>
                  <li>Extract headings, tables, or key paragraphs</li>
                  <li>Answer questions about the document</li>
                  <li>Custom instruction (when 'Custom prompt' chosen)</li>
                </ul>
              )}
            </div>

            <div className="privacy-card">
              <strong>Privacy</strong>
              <p>All files are processed on your backend. Keep your API keys secure — never embed them in the frontend.</p>
            </div>
          </aside>
        </section>

        {/* 🔽 RESULT PANEL HERE */}
        <ResultPanel
          mode={mode}
          result={result}
          loading={loading}
          error={error}
        />

        {/* WHY SCAN-AI section */}
        <section className="why-section">
          <div className="why-left">
            <h2 className="why-title">Why choose Scan-AI?</h2>
            <p className="why-lead">
              Scan-AI is built to speed up document workflows while reducing errors.
              We combine targeted extraction logic and LLM-powered understanding so teams
              can trust outputs and focus on decisions, not data-entry.
            </p>

            <div className="why-cards">
              <div className="why-card">
                <div className="why-icon">⚡</div>
                <div className="why-info">
                  <div className="why-heading">Fast & Accurate</div>
                  <div className="why-desc">Extract structured data in seconds and validate totals & dates automatically.</div>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon">🔒</div>
                <div className="why-info">
                  <div className="why-heading">Privacy-first</div>
                  <div className="why-desc">All processing happens on your server — you control the model and keys.</div>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon">🔧</div>
                <div className="why-info">
                  <div className="why-heading">Integratable</div>
                  <div className="why-desc">JSON outputs are ready for ingestion into ERPs, accounting tools, or data pipelines.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="why-right">
            <div className="demo-box">
              <div className="demo-head">Use cases</div>
              <ul>
                <li>Automated invoice posting for finance teams</li>
                <li>Fast research summaries for product managers</li>
                <li>Customer contract clause extraction for legal</li>
              </ul>
              <div className="demo-cta">
                <button className="demo-btn" onClick={() => alert("Demo — link to docs or video")}>See demo</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

  );
}
