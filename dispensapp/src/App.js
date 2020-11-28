import './App.css';
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
    <div>
      <Navbar toggleDrawer={toggleDrawer} />
      <DrawerMenu isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default App;
