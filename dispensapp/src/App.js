import './App.css';
import 'fontsource-roboto';
import React, { useState } from 'react';
import DrawerMenu from './components/drawerMenu/DrawerMenu';
import Navbar from './components/navbar/Navbar';


function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div style={{marginTop: '8.5vh'}}>
      <Navbar toggleDrawer={toggleDrawer} />
      <DrawerMenu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default App;
