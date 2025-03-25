"use client"

import Image from 'next/image'
import LoginLogo from '@/public/GuiderrMainLogo.svg'
import { Manrope } from "next/font/google";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import FormImage from '@/public/login_Image.jpg'

const fontManrope = Manrope({
    variable: "--font-inter",
    subsets: ["latin"],
});

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={`${fontManrope.className} h-screen bg-[#E2F8F4] flex items-center justify-center p-4`}>
            {/* Ana Container (Ekranın %80'i) */}
            <div className="w-[90%] h-[80vh] lg:h-[60vh] xl:h-[90vh] bg-white rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-2 px-5 py-6 overflow-auto">
                {/* Sol Taraf - Login Form */}
                <div className="flex-1 py-12 px-4 lg:px-12 flex flex-col justify-center gap-4 lg:gap-8 relative">
                    <Image
                        src={LoginLogo}
                        alt="Logo"
                        className="w-[80px] lg:w-[80px]  absolute top-0  left-[50%] lg:top-1 transform -translate-x-1/2 "
                    />

                    {/* Başlık */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-3xl font-extrabold text-[#190F0F]">Let's Get Started</h2>
                        <p className="text-gray-500 font-light text-sm">Welcome! Please enter your email below to get started.</p>
                    </div>

                    {/* Form Alanı */}
                    <form className="flex flex-col gap-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-light text-[#8D8D8D] mb-[6px]">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:border-blue-300 outline-none placeholder:text-sm placeholder:font-light placeholder:text-[#5E718D] text-[#5E718D] font-medium text-sm"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-light text-[#8D8D8D] mb-[6px]">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="w-full pl-4 pr-8 py-3 rounded-3xl border border-gray-300 focus:border-blue-300 outline-none placeholder:text-sm placeholder:font-light placeholder:text-[#5E718D] text-[#5E718D] font-medium text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-600"
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-4 w-4" />
                                    ) : (
                                        <FiEye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Giriş Butonu */}
                        <button
                            type="submit"
                            className="w-full bg-[#4A90E2] hover:bg-blue-500 cursor-pointer text-white font-medium py-3 px-4 rounded-3xl transition-colors duration-300"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Sağ Taraf - Görsel */}
                <div className="flex-1 relative hidden lg:block">
                    <Image
                        src={FormImage}
                        alt="Login Banner"
                        fill
                        objectFit="fill"
                        objectPosition="center"
                        className="rounded-2xl flex"
                    />
                </div>
            </div>
        </div>
    );
}
