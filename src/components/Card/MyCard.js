import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { cartActions } from "../../Store";
import EditProduct from "../Products/EditProduct";
import "./CartCard.css";
import axios from "axios";
import Swal from "sweetalert2";

const MyCard = (props) => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.items);
  const [isPresentInCart, setIsPresentInCart] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    console.log(props, "props");
    let cartItemList = itemsInCart.map((item) => item.id);
    let isPresent = cartItemList.includes(props.item.id);
    if (isPresentInCart !== isPresent) {
      setIsPresentInCart(isPresent);
    }
  }, [itemsInCart]);

  const closeModal = () => {
    setIsEditModalOpen(false);
    props.fetchProducts();
  };

  const deleteHandler = async () => {
    dispatch(cartActions.removeWholeItem(props.item.id));
    let response = await axios.delete(
      `http://localhost:3001/products/${props.item.id}`
    );

    console.log("response", response);
    Swal.fire({
      icon: "success",
      type: "success",
      text: "Product deleted successfully",
    });
    props.fetchProducts();
  };

  return (
    <>
      {isEditModalOpen && (
        <EditProduct item={props.item} closeModal={closeModal} />
      )}
      <div className="card-main-wrapper">
        <div className="card-img-wrapper">
          <img
            className="card-img"
            src={`/images/${props.item.image}`}
            alt="Adidas_Shoes"
          />
        </div>
        <div className="card-body">
          <div className="card-title">{props.item.title}</div>
          <Tooltip
            title={props.item.description}
            key={props.item.id}
            placement="topRight"
          >
            <div className="card-description">{props.item.description}</div>
          </Tooltip>
          <div className="card-footer">
            <div className="card-product-price"> ₹{props.item.price}</div>

            {props.canRemove == false && (
              <div>
                {isPresentInCart === true ? (
                  <button
                    className="remove-from-cart-btn"
                    onClick={() => {
                      dispatch(cartActions.removeItem(props.item.id));
                    }}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      dispatch(
                        cartActions.addItem({ item: { ...props.item } })
                      );
                    }}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            )}

            {props.canRemove == true && (
              <div className="action-btn-wrapper">
                <div
                  className="add-to-cart-btn"
                  onClick={() => {
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </div>
                <div className="remove-from-cart-btn" onClick={deleteHandler}>
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyCard;
