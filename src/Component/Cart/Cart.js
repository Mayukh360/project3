import React,{useContext, useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import classes from "./Cart.module.css";
import CartContext from '../store/Cart-Context';
import CartItem from './CartItem';
import axios from "axios";

export default function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [cartData, setCartData] = useState([]);

  const fetchData = () => {
    axios
      .get("https://crudcrud.com/api/5718029755604cf084c6ea9f312a5216/shoecommerce")
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cartItemRemoveHandler = async (id) => {
    await axios.delete(`https://crudcrud.com/api/5718029755604cf084c6ea9f312a5216/shoecommerce/${id}`);
    fetchData();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
  {cartData.map((item) => (
        <CartItem
          price={item.price}
          amount={item.amount}
          name={item.shoeName}
          size={item.size}
          key={item._id}
          onRemove={() => cartItemRemoveHandler(item._id)}
        ></CartItem>
      ))}
    </ul>
  );
   const hasItem=cartData.length>0;

   const sum = cartData.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const orderPlaceHandler = async () => {
    if (cartData.length === 0) return;

    const deleteRequests = cartData.map((item) =>
      axios.delete(`https://crudcrud.com/api/5718029755604cf084c6ea9f312a5216/shoecommerce/${item._id}`)
    );

    await Promise.all(deleteRequests);

    fetchData();
  };
  return (
    <Modal onHide={props.onHide}>
    {cartItems}
    <div className={classes.total} >
      <span>Total</span>
      <span>{sum}</span>
    </div>
    <div className={classes.actions}>
      <button onClick={props.onHide} className={classes["button--alt"]} >
        Close
      </button>
      {hasItem && <button onClick={orderPlaceHandler} className={classes.button}>Order Medicine</button>}
    </div>
  </Modal>
  )
}
