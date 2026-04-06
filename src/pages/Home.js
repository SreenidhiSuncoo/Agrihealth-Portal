import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="main-card" style={{ maxWidth: "560px" }}>
      <h1>🌿 AgriHealth Portal</h1>
      <p className="subtitle">
        Smart plant disease detection using AI — upload a leaf image and get instant diagnosis.
      </p>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        {[
          { number: "38", label: "Disease Classes" },
          { number: "97%", label: "Accuracy" },
          { number: "54K+", label: "Images Trained" }
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1,
            background: "rgba(255,255,255,0.4)",
            borderRadius: "14px",
            padding: "14px 8px",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ fontSize: "22px", fontWeight: "600", color: "#2e7d32" }}>{s.number}</div>
            <div style={{ fontSize: "11px", color: "#5f6f63" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ textAlign: "left", marginBottom: "24px" }}>
        {[
          { icon: "📸", title: "Image Upload", desc: "Upload any leaf photo for instant AI diagnosis" },
          { icon: "🎤", title: "Voice Input", desc: "Describe symptoms using your voice" },
          { icon: "🧬", title: "ML Powered", desc: "MobileNetV2 model trained on 54,000+ images" },
          { icon: "📊", title: "Disease Library", desc: "Browse info on 38 plant diseases" }
        ].map((f, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "12px",
            borderRadius: "12px",
            marginBottom: "8px",
            background: "rgba(255,255,255,0.3)"
          }}>
            <span style={{ fontSize: "22px" }}>{f.icon}</span>
            <div>
              <div style={{ fontWeight: "500", color: "#1b3a2a", fontSize: "14px" }}>{f.title}</div>
              <div style={{ fontSize: "12px", color: "#5f6f63" }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-primary" style={{ width: "100%" }}
        onClick={() => navigate("/diagnose")}>
        Start Diagnosis →
      </button>
    </div>
  );
}

export default Home;