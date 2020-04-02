import React, { Fragment } from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
  <Fragment>
    <Backdrop show={props.show} dismiss={props.modalClosed}></Backdrop>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "transformY(0)" : "transform(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Fragment>
);

export default modal;
