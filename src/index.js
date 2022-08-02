import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


import {  BrowserRouter, Routes, Route} from "react-router-dom";
import Upload from "./Upload";
import Signin from "./Signin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/upload" element={<Upload/>} />
          <Route path="/" element={<Signin />} />
          
        
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);