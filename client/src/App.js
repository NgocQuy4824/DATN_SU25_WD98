import { BrowserRouter, Routes} from 'react-router-dom';
import { clientRoutes } from './routers/clientRouter';
import { adminRoutes } from './routers/adminRouter';
import React from 'react'
import { renderRoutes } from './utils/renderRouters';

function App() {
  const allRoutes = [...clientRoutes, ...adminRoutes];

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(allRoutes)}</Routes>
    </BrowserRouter>
  );
}

export default App;
