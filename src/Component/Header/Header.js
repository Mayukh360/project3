import React,{Fragment} from 'react';
import HeaderCart from './HeaderCart';
import classes from "./Header.module.css";

export default function Header(props) {
  return (
    <Fragment>
    <div className={classes.header}>
      <h1>Medicine Shop</h1>
      <HeaderCart onShow={props.onShow} />
    </div>

    
  </Fragment>
  )
}
