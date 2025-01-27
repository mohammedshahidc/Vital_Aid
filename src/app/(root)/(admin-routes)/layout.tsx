import React, { ReactNode } from "react";
import Navbar from "@/components/admin/navbar/navabr";
import Sidebar from "@/components/admin/sidbar/sidbar";
interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
        <Navbar/>
        <div className="flex">
        <Sidebar/>
            <main>{children}</main>
        </div>
        </>
    )
}
export default Layout