import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/help' element={<Help />} />
        <Route exact path='/search' element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
