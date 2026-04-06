import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Background from "./Background";

import Home from "./pages/Home";
import Diagnose from "./pages/Diagnose";
import Diseases from "./pages/Diseases";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogs from "./pages/AdminLogs";

function App() {
  return (
    <BrowserRouter>
      {/* Global animated background — shows on all pages */}
      <Background />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/diseases" element={<Diseases />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logs" element={<AdminLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;