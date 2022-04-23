import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { cartActions } from "../../Store";
import "./Card.css";

const CartCard = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-card-main">
      <div className="cart-product-info-wrapper">
        <div className="cart-img-wrapper">
          <img
            className="cart-img"
            src={`/images/${props.item.image}`}
            alt="Adidas_Shoes"
          />
        </div>
        <div className="cart-data">
          <div className="cart-title">{props.item.title}</div>
          <div className="cart-description">{props.item.description}</div>
        </div>
      </div>
      <div className="cart-product-footer">
        <div className="cart-price-quantity-wrapper">
          <div className="cart-product-price"> ₹{props.item.price}</div>
        </div>
        <div className="cart-action-btn-wrapper">
          <Button
            onClick={() => {
              dispatch(cartActions.removeItem(props.item.id));
            }}
          >
            -
          </Button>
          <div className="cart-product-qty"> {props.item.amount}</div>
          <Button
            onClick={() => {
              dispatch(cartActions.addItem({ item: { ...props.item } }));
            }}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CartCard;
