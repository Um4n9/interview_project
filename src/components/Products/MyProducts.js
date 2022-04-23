import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import MyCard from "../Card/MyCard";
import MyHeader from "../Header/MyHeader";

import { PlusOutlined } from "@ant-design/icons";

const MyProducts = () => {
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
      <MyHeader activeTab={"myProducts"} />
      <div className={"myproducts-bread-crumb"}>
        <div></div>

        <div
          className="add-to-product-btn"
          onClick={() => {
            setIsAddProductModalOpen(true);
          }}
        >
          <PlusOutlined />
          Add Product
        </div>
      </div>
      <div className="product-list-container">
        {productList &&
          productList.map((product) => {
            return (
              <MyCard
                key={product.id}
                item={product}
                fetchProducts={fetchProducts}
                canRemove={true}
              />
            );
          })}
      </div>

      {isAddProductModalOpen === true && <AddProduct closeModal={closeModal} />}
    </>
  );
};

export default MyProducts;
