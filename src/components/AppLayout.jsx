import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className=" flex  h-screen">
      <Outlet />
    </main>
  );
};

export default AppLayout;
