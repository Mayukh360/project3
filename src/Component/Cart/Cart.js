import React,{useContext, useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import classes from "./Cart.module.css";
import CartContext from '../store/Cart-Context';
import CartItem from './CartItem';
import axios from "axios";

export default function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    axios
      .get("https://crudcrud.com/api/5718029755604cf084c6ea9f312a5216/shoecommerce")
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  
  const cartItems = (
    <ul className={classes["cart-items"]}>
  {cartData.map((item) => (
        <CartItem
          price={item.price}
          amount={item.amount}
          name={item.shoeName}
          size={item.size}
          key={item._id}
        ></CartItem>
      ))}
    </ul>
  );
   const hasItem=cartData.length>0;

   const sum = cartData.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
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
      {hasItem && <button className={classes.button}>Order Medicine</button>}
    </div>
  </Modal>
  )
}
