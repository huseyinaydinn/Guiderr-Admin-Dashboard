"use client"

import React, { useState } from 'react';
import BookingTable from '@/components/hotels/HotelBookingPage/BookingTable';
import { IoFilter } from "react-icons/io5";

const TabbedTable = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-white border-t border-gray-200 rounded-xl lg:rounded-2xl shadow-sm p-4 lg:p-6 w-full mx-auto overflow-hidden max-w-[1920px] ">
            <div className="border-gray-200 w-full flex items-center justify-between flex-col md:flex-row gap-2">
                <nav className="flex space-x-4 lg:space-x-6 overflow-x-auto p-2 rounded-2xl w-max bg-[#EBEDFD]">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium rounded-xl transition-colors flex-shrink-0 cursor-pointer
                                ${activeTab === index
                                    ? 'text-white bg-blue-950'
                                    : 'bg-[#EBEDFD] border border-[#D0D5DD] hover:bg-blue-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <button className="flex flex-row flex-nowrap items-center justify-center gap-2 px-4 py-2 rounded-lg border-1 border-gray-200 bg-white text-gray-700 cursor-pointer">
                    Filters
                    <IoFilter />
                </button>
            </div>

            <div className="mt-4 lg:mt-6 w-full">
                <BookingTable
                    columns={tabs[activeTab].columns}
                    data={tabs[activeTab].data}
                    isReviews={tabs[activeTab].label === 'Reviews'}

                />
            </div>
        </div>
    );
};

export default TabbedTable;
