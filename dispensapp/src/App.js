import './App.css';
import 'fontsource-roboto';
import React, { useState } from 'react';
import DrawerMenu from './components/drawerMenu/DrawerMenu';
import Navbar from './components/navbar/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LogIn from 'components/user/LogIn';
import SignUp from 'components/user/SignUp';
import { Grid } from '@material-ui/core';


function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [auth, setAuth] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div style={{ marginTop: '8.5vh' }}>
      <CssBaseline />
      <Navbar toggleDrawer={toggleDrawer} loggedIn={auth} handleLogIn={setAuth} />
      <DrawerMenu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} auth={auth} setAuth={setAuth} />
    </div>
  );
}

export default App;
