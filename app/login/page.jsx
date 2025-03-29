"use client"

import Image from 'next/image'
import LoginLogo from '@/public/GuiderrMainLogo.svg'
import { Manrope } from "next/font/google";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import FormImage from '@/public/login_Image.jpg'

const fontManrope = Manrope({ subsets: ["latin"] });

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={`${fontManrope.className} min-h-screen bg-[#E2F8F4] flex items-center justify-center p-4`}>
            {/* Main Container */}
            <div className="w-full max-w-[1000px] min-h-[500px] md:h-[550px]  bg-white rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Login Form Left */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                    <div className="w-full max-w-[320px] px-4 sm:px-0">
                        <Image src={LoginLogo} alt="Logo" className="w-16 sm:w-20 mx-auto mb-4 sm:mb-6" />

                        <div className="mb-4 sm:mb-6 text-center">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#190F0F] mb-1 sm:mb-2">
                                Let's Get Started
                            </h2>
                            <p className="text-gray-500 font-light text-xs sm:text-sm">
                                Welcome! Please enter your email below to get started.
                            </p>
                        </div>

                        <form className="space-y-4 sm:space-y-5">
                            {/* Email Input */}
                            <div>
                                <label className="block text-xs font-light text-[#8D8D8D] mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2.5 sm:py-3 rounded-[18px] border border-gray-300 focus:border-blue-300 outline-none placeholder:text-gray-400 text-[#5E718D] text-xs sm:text-sm"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-xs font-light text-[#8D8D8D] mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2.5 sm:py-3 pr-10 rounded-[18px] border border-gray-300 focus:border-blue-300 outline-none placeholder:text-gray-400 text-[#5E718D] text-xs sm:text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A90E2] hover:text-blue-500"
                                    >
                                        {showPassword ? <FiEyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <FiEye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#4A90E2] hover:bg-blue-600 text-white font-medium py-2.5 sm:py-3 rounded-[18px] text-xs sm:text-sm"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>

                {/* Login Form Image Side */}
                <div className="hidden md:block relative md:h-full overflow-hidden rounded-3xl">
                    <Image
                        src={FormImage}
                        alt="Login Banner"
                        fill
                        priority
                        quality={100}
                        className="object-cover overflow-auto rounded-4xl px-4 py-4"
                        sizes="(max-width: 959px) 0vw, 50vw"
                    />
                </div>
            </div>
        </div>
    );
}
