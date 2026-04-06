import React, { useState } from "react";
import "../App.css";

function Diagnose() {
  const [result, setResult] = useState(null);
  const [diseases, setDiseases] = useState([]);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const runAnalysis = async () => {
    if (!imageFile) {
      return alert("Please upload a leaf image first!");
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "server_error", message: "Server not responding. Make sure all servers are running." });
    } finally {
      setLoading(false);
    }
  };

  const startVoice = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return alert("Voice not supported in this browser");
    const rec = new Speech();
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      alert(`Voice captured: "${text}" — Please also upload a leaf image to analyze.`);
    };
    rec.start();
  };

  const fetchRecords = async () => {
    const res = await fetch("http://localhost:5000/diseases");
    const data = await res.json();
    setDiseases(data);
  };

  return (
    <div className="main-card">
      <h1>Diagnose Plant</h1>

      {/* IMAGE PREVIEW */}
      <div className="preview-box">
        {preview ? (
          <img src={preview} alt="Leaf preview" style={{ maxWidth: "100%", maxHeight: "250px", borderRadius: "8px" }} />
        ) : (
          <p>Upload a leaf image to diagnose</p>
        )}
      </div>

      {/* UPLOAD + VOICE */}
      <div className="row">
        <input
          type="file"
          id="upload"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="upload" className="btn-primary">
          Upload Leaf Image
        </label>
        <button className="btn-primary" onClick={startVoice}>
          Voice
        </button>
      </div>

      {/* ANALYZE BUTTON */}
      <button
        className="btn-primary"
        onClick={runAnalysis}
        disabled={loading}
        style={{ marginTop: "12px", width: "100%" }}
      >
        {loading ? "Analyzing..." : "Run Diagnostics"}
      </button>

      {/* ✅ HEALTHY or ⚠️ DISEASED result */}
      {result && !result.error && (
        <div className="status-chip" style={{
          backgroundColor: result.is_healthy ? "#e6f4ea" : "#fce8e6",
          color: result.is_healthy ? "#2d6a4f" : "#c0392b",
          padding: "16px",
          borderRadius: "8px",
          marginTop: "16px"
        }}>
          <h3 style={{ margin: "0 0 8px" }}>
            {result.is_healthy ? "✅ Healthy Plant" : "⚠️ Disease Detected"}
          </h3>
          <p style={{ margin: "4px 0" }}><strong>Plant:</strong> {result.plant}</p>
          <p style={{ margin: "4px 0" }}><strong>Condition:</strong> {result.condition}</p>
          <p style={{ margin: "4px 0" }}><strong>Confidence:</strong> {result.confidence}%</p>
        </div>
      )}

      {/* 🌿 NOT A LEAF warning */}
      {result && result.error === "not_a_leaf" && (
        <div className="status-chip" style={{
          backgroundColor: "#fff8e1",
          color: "#f57f17",
          padding: "16px",
          borderRadius: "8px",
          marginTop: "16px",
          border: "1px solid #ffe082"
        }}>
          <h3 style={{ margin: "0 0 8px" }}>🌿 Not a Valid Leaf Image</h3>
          <p style={{ margin: "4px 0" }}>{result.message}</p>
          <p style={{ margin: "4px 0", fontSize: "12px" }}>
            Confidence was only {result.confidence}% — too low to diagnose.
          </p>
        </div>
      )}

      {/* ❌ SERVER ERROR */}
      {result && result.error === "server_error" && (
        <div className="status-chip" style={{
          backgroundColor: "#fce8e6",
          color: "#c0392b",
          padding: "16px",
          borderRadius: "8px",
          marginTop: "16px"
        }}>
          <h3 style={{ margin: "0 0 8px" }}>❌ Error</h3>
          <p style={{ margin: "4px 0" }}>{result.message}</p>
        </div>
      )}

      {/* DISEASE DATABASE */}
      <button
        className="btn-secondary"
        onClick={fetchRecords}
        style={{ marginTop: "16px", width: "100%" }}
      >
        View Disease Data
      </button>

      <div className="disease-list">
        {diseases.map((d, i) => (
          <div className="disease-card" key={i}>
            <h4>{d.name}</h4>
            <p>{d.cure}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Diagnose;