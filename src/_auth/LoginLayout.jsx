import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <main className=" flex  h-screen items-center justify-center">
      <Outlet />
    </main>
  );
};

export default LoginLayout;
