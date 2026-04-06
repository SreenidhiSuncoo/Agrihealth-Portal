import { useEffect, useState } from "react";

function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, diseased: 0, healthy: 0, invalid: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/logs")
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setStats({
          total: data.length,
          healthy: data.filter(d => d.status === "healthy").length,
          diseased: data.filter(d => d.status === "diseased").length,
          invalid: data.filter(d => d.status === "invalid").length,
        });
        setLoading(false);
      });
  }, []);

  const getStatusStyle = (status) => {
    if (status === "healthy") return { border: "#27ae60", bg: "rgba(39,174,96,0.08)", color: "#27ae60", label: "✅ Healthy", };
    if (status === "diseased") return { border: "#c0392b", bg: "rgba(192,57,43,0.08)", color: "#c0392b", label: "⚠️ Diseased", };
    return { border: "#f57f17", bg: "rgba(245,127,23,0.08)", color: "#f57f17", label: "🚫 Invalid", };
  };

  return (
    <div className="main-card" style={{ maxWidth: "680px" }}>
      <h1>📊 Developer Logs</h1>
      <p className="subtitle">Last 50 prediction requests</p>

      {/* Stats */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total", value: stats.total, color: "#2e7d32" },
          { label: "Diseased", value: stats.diseased, color: "#c0392b" },
          { label: "Healthy", value: stats.healthy, color: "#27ae60" },
          { label: "Invalid", value: stats.invalid, color: "#f57f17" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1,
            background: "rgba(255,255,255,0.4)",
            borderRadius: "14px",
            padding: "14px 8px",
            backdropFilter: "blur(10px)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "600", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#5f6f63" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading && <p>Loading logs...</p>}

      {/* Log entries */}
      {logs.map((log, i) => {
        const style = getStatusStyle(log.status);
        return (
          <div key={i} className="disease-card" style={{
            borderLeft: `4px solid ${style.border}`,
            background: style.bg,
            textAlign: "left",
            marginBottom: "10px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ color: style.color }}>{style.label}</strong>
              <span style={{ fontSize: "11px", color: "#888" }}>
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
            <p style={{ margin: "4px 0", fontSize: "13px" }}>
              <strong>Plant:</strong> {log.plant} &nbsp;|&nbsp;
              <strong>Condition:</strong> {log.condition}
            </p>
            <p style={{ margin: "4px 0", fontSize: "13px" }}>
              <strong>Confidence:</strong> {log.confidence}% &nbsp;|&nbsp;
              <strong>IP:</strong> {log.ip}
            </p>
          </div>
        );
      })}

      {logs.length === 0 && !loading && (
        <p style={{ color: "#888" }}>No requests yet. Run a diagnosis first!</p>
      )}

      <button className="btn-secondary" onClick={() => window.location.reload()}>
        🔄 Refresh Logs
      </button>
    </div>
  );
}

export default AdminLogs;