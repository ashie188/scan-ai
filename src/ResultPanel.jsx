// src/ResultPanel.jsx
import React, { useState } from "react";

export default function ResultPanel({ mode, result, loading, error }) {
  const [copied, setCopied] = useState(false);

  // Nothing to show yet
  if (!loading && !error && !result) return null;

  // Decide what text to copy based on mode/result
  let copyText = "";
  if (result) {
    if (mode === "invoice") {
      copyText = JSON.stringify(result?.extracted || {}, null, 2);
    } else if (mode === "general") {
      copyText = result?.output || "";
    }
  }

  async function handleCopy() {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <section className="result-panel">
      <div className="result-header-row">
        <h1 className="result-title">Result</h1>

        {!loading && !error && result && (
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        )}
      </div>

      {loading && (
        <div className="result-box muted">
          Processing your PDF… please wait.
        </div>
      )}

      {error && (
        <div className="result-box error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && result && mode === "invoice" && (
        <InvoiceResult result={result} />
      )}

      {!loading && !error && result && mode === "general" && (
        <GeneralResult result={result} />
      )}
    </section>
  );
}

// Expecting backend response: { ok, extracted, raw } for invoice
function InvoiceResult({ result }) {
  const inv = result?.extracted || {};

  return (
    <div className="result-box">
      <div className="result-grid">
        <ResultRow label="Invoice number" value={inv.invoice_number} />
        <ResultRow label="Invoice date" value={inv.invoice_date} />
        <ResultRow label="Due date" value={inv.due_date} />
        <ResultRow label="Seller" value={inv.seller_name} />
        <ResultRow label="Buyer" value={inv.buyer_name} />
        <ResultRow label="Currency" value={inv.currency} />
        <ResultRow label="Net total" value={inv.net_total} />
        <ResultRow label="Tax amount" value={inv.tax_amount} />
        <ResultRow label="Gross total" value={inv.gross_total} />
      </div>

      {Array.isArray(inv.line_items) && inv.line_items.length > 0 && (
        <>
          <h3 className="sub-title">Line items</h3>
          <div className="line-table">
            <div className="line-head">
              <span>Description</span>
              <span>Qty</span>
              <span>Unit price</span>
              <span>Line total</span>
            </div>
            {inv.line_items.map((item, idx) => (
              <div className="line-row" key={idx}>
                <span>{item.description}</span>
                <span>{item.quantity}</span>
                <span>{item.unit_price}</span>
                <span>{item.line_total}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Expecting backend response: { ok, action, output } for general
function GeneralResult({ result }) {
  const text = result?.output || "";

  return (
    <div className="result-box">
      <pre className="result-text">
        {text || "No output returned from backend."}
      </pre>
    </div>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className="result-row">
      <span className="result-label">{label}</span>
      <span className="result-value">
        {value === null || value === undefined || value === "" ? "—" : String(value)}
      </span>
    </div>
  );
}
