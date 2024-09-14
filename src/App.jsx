import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import CategoryDetail from "./components/CategoryDetail/CategoryDetail";
import ProductDetail from "./components/ProductDetail/ProductDetail";

function App() {
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryDetail />} />
           <Route path="/products/:id" element={<ProductDetail />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
