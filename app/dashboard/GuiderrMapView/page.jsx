import Map from "@/components/Map/Map"
import React from 'react'
import { FaBuildingFlag, FaCaretDown, FaCaretUp, FaHotel } from "react-icons/fa6"
import { GiHotMeal } from 'react-icons/gi'
import { IoFilterOutline } from "react-icons/io5"
import { MdApartment } from "react-icons/md"

const GuiderrMapView = () => {

    const cardStats = [
        { title: 'Total Restaurant', count: 3182, change: 7, weekRange: 25, icon: <GiHotMeal className="w-5 h-5 text-purple-900" /> },
        { title: 'Total Hotels', count: 6752, change: -3, weekRange: 30, icon: <FaHotel className="w-5 h-5 text-purple-900" /> },
        { title: 'Total Apartments', count: 2485, change: 12, weekRange: 6, icon: <MdApartment className="w-5 h-5 text-purple-900" /> },
        { title: 'Total Flats', count: 1590, change: -5, weekRange: 12, icon: <FaBuildingFlag className="w-5 h-5 text-purple-900" /> },
    ]
    return (

        <div className="flex flex-col items-start w-full  px-4 md:px-6 h-screen">
            {/* Map View Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-4">
                {cardStats.map(({ title, count, change, weekRange, icon }, idx) => {
                    const isPositive = change >= 0
                    const ArrowIcon = isPositive ? FaCaretUp : FaCaretDown
                    const changeColor = isPositive ? 'text-green-400' : 'text-red-400'

                    return (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h6 className="text-sm text-gray-600 font-medium">{title}</h6>
                                    <h4 className="text-2xl font-bold mt-1">{count}</h4>
                                </div>
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    {icon}
                                </div>
                            </div>
                            <p className="flex items-center gap-1 mt-2 text-xs">
                                <span className={`flex items-center gap-1 ${changeColor}`}>
                                    {Math.abs(change)}%<ArrowIcon />
                                </span>
                                {weekRange} Last Week
                            </p>
                        </div>
                    )
                })}
            </div>


            {/* Search Input */}
            {/* Filter Search div */}
            <div className="flex flex-col md:flex-row gap-2 flex-nowrap justify-between items-center w-full px-6 py-3">
                <form
                    className="w-full md:max-w-md relative flex flex-col md:flex-row items-center gap-2"

                >
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 hidden lg:flex items-center pl-4 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            className="block w-full px-4 py-2 pl-3 lg:pl-10 md:pr-28 pr-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-white outline-none cursor-pointer [&::-webkit-search-cancel-button]:hidden [-moz-appearance:textfield]"
                            placeholder="Search"
                        />

                    </div>
                    <button className="md:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none  transition-colors duration-300 cursor-pointer">
                        <p>Search</p>
                    </button>
                </form>

                <button className="flex flex-row flex-nowrap items-center gap-2 font-medium text-base bg-white border-1 border-gray-400 rounded-lg px-4 py-2 text-gray-700 cursor-pointer">
                    <p>Select Category</p>
                    <IoFilterOutline className="w-5 h-5" />
                </button>
            </div>

            {/* Guiderr Map View Container */}
            <div className="flex items-center justify-center w-full">
                <Map center={[40.0, 29.0]} zoom={7} />
            </div>
        </div>
    )
}

export default GuiderrMapView