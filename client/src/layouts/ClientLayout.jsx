import React from 'react';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
  return (
    <>
      <HeaderComponent isAdmin={false} />
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
};

export default ClientLayout;
