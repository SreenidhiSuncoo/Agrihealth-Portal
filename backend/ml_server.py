from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json

app = Flask(__name__)
CORS(app)

print("Loading model...")
model = tf.keras.models.load_model("plant_disease_model.keras")

with open("class_names.json") as f:
    CLASS_NAMES = json.load(f)

print(f"✅ Model loaded! {len(CLASS_NAMES)} classes ready.")

@app.route("/ml-predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_bytes = request.files["image"].read()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((224, 224))
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_index]) * 100

    # Reject if confidence is too low
    if confidence < 65:
        return jsonify({
            "error": "not_a_leaf",
            "message": "This doesn't look like a plant leaf. Please upload a clear leaf image.",
            "confidence": round(confidence, 2)
        }), 200

    label = CLASS_NAMES[predicted_index]
    parts = label.replace("___", "__").split("__")
    plant = parts[0].replace("_", " ")
    condition = parts[1].replace("_", " ") if len(parts) > 1 else "Unknown"
    is_healthy = "healthy" in condition.lower()

    return jsonify({
        "plant": plant,
        "condition": condition,
        "is_healthy": is_healthy,
        "confidence": round(confidence, 2),
        "label": label
    })

if __name__ == "__main__":
    app.run(port=5001)