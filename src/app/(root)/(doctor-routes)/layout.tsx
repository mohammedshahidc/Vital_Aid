// 'use client'
// import React, { ReactNode, useState } from "react";
// import Navbar from "../../../components/doctor/Navbar/navbar";
// import Sidebar from "@/components/doctor/sidbar/sidbar";
// import { usePathname } from "next/navigation";
// import { useMediaQuery } from "@mui/material";


// interface LayoutProps {
//     children: ReactNode
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//     const isSmallScreen = useMediaQuery("(max-width: 768px)");
//     const pathname = usePathname();
//     const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

//     const toggleSidebar = () => {
//         if (isSmallScreen) {
//             setSidebarOpen((prev) => !prev);
//         }
//     };

//     // Hide sidebar on /doctor/message page
//     const showSidebar = pathname !== "/doctor/message";
//     return (
//         <>
//             <div className="flex">
//                 {/* Sidebar: Only show if not on message page */}
//                 {showSidebar && <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}

//                 {/* Main Content */}
//                 <div className="flex-1">
//                     <Navbar toggleSidebar={toggleSidebar} />
                    
//                     <main className="mt-16 p-4 ">{children}</main>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default Layout

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

  // Ensure sidebar closes on small screens when route changes
  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    }
  }, [pathname, isSmallScreen]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Hide sidebar on /doctor/message page
  const showSidebar = pathname !== "/doctor/message";

  return (
    <div className="flex">
      {/* Sidebar: Only show if not on /doctor/message page */}
      {showSidebar && <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}

      {/* Main Content: Adjust margin when sidebar is open */}
      <div
        className={`flex-1 transition-all duration-300 ${showSidebar && sidebarOpen ? "ml-[260px]" : "ml-0"}`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="mt-16 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
