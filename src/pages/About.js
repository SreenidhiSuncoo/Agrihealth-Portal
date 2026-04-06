function About() {
  return (
    <div className="main-card" style={{ maxWidth: "560px", textAlign: "left" }}>
      <h1 style={{ textAlign: "center" }}>About AgriHealth</h1>
      <p className="subtitle" style={{ textAlign: "center" }}>
        AI-powered plant disease detection system
      </p>

      <div className="disease-card">
        <h4>🎯 Project Goal</h4>
        <p>Help farmers and gardeners detect plant diseases early using machine learning, reducing crop loss and improving yield.</p>
      </div>

      <div className="disease-card">
        <h4>🧬 How It Works</h4>
        <p>Upload a leaf image → our MobileNetV2 model (trained on 54,000+ PlantVillage images) analyzes it → get instant diagnosis with confidence score.</p>
      </div>

      <div className="disease-card">
        <h4>🛠️ Tech Stack</h4>
        <p><strong>Frontend:</strong> React.js</p>
        <p><strong>Backend:</strong> Node.js + Express</p>
        <p><strong>ML Server:</strong> Python + Flask + TensorFlow</p>
        <p><strong>Model:</strong> MobileNetV2 (Transfer Learning)</p>
        <p><strong>Database:</strong> MongoDB</p>
        <p><strong>Dataset:</strong> PlantVillage (Kaggle)</p>
      </div>

      <div className="disease-card">
        <h4>📊 Model Performance</h4>
        <p><strong>Training Accuracy:</strong> 97.11%</p>
        <p><strong>Validation Accuracy:</strong> 96.18%</p>
        <p><strong>Classes:</strong> 38 plant disease categories</p>
        <p><strong>Architecture:</strong> MobileNetV2 + custom classification head</p>
      </div>
    </div>
  );
}

export default About;