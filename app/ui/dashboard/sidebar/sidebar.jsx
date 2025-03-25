"use client"

import Image from "next/image"
import React, { useState, useEffect } from 'react'
import sidebarLogo from '@/public/GuiderrLogo.svg'
import { FiSidebar } from "react-icons/fi";
import Link from "next/link";
import menuLinks from "@/constant/constant";
import { CiLogin } from "react-icons/ci";


const Sidebar = ({ toggleSidebar, isCollapsed }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isCollapsed !== undefined) {
            setIsAnimating(true);
            const timeout = setTimeout(() => {
                setIsAnimating(false);
            }, 300); // Animasyon süresi ile aynı olmalı
            return () => clearTimeout(timeout);
        }
    }, [isCollapsed]);

    return (
        <div className={`flex flex-col items-center justify-around px-2 h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-64' : 'w-20'} ${isAnimating ? 'opacity-20' : 'opacity-100'}`}>
            {/* Side bar Logo Area */}
            <div className="w-full h-1/12 flex flex-row items-center justify-around border-b-1 border-gray-600">
                <Link href="/dashboard">
                    <Image src={sidebarLogo} className={`${isCollapsed ? 'w-[106px]' : 'w-[70px]'} h-6 transition-all duration-300 ease-in-out`} alt="Logo" />
                </Link>
                <button className="cursor-pointer" onClick={toggleSidebar}>
                    <FiSidebar className={`${isCollapsed ? 'h-6 w-6' : 'h-4 w-4'} transition-all duration-300 ease-in-out`} />
                </button>
            </div>

            {/* Side bar Menu */}
            <div className="flex flex-col gap-3 mt-5 h-10/12">
                {
                    menuLinks.map((link) => (
                        <Link href={link.href} key={link.id} className="flex flex-row px-3 py-2 hover:bg-gradient-to-r hover:from-[#0077C8] hover:to-[#840EA7] rounded-md transition duration-400">
                            <div className="flex flex-row items-center justify-start gap-3">
                                {link.icon}
                                <h4 className={`${isCollapsed ? 'block' : 'hidden'} transition-all duration-300 ease-in-out text-nowrap`}>{link.text}</h4>
                            </div>
                        </Link>
                    ))
                }
            </div>

            {/*Side bar Logout Area */}
            <div className="h-1/12">
                <button className="flex flex-row items-center justify-between cursor-pointer px-3 py-2 hover:bg-gradient-to-r hover:from-[#0077C8] hover:to-[#840EA7] rounded-md transition duration-400">
                    <p className={`${isCollapsed ? 'block' : 'hidden'}`}>Logout</p>
                    <CiLogin />
                </button>
            </div>
        </div>
    )
}

export default Sidebar