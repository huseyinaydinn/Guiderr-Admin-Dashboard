"use client"

import Image from "next/image";
import ProfileImage from '@/public/hotels/Booking/ProfileImage.png'
import { FaStar } from "react-icons/fa6";
import { useState } from "react";



export default function BookingsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1; // Gerçek veri için dinamik hale getirebilirsiniz

    // Pagination fonksiyonları ekledik
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };


    return (
        <div className="flex flex-col justify-between min-h-screen p-4 lg:p-6 ">
            <div className="flex flex-col flex-nowrap items-start gap-5">

                {/* Profile Section */}
                <div className="bg-gray-200 w-full flex flex-col items-start rounded-xl p-4 md:p-6">
                    {/* Profile section */}
                    <div className="flex flex-row items-center justify-start gap-3">
                        <div>
                            <Image src={ProfileImage} className="rounded-xl w-[50px] h-[50px] md:w-[100px] md:h-[100px]" alt="Profile Image" />
                        </div>
                        <div className="max-w-[50vw]">
                            <h3 className="font-semibold text-base md:text-lg lg:text-4xl text-black">Adam Vasylenko</h3>
                            <p className="font-light text-xs md:text-base lg:text-xl text-gray-4    00">adamvasylenko@gmail.com</p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 justify-between w-full mt-5">
                        <div className="flex flex-col items-start gap-2">
                            <h5 className="text-sm md:text-base font-medium">Invoice ID</h5>
                            <p className="text-xs md:text-sm font-light text-gray-600">INV394fjx1</p>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                            <h5 className="text-sm md:text-base font-medium">Date</h5>
                            <p className="text-xs md:text-sm font-light text-gray-600">12/12/2025</p>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                            <h5 className="text-sm md:text-base font-medium">Booking Type</h5>
                            <p className="text-xs md:text-sm font-light text-gray-600">Family</p>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                            <h5 className="text-sm md:text-base font-medium">Booking Type</h5>
                            <p className="text-xs md:text-sm font-light text-gray-600">Completed</p>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                            <h5 className="text-sm md:text-base font-medium">Price</h5>
                            <p className="text-xs md:text-sm font-light text-gray-600">$250</p>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                            <h5 className="text-sm md:text-base font-medium">Qty</h5>
                            <p className="text-xs md:text-sm font-light text-gray-600">2</p>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                            <h5 className="text-sm md:text-base font-medium">Total Amount</h5>
                            <p className="text-xs md:text-sm font-light text-gray-600">$500</p>
                        </div>

                        <div className="flex flex-col items-start gap-2">
                            <h5 className="text-sm md:text-base font-medium">Payment Method</h5>
                            <p className="text-xs md:text-sm font-light text-gray-600">Credit Card</p>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="bg-white rounded-xl flex flex-col items-start gap-2 p-4 md:p-6">
                    <div className="flex flex-row flex-nowrap items-center justify-start">
                        <FaStar className="w-5 h-5 text-yellow-400" />
                        <h4 className="font-medium text-lg md:text-2xl">4.8/5</h4>
                    </div>

                    <p className="text-sm font-medium text-gray-500 border-1 border-gray-300 rounded-xl p-4 md:p-6">
                        "A Fantastic Stay – Highly Recommended!"
                        I had an amazing experience at [Hotel Name]. The room was clean, spacious, and very comfortable. The staff was incredibly welcoming and attentive, making sure everything was perfect throughout my stay. The food was delicious, with a great variety of options to choose from. The overall atmosphere was relaxing, and I truly enjoyed every moment. I would definitely stay here again and recommend it to anyone looking for a great hotel experience!
                    </p>
                </div>
            </div>
            {/* Pagination */}
            <div className="flex flex-row items-center justify-between w-full">
                <div className="mb-2 sm:mb-0">
                    <span className="text-sm text-gray-700">
                        Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold 
                    ${currentPage === 1
                                ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
                                : 'border border-gray-300 text-blue-600 hover:bg-blue-100 cursor-pointer'}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold 
                    ${currentPage === totalPages
                                ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
                                : 'border border-gray-300 text-blue-600 hover:bg-blue-100 cursor-pointer'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}