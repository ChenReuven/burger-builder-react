import React, {Component, Fragment} from "react";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

// const Layout = props => (
//     <Fragment>
//         <Toolbar />
//         <SideDrawer />
//         <main className={classes.content}>
//             {props.children}
//         </main>
//     </Fragment>
// );

// export default Layout;

class Layout extends Component {
  state = {
      showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({
        showSideDrawer: false
    })
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer
    }));
  };

  render() {
    return (
      <Fragment>
        <Toolbar toggleMenu={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
