import React, { Fragment } from 'react';

const Layout = props => (
    <Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;
