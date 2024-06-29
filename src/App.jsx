import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import AboutUs from "./components/About/AboutUs";
import ContactUs from "./components/Contact/ContactUs";
import AnimatedCursor from "react-animated-cursor";
import Dashboard from "./components/Dashboard/Dashboard";
import Contributors from "./components/Contributors/Contributors";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TemplatesRoutes from "./components/Templates/TemplatesRoutes";

function App() {
  return (
    <Router>
        <AnimatedCursor
          innerSize={12}
          outerSize={25}
          outerAlpha={0.4}
          innerScale={1}
          outerScale={2}
          color="194, 198, 204"
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<Dashboard />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/templates/*" element={<TemplatesRoutes />} />
        </Routes>
    </Router>
  );
}

export default App;
