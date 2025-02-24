import React, { ReactNode } from "react";
import Navbar from "../../../components/doctor/Navbar/navbar";
import Sidebar from "@/components/doctor/sidbar/sidbar";


interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="flex flex-col ">
                <Navbar />

                <div className="flex flex-1">

                    

                    <main className="flex-1 overflow-auto   ">{children}</main>
                </div>
            </div>
        </>
    )
}
export default Layout