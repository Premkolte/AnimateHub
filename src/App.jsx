import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import AboutUs from "./components/About/AboutUs";
import ContactUs from "./components/Contact/ContactUs";
import AnimatedCursor from "react-animated-cursor";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar"; // Import the Navbar component
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <div>
        <AnimatedCursor
          innerSize={12}
          outerSize={25}
          outerAlpha={0.4}
          innerScale={1}
          outerScale={2}
          color="194, 198, 204"
        />
        <Navbar /> {/* Add the Navbar here */}
        <div className="pt-16"> {/* Adjust for the fixed navbar height */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
