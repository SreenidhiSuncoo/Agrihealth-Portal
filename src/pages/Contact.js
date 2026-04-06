import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      return alert("Please fill all fields!");
    }
    setSent(true);
  };

  return (
    <div className="main-card" style={{ maxWidth: "500px" }}>
      <h1>Contact Us</h1>
      <p className="subtitle">Have questions or feedback? Reach out!</p>

      {sent ? (
        <div style={{ padding: "20px", background: "rgba(76,175,80,0.15)", borderRadius: "14px" }}>
          <h3 style={{ color: "#2e7d32" }}>✅ Message Sent!</h3>
          <p>Thanks {form.name}, we'll get back to you soon.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
          <input
            type="text"
            placeholder="Your email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
          <textarea
            placeholder="Your message..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            rows={4}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.1)",
              outline: "none",
              background: "rgba(255,255,255,0.5)",
              fontFamily: "Poppins, sans-serif",
              resize: "none",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <button className="btn-primary" onClick={handleSubmit}>
            Send Message
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px", padding: "14px", background: "rgba(255,255,255,0.3)", borderRadius: "12px", textAlign: "left" }}>
        <p style={{ margin: "4px 0", fontSize: "13px" }}>📧 agrihealth@gmail.com</p>
        <p style={{ margin: "4px 0", fontSize: "13px" }}>🌐 AgriHealth Plant Disease Detection</p>
      </div>
    </div>
  );
}

export default Contact;