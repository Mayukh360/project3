import React, { useState } from "react";
import CartContext from "./Cart-Context";

export default function CartProvider(props) {
  const [cartContext, setCartContext] = useState({
    items: [],
    totalAmount: 0,
  });

  //The callback function returns true if condition satisfies, then findIndex returns the first index that satisfies the condtion
  const addItemToCartHandler = (item) => {
    const existingCartItemIndex = cartContext.items.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    //Using the index from which we are getting into existingCartItem's index
    const existingCartItem = cartContext.items[existingCartItemIndex];

    let updatedItems;

    //If existingCartItem exist in the array, we return updateItem with +1 amount
    //We can not access an particular property of an object and change it, we have ha access all the the object using spread operator, and then we can change desired property

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...cartContext.items];
      //Putting new Item in the updated item
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If an existing item is not found, add the new item to the array
      updatedItems = cartContext.items.concat(item);
    }

    //Total= 'prev total already present' + 'Current item price'
    const updatedTotalAmount = Number(cartContext.totalAmount) + Number(item.price);

    const updatedCartContext = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };

    //Updating the State with state updating function
    setCartContext(updatedCartContext);
  };

  const removeItemFromCartHandler = (id) => {
    // Find the index of the item to be removed
    const itemIndex = cartContext.items.findIndex((item) => item.id === id);

    // Get the item object
    const item = cartContext.items[itemIndex];

    // Calculate the new total amount
    const newTotalAmount = cartContext.totalAmount - item.price * 1;

    let newItems;

    if (item.amount === 1) {
      // If the item has only 1 quantity, remove it from the array
      newItems = cartContext.items.filter((item) => item.id !== id);
    } else {
      // If the item has more than 1 quantity, update the amount
      const newItem = { ...item, amount: item.amount - 1 };
      newItems = [...cartContext.items];
      newItems[itemIndex] = newItem;
    }

    const updatedCartContext = {
      items: newItems,
      totalAmount: newTotalAmount,
    };

    setCartContext(updatedCartContext);
  };

  const clearCartHandler=()=>{
    setCartContext({
      items: [],
      totalAmount: 0,
    })
  }

  
  const cartContextValue = {
    items: cartContext.items,
    totalAmount: cartContext.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}
