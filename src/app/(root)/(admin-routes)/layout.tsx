import React, { ReactNode } from "react";
import Navbar from "@/components/admin/navbar/navabr";
import Sidebar from "@/components/admin/sidbar/sidbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-white flex flex-col ">
      <Navbar />

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 p-4 overflow-auto  md:ml-60 mt-16  ">{children}</main>
      </div>
    </div> 
  );
};

export default Layout;
