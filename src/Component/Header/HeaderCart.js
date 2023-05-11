import React,{useContext} from 'react';
import classes from './HeaderCart.module.css';
import CartIcon from './CartIcon';
import CartContext from '../store/Cart-Context';

export default function HeaderCart(props) {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce(
    (currNumber, item) => currNumber + item.amount,
    0
  );
  

  return (<>
    <button onClick={props.onShow} className={classes.button} >
            <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
       
      </button>
      
      </>
  )
}
