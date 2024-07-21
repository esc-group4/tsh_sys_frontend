// this is used as navbar a common component, create a layout to put in other common components such as footer

import React from 'react';
import NavBar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import { navbarProps } from './components/navbar/navbar.types';
import './index.css';


const Layout: React.FC = () => {
  return (
    <div className='layout-container'>
      <NavBar 

      />
    <main className="main-content">
        <Outlet />
    </main>
    </div>
  );
};

export default Layout;
