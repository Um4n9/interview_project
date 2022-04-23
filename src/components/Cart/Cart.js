import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../Card/CartCard";
import MyHeader from "../Header/MyHeader";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../Store";
import Swal from "sweetalert2";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.items);
  const finalTotal = useSelector((state) => state.totalAmount);
  const navigate = useNavigate();

  const placeOrderHandler = () => {
    console.log("clicked");
    dispatch(cartActions.clearState());
    Swal.fire({
      icon: "success",
      type: "success",
      text: "Your purchase was Successful",
    });
  };

  return (
    <div>
      <MyHeader />
      <div className="">
        <div className={"myproducts-bread-crumb"}>
          <div className={"cart-main-title"}>
            My Cart ({productList.length}){" "}
          </div>
          <div></div>
        </div>
        {productList.length === 0 && (
          <div className={"no-items-wrapper"}>
            <div>No Items Found In Cart</div>
            <div className="add-to-cart-btn" onClick={() => navigate("/")}>
              Add Products To Cart
            </div>
          </div>
        )}

        {productList.length != 0 && (
          <div className="cart-content-wrapper">
            <div className="cart-products-wrapper">
              {productList.map((product) => {
                return <CartCard key={product.id} item={product} />;
              })}
            </div>
            <div className="cart-content-total-wrapper">
              <div className="price-detail-title">PRICE DETAIL</div>

              <div className="price-distribution">
                {productList.map((prod) => {
                  return (
                    <div className="product-item">
                      <div className="product-item-title">{prod.title}</div>
                      <div>
                        <div>
                          {prod.price} x {prod.amount}
                        </div>
                        <div>= {prod.price * prod.amount}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="price-final-total-wrapper">
                <div>Total Amount</div>
                <div>₹{finalTotal}</div>
              </div>

              <div className="place-ordr-btn" onClick={placeOrderHandler}>
                Place Order
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
