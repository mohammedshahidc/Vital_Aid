import React, { ReactNode } from "react";
import Navbar from "@/components/docter/Navbar/navbar";
import Sidebar from "@/components/docter/sidbar/sidbar";

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
        <Navbar/>
        
            <main>{children}</main>
        </>
    )
}
export default Layout