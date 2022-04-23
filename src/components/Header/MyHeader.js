import React from "react";
import "./MyHeader.css";
import { createFromIconfontCN } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});

const MyHeader = ({ activeTab }) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.items);

  return (
    <div className="header-main">
      <div className="header-title-nav-wrapper">
        <div
          className="header-title"
          onClick={() => {
            navigate("/");
          }}
        >
          Shoe World
        </div>

        <div className="header-nav-wrapper header-title">
          <div
            className={activeTab == "home" ? " active-header" : ""}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>
          <div
            className={activeTab == "myProducts" ? " active-header" : ""}
            onClick={() => {
              navigate("/myProducts");
            }}
          >
            My Products
          </div>
        </div>
      </div>

      <div
        className="cart-btn"
        onClick={() => {
          navigate("/cart");
        }}
      >
        <IconFont type="icon-shoppingcart" style={{ fontSize: "28px" }} />
        <div className="cart-number">{cartItems.length}</div>
      </div>
    </div>
  );
};

export default MyHeader;
