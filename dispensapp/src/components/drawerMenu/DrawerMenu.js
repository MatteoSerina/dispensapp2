import React from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import KitchenIcon from '@material-ui/icons/Kitchen';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import packageJson from '../../../package.json';

import './DrawerMenu.css';

import Home from '../home/Home';
import Storage from '../storage/Storage';
import Catalog from '../catalog/Catalog';


const DrawerMenu = (props) => {
    const list = () => (
        <div
            role="presentation"
            onClick={props.toggleDrawer(false)}
            onKeyDown={props.toggleDrawer(false)}
        >
            <List>
                <NavLink to="/" className='MenuItem'>
                    <ListItem button key='Home'>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </NavLink>
                <NavLink to="/storage" className='MenuItem'>
                    <ListItem button key='Dispensa'>
                        <ListItemIcon><KitchenIcon /></ListItemIcon>
                        <ListItemText primary='Dispensa' />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                <NavLink to="/catalog" className='MenuItem'>
                    <ListItem button key='Catalogo'>
                        <ListItemIcon><MenuBookIcon /></ListItemIcon>
                        <ListItemText primary='Catalogo' />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <Typography variant="body2" style={{marginLeft: '1.5em', marginTop: '1em'}}>
                Versione: {packageJson.version}
            </Typography>
        </div>
    );


    return (
        <HashRouter>
            <div>
                <React.Fragment key={'left'}>
                    <SwipeableDrawer
                        anchor={'left'}
                        open={props.isDrawerOpen}
                        onClose={props.toggleDrawer(false)}
                        onOpen={props.toggleDrawer(true)}>

                        {list()}
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
            <div className="content">
                <Route exact path="/" component={Home} />
                <Route path="/catalog" component={Catalog} />
                <Route path="/storage" component={Storage} />
            </div>
        </HashRouter>
    );
}

export default DrawerMenu;