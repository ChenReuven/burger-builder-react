import React, { Fragment } from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => (
    <Fragment>
        <Toolbar></Toolbar>
        {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
        <main className={classes.content}>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;
