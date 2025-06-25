import { BrowserRouter, Routes } from "react-router-dom";
import { clientRoutes } from "./routers/clientRouter";
import { adminRoutes } from "./routers/adminRouter";
import React from "react";
import { renderRoutes } from "./utils/renderRouters";
import dayjs from "dayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import enUS from "antd/es/calendar/locale/en_US";
import { AuthProvider } from "./context/AuthContext";

dayjs.locale("en");
const queryClient = new QueryClient();

function App() {
  const allRoutes = [...clientRoutes, ...adminRoutes];

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={enUS}>

        <BrowserRouter>
          <AuthProvider>
            <Routes>{renderRoutes(allRoutes)}</Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
