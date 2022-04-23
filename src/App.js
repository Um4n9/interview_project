import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProduct from "./components/Products/ListProduct";
import MyProducts from "./components/Products/MyProducts";
import Cart from "./components/Cart/Cart";
import "./App.css";

// comment

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myProducts" element={<MyProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
