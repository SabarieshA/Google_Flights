import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightSearch from './FlightSearch/FlightSearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlightSearch />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
