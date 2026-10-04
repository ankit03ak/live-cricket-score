import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import Home from "./components/home/Home";
import Single from "./components/singleCard/Single";
import Navbar from "./components/navbar/Navbar";
import WatchLive from "./components/watchLive/WatchLive";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<Single />} />
        <Route path="/watch-live" element={<WatchLive />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
