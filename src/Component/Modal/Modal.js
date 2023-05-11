import React,{Fragment} from 'react';
import ReactDom from 'react-dom';
import classes from './Modal.module.css'
 
const Backdrop=(props)=>{
    return( <div onClick={props.onClose} className={classes.backdrop} ></div>);
 }

 const ModalOverlay=(props)=>{
    return (<div className={classes.modal}  >
        <div  className={classes.content}>{props.children}</div>
    </div>);
 }
 const portalElement=document.getElementById('overlay');

export default function Modal(props) {
  return (
    <Fragment>
  {ReactDom.createPortal(<Backdrop onClose={props.onHide}/>,portalElement)}
  {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </Fragment>
  )
}
