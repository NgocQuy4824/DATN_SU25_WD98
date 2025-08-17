import React from 'react';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import { Outlet } from 'react-router-dom';
import Footer from '../components/FooterComponent/FooterComponent';

const ClientLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderComponent isAdmin={false} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
