
import React, { ReactNode } from "react";
import Navbar from "@/components/users/Navbar/Navbar";
import QuickActions from "@/components/ui/quickActions";



interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {


  return (
    <>
      <Navbar />

      <main className="mt-16">{children}</main>
      <QuickActions/>
    </>
  );
};
export default Layout;
