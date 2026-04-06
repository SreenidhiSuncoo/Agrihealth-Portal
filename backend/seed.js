const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/plantDB");

const Disease = mongoose.model("Disease", {
  name: String,
  cause: String,
  prevention: String,
  cure: String
});

const diseases = [
  { name: "Early Blight (Tomato)", cause: "Fungal infection by Alternaria solani", prevention: "Crop rotation, avoid overhead watering", cure: "Apply copper-based fungicide every 7 days" },
  { name: "Late Blight (Tomato)", cause: "Oomycete Phytophthora infestans", prevention: "Use resistant varieties, ensure good drainage", cure: "Apply chlorothalonil or mancozeb fungicide" },
  { name: "Leaf Scorch (Strawberry)", cause: "Fungus Diplocarpon earlianum", prevention: "Remove infected leaves, avoid wetting foliage", cure: "Apply myclobutanil or captan fungicide" },
  { name: "Apple Scab", cause: "Fungus Venturia inaequalis", prevention: "Rake fallen leaves, prune for airflow", cure: "Apply fungicide at bud break stage" },
  { name: "Bacterial Spot (Pepper)", cause: "Bacterium Xanthomonas campestris", prevention: "Use certified disease-free seeds", cure: "Copper-based bactericide sprays" },
  { name: "Powdery Mildew (Grape)", cause: "Fungus Erysiphe necator", prevention: "Ensure good airflow between vines", cure: "Sulfur-based fungicide or neem oil" },
  { name: "Black Rot (Grape)", cause: "Fungus Guignardia bidwellii", prevention: "Remove mummified fruit, prune dead wood", cure: "Apply myclobutanil during early season" },
  { name: "Northern Leaf Blight (Corn)", cause: "Fungus Exserohilum turcicum", prevention: "Plant resistant hybrids, rotate crops", cure: "Apply foliar fungicide at early infection" },
  { name: "Citrus Greening", cause: "Bacteria spread by Asian citrus psyllid", prevention: "Control psyllid insects with insecticide", cure: "No cure — remove and destroy infected trees" },
  { name: "Potato Late Blight", cause: "Oomycete Phytophthora infestans", prevention: "Plant certified seed potatoes", cure: "Apply metalaxyl or cymoxanil fungicide" }
];

async function seed() {
  await Disease.deleteMany({});
  await Disease.insertMany(diseases);
  console.log("✅ Database seeded with 10 diseases!");
  mongoose.disconnect();
}

seed();