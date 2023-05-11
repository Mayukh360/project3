import React,{ useState} from "react";
import Cart from "./Component/Cart/Cart";
import Header from "./Component/Header/Header";


import MedicineForm from "./Component/Medicineform";
import CartProvider from "./Component/store/CartProvider";

function App(props) {
  const[cartIsVisible, setCartIsVisible]=useState(false);

  const showCartHandler=()=>{
    setCartIsVisible(true);
  }
  const hideCartHandler=()=>{
    setCartIsVisible(false);
  }
  return (
    <CartProvider >
       {cartIsVisible && <Cart onHide={hideCartHandler}/>}
       <Header onShow={showCartHandler} />
    <MedicineForm/>
    </CartProvider>
  );
}

export default App;
