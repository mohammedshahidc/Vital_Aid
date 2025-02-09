import React, { ReactNode } from "react";
import Navbar from "@/components/users/Navbar/Navbar";
import Footer from "@/components/ui/footer";

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />

            <main>{children}</main>
        </>
    )
    
}
export default Layout