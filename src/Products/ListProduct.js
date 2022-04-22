import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import axios from "axios";
// import images from "../public/images";

const { Meta } = Card;

const ListProduct = () => {
  const [productList, setProductList] = useState([]);

  useEffect(async () => {
    let response = await axios.get("http://localhost:3001/products");
    console.log(response.data);
    setProductList(response.data);
  }, []);

  return (
    <div className="product-list-container">
      {productList &&
        productList.map((product) => {
          return (
            <Card
              className="product-card"
              key={product.id}
              style={{
                width: 300,
                border: "5px solid red",
              }}
              cover={
                <img
                  alt="example"
                  src={`/images/${product.image}`}
                  height="300px"
                />
              }
              actions={[
                <ShoppingCartOutlined key="cart" style={{ color: "orange" }} />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Meta
                title={product.title}
                description={product.description}
                price={product.price}
              />
            </Card>
          );
        })}
    </div>
  );
};

export default ListProduct;
