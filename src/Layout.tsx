// this is used as navbar a common component, create a layout to put in other common components such as footer

import React from 'react';
import NavBar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import { navbarProps } from './components/navbar/navbar.types';
import './index.css';

interface LayoutProps extends navbarProps {}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className='layout-container'>
      <NavBar 
        {...props}
      />
    <main className="main-content">
        <Outlet />
    </main>
    </div>
  );
};

export default Layout;
