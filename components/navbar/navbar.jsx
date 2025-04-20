"use client"

import React from 'react'
import HeaderAvatar from '@/public/HeaderAvatar.png'
import Image from "next/image"
import { usePathname } from 'next/navigation'
import menuLinks from "@/constant/SidebarMenu";

const Navbar = () => {
    const pathname = usePathname()

    // Aktif sayfanın başlığını bul
    const getActiveTitle = () => {
        const activeLink = menuLinks.find(link => link.href === pathname)
        return activeLink?.text || 'Dashboard' // Eğer bulunamazsa varsayılan başlık
    }

    return (
        <div className="bg-gray-50 border-b-gray-300 shadow-sm flex flex-row justify-between items-center px-6 py-2">
            <div>
                <h4 className="font-semibold text-gray-800 text-md md:text-xl">
                    {getActiveTitle()}
                </h4>
            </div>

            <div>
                <Image
                    src={HeaderAvatar}
                    alt="avatar"
                    className="rounded-full w-8 h-8 md:w-10 md:h-10 cursor-pointer"
                />
            </div>
        </div>
    )
}

export default Navbar