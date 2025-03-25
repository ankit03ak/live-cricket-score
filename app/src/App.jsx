import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import Home from "./components/home/Home";
import Single from "./components/singleCard/Single";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
