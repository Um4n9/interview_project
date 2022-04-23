import React, { useEffect, useState } from "react";
import axios from "axios";
import MyCard from "../Card/MyCard";
import MyHeader from "../Header/MyHeader";

const ListProduct = () => {
  const [productList, setProductList] = useState([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let response = await axios.get("http://localhost:3001/products");
    console.log(response.data);
    setProductList(response.data);
  };

  const closeModal = () => {
    setIsAddProductModalOpen(false);
    fetchProducts();
  };

  return (
    <>
      <MyHeader activeTab={"home"} />
      <div className="product-list-container">
        {productList &&
          productList.map((product) => {
            return (
              <MyCard
                key={product.id}
                item={product}
                fetchProducts={fetchProducts}
                canRemove={false}
              />
            );
          })}
      </div>
    </>
  );
};

export default ListProduct;
