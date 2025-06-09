import React from 'react';
import MainMenu from './MainMenu';
import Header from './Header';

const Layout = ({ children }) => {
  return (

    <div className="flex h-screen bg-gray-100 font-sans">
      <MainMenu />
      <div className="flex-1 p-6">
        <Header />
        <main>{children}</main>
      </div>
    </div>

  );
};

export default Layout;