import { useEffect, useState } from "react";

const categoryColors = {
  "Fungal": "#e8f5e9",
  "Bacterial": "#fff3e0",
  "default": "#f3e5f5"
};

function Diseases() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/diseases")
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); });
  }, []);

  const filtered = data.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-card" style={{ maxWidth: "600px" }}>
      <h1>🌿 Disease Library</h1>
      <p className="subtitle">{data.length} diseases in database</p>

      <input
        type="text"
        placeholder="Search disease..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: "20px", boxSizing: "border-box" }}
      />

      {loading && <p>Loading...</p>}

      {filtered.length === 0 && !loading && (
        <p style={{ color: "#888" }}>No diseases found for "{search}"</p>
      )}

      {filtered.map((d, i) => (
        <div key={i} className="disease-card" style={{ textAlign: "left" }}>
          <h3 style={{ margin: "0 0 8px", color: "#2e7d32" }}>🍃 {d.name}</h3>
          <p style={{ margin: "4px 0", fontSize: "13px" }}>
            <strong>Cause:</strong> {d.cause}
          </p>
          <p style={{ margin: "4px 0", fontSize: "13px" }}>
            <strong>Prevention:</strong> {d.prevention}
          </p>
          <p style={{ margin: "4px 0", fontSize: "13px", color: "#c0392b" }}>
            <strong>Cure:</strong> {d.cure}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Diseases;