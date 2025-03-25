"use client"
import React from 'react'
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import Navbar from "../ui/dashboard/navbar/navbar"
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
        <div className="flex">
            <div className={`h-screen text-white sticky sidebar ${isCollapsed ? 'flex-1/5' : 'flex-1/50'} transition-all duration-500 flex flex-col items-center max-w-[400px]`}>
                <Sidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
            </div>
            <div className={`navbar ${isCollapsed ? 'flex-4/5' : 'flex-11/12'}`}>
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default Layout