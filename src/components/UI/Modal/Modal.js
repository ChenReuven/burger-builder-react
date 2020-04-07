import React, {Fragment} from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import {Component} from "react/cjs/react.production.min";

// const modal = props => (
//   <Fragment>
//     <Backdrop show={props.show} dismiss={props.modalClosed} />
//     <div
//       className={classes.Modal}
//       style={{
//         transform: props.show ? "translateY(0)" : "translateY(-100vh)",
//         opacity: props.show ? "1" : "0"
//       }}
//     >
//       {props.children}
//     </div>
//   </Fragment>
// );
//
// export default modal;

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log("[Modal] WillUpdate");
    }

    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} dismiss={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}
                >
                    {this.props.children}
                </div>
            </Fragment>
        )

    }

}

export default Modal;
