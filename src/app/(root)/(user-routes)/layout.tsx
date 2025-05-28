"use client"
import React, { ReactNode } from "react";
import Navbar from "@/components/users/Navbar/Navbar";
import QuickActions from "@/components/ui/quickActions";
import Footer from "@/components/ui/footer";
import { usePathname } from "next/navigation";



interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  const pathname = usePathname();
  const hideNavbar = pathname === "/user/message";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main className="mt-16">{children}</main>
      <Footer/>
      <QuickActions/>
    </>
  );
};
export default Layout;
