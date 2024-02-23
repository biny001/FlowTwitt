import React from "react";
import { Outlet } from "react-router-dom";
import BottomBar from "./BottomBar";
import LeftSideBar from "./LeftSideBar";
import Topbar from "./Topbar";

const AppLayout = () => {
  return (
    <main className="w-full md:flex  ">
      <Topbar />
      <LeftSideBar />
      <section className=" flex flex-1  h-screen">
        <Outlet />
      </section>
      <BottomBar />
    </main>
  );
};

export default AppLayout;
