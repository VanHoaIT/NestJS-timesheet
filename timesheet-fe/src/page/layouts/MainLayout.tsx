import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex pt-20 p-5">
        <Sidebar />
        <main className="flex-1 ml-[250px] p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
