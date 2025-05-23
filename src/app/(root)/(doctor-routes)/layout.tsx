

"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Navbar from "../../../components/doctor/Navbar/navbar";
import Sidebar from "@/components/doctor/sidbar/sidbar";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    }
  }, [pathname, isSmallScreen]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

 
  const showSidebar = pathname !== "/doctor/message";

  return (
    <div className="flex bg-white">
  
      {showSidebar && <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}

      
      <div
        className={`flex-1 transition-all duration-300 ${showSidebar && sidebarOpen ? "ml-[260px]" : "ml-0"}`}
      >
    
        <Navbar toggleSidebar={toggleSidebar} />

        
        <main className="bg-white mt-12 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
