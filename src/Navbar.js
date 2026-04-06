import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo"> AgriHealth</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/diagnose">Diagnose</Link>
        <Link to="/diseases">Diseases</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;