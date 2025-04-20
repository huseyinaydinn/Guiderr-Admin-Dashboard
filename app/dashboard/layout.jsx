"use client"

import React from 'react'
import Sidebar from "@/components/sidebar/sidebar"
import Navbar from "@/components/navbar/navbar"
import { useEffect, useState } from "react"

const Layout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        const savedState = localStorage.getItem('sidebarCollapsed') === 'true';
        setIsCollapsed(savedState);
    }, []);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('sidebarCollapsed', String(newState));
    };



    return (
        <div className="flex flex-row">
            <div className={`h-screen text-white fixed sidebar ${isCollapsed ? 'w-screen md:w-[312px]' : 'w-[70px]'} transition-all flex flex-col items-center  duration-500 md:max-w-[312px] z-[9999]`}>
                <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
            </div>
            <div className={`${isCollapsed ? "md:ml-[312px]" : "ml-[60px] md:ml-[70px]"} overflow-auto transition-all duration-500 w-full`}>
                <Navbar />
                <div className="max-w-[1920px] mx-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout