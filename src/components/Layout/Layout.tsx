import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import React from 'react';

const Layout: FC = () => {
  return (
    <div className="appPage">
      <Header />
      <main className="main">
        <div className="container main__container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
