"use client";

import TagsInput from "@/components/restaurants/AddNewDish/AddNewTag/AddNewTagComponent";
import ImageUploadContainer from "@/components/restaurants/AddNewDish/AddNewTag/ImageUploadContainer";
import React, { useState } from "react";


const page = () => {
    const [activeTab, setActiveTab] = useState("Dishes");
    const [activePage, setActivePage] = useState(1); // Sayfa sayısını yönetmek için



    return (
        <div className="flex flex-col items-start gap-4 px-6 py-8">
            <div className="flex space-x-2 bg-gray-200 w-fit p-2 rounded-lg">
                <button
                    onClick={() => {
                        setActiveTab("Dishes");
                        setActivePage(1); // Sekme değiştiğinde sayfayı sıfırla
                    }}
                    className={`px-4 py-2 lg:px-6 text-sm lg:text-base font-medium rounded-xl transition-colors flex-shrink-0 cursor-pointer
                        ${activeTab === "Dishes"
                            ? "text-white bg-blue-950"
                            : "bg-[#EBEDFD] border border-[#D0D5DD] hover:bg-blue-200"
                        }`}
                >
                    Dishes
                </button>
                <button
                    onClick={() => {
                        setActiveTab("Deals");
                        setActivePage(1); // Sekme değiştiğinde sayfayı sıfırla
                    }}
                    className={`px-4 py-2 lg:px-6 text-sm lg:text-base font-medium rounded-xl transition-colors flex-shrink-0 cursor-pointer
                        ${activeTab === "Deals"
                            ? "text-white bg-blue-950"
                            : "bg-[#EBEDFD] border border-[#D0D5DD] hover:bg-blue-200"
                        }`}
                >
                    Deals
                </button>
            </div>

            <div className="mt-6 w-full">
                {/* add new dishes content */}
                {activeTab === "Dishes" && (
                    <div className="flex flex-col items-start gap-4 p-1 md:p-6">
                        <h5 className="font-semibold text-lg">Add New Dish Details</h5>

                        {/* Grid container'a justify-items-start ekledik */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-start">
                            {/* 1. Name input */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-600">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter"
                                    className="py-3 px-4 text-gray-300 border border-gray-300 rounded-lg w-full text-left"
                                />
                            </div>

                            {/* 2. Price input */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-600">Price</label>
                                <input
                                    type="text"
                                    placeholder="Enter"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        e.target.value = `$ ${value}`;
                                    }}
                                    className="py-3 px-4 text-gray-300 border border-gray-300 rounded-lg w-full text-left"
                                />
                            </div>

                            {/* 3. Dropdown input */}
                            <div className="relative w-full">
                                <label className="block text-sm font-medium text-gray-600">Dropdown</label>
                                <select className="appearance-none py-3 px-4 text-gray-300 border border-gray-300 rounded-lg w-full text-left">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    {/* Diğer seçenekler */}
                                </select>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </div>



                        </div>
                        {/* 4. Description input */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-600">Description</label>
                            <textarea
                                rows={4}
                                placeholder="Enter description"
                                className="py-3 px-4 text-gray-300 border border-gray-300 rounded-lg w-full resize-none text-left"
                            ></textarea>
                        </div>


                        <div>
                            <h5 className="font-semibold text-lg">Extra</h5>
                            <TagsInput />
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <h5 className="font-semibold text-lg">Upload Images</h5>
                            <div className="flex flex-row gap-4">
                                <ImageUploadContainer />
                                <ImageUploadContainer />
                                <ImageUploadContainer />
                                <ImageUploadContainer />
                                <ImageUploadContainer />
                                <ImageUploadContainer />
                                <ImageUploadContainer />
                            </div>

                        </div>

                        <div className="flex flex-row items-center w-full justify-end gap-4 mt-4">
                            <button
                                className="flex flex-row flex-nowrap items-center cursor-pointer gap-2 px-12 py-2 border border-gray-300 bg-white rounded-lg hover:hover:bg-gray-200 text-gray-600 transition-colors duration-300">
                                <p>Cancel</p>
                            </button>
                            <button
                                className="flex flex-row flex-nowrap items-center cursor-pointer gap-2 px-12 py-2 bg-blue-400 rounded-lg hover:hover:bg-blue-500 text-white transition-colors duration-300">
                                <p>Save</p>
                            </button>
                        </div>
                    </div>
                )}

                {/* add new deals content */}
                {activeTab === "Deals" && <div>Deals content goes here...</div>}
            </div>
        </div>
    );
};

export default page;
