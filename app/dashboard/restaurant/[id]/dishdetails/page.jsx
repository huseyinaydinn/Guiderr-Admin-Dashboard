"use client";

import React from 'react';
import dynamic from "next/dynamic";
import { FaStar } from "react-icons/fa6";

// DishCarousel bileşenini dinamik olarak import ediyoruz (SSR: false)
const DishCarousel = dynamic(() => import("@/components/restaurants/DishCarousel"), { ssr: false });

const page = () => {
    return (
        <div className="flex flex-col flex-nowrap items-start gap-6 w-full min-h-screen px-3 ml-1 lg:p-6 md:p:6">
            <div className="flex flex-col items-start gap-5 md:p-4 bg-[#F5F5F5] w-full rounded-xl">
                <h5 className="font-bold text-base md:text-2xl">Dish Info</h5>
                {/* Dish Info Statics */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Name</p>
                        <p className="font-semibold text-sm md:text-base text-black">Zingar Burger 150gm</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Added Date</p>
                        <p className="font-semibold text-sm md:text-base text-black">50</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Category</p>
                        <p className="font-semibold text-sm md:text-base text-black">Fast Food</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Status</p>
                        <p className="font-semibold text-sm md:text-base text-black">• Approved</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Price</p>
                        <p className="font-semibold text-sm md:text-base text-black">$550</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Rating</p>
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            <FaStar className="text-yellow-500" />
                            <p className="font-semibold text-sm md:text-base text-black">4.8/5 (125 Reviews)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 w-full md:px-10">
                <DishCarousel />
            </div>

            <div className="flex flex-col flex-nowrap items-start gap-4">
                <h5 className="font-bold text-base md:text-2xl">Extra</h5>
                <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                    <p className="px-4 sm:px-6 py-2 border-1 border-gray-200 rounded-lg text-gray-500 text-sm">Extra Veggies</p>
                    <p className="px-4 sm:px-6 py-2 border-1 border-gray-200 rounded-lg text-gray-500 text-sm">Extra Cheez</p>
                    <p className="px-4 sm:px-6 py-2 border-1 border-gray-200 rounded-lg text-gray-500 text-sm">Extra Bred</p>
                    <p className="px-4 sm:px-6 py-2 border-1 border-gray-200 rounded-lg text-gray-500 text-sm">Extra Sauce</p>
                    <p className="px-4 sm:px-6 py-2 border-1 border-gray-200 rounded-lg text-gray-500 text-sm">Extra Bred</p>
                    <p className="px-4 sm:px-6 py-2 border-1 border-gray-200 rounded-lg text-gray-500 text-sm">Extra Veggies</p>
                    <p className="px-4 sm:px-6 py-2 border-1 border-gray-200 rounded-lg text-gray-500 text-sm">Extra Cheez</p>
                    <p className="px-4 sm:px-6 py-2 border-1 border-gray-200 rounded-lg text-gray-500 text-sm">Extra Bred</p>
                </div>
            </div>

            <div className="flex flex-col flex-nowrap items-start gap-4">
                <h5 className="font-bold text-base md:text-2xl">Description</h5>
                <p className="text-sm">
                    Zingar Burger (150g) – Indulge in a crispy, golden-fried 150g chicken fillet, perfectly seasoned with bold spices for a fiery kick. Topped with crisp lettuce, creamy mayo, and a layer of melted cheese, all nestled in a soft, toasted bun. Every bite delivers the perfect balance of crunch, juiciness, and mouthwatering flavors. A must-try for spice lovers craving a satisfying and flavorful burger experience! 🍔🔥
                </p>
            </div>
        </div>
    );
};

export default page;