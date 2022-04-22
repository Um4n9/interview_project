import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./Products/AddProduct";
import ListProduct from "./Products/ListProduct";
import Cart from "./Products/Cart";
import Header from "./Header/Header";
import "./App.css";

// comment to confirm

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListProduct />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
