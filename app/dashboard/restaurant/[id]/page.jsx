"use client"


import DonutLinesChart from "@/components/restaurants/DonutLinesChart"
import RestaurantDetailCards from "@/constant/restaurant/RestaurantDetailCards"
import RestaurantTable from "@/constant/restaurant/RestaurantTable"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import React from 'react'
import { FaSortDown, FaSortUp, FaStar } from "react-icons/fa6"
import { IoFilter } from "react-icons/io5"
import RestaurantBookingTable from '@/components/restaurants/RestaurantBookingTable'

const page = () => {
    const params = useParams()
    const restaurant = RestaurantTable.find(item => item.id === Number(params.id))


    if (!restaurant) return <div className="p-4">Restaurant bulunamadı</div>

    const DonutChartCard = dynamic(
        () => import('@/components/hotels/DonutChartCard'),
        { ssr: false, loading: () => <p>Loading...</p> } // Loading
    );

    const LineChart = dynamic(
        () => import('@/components/hotels/LineChart'),
        { ssr: false, loading: () => <p>Loading...</p> }
    )

    return (
        <div className="w-full mx-auto flex flex-col items-center justify-start">

            <div className="w-full bg-gray-300 flex items-center justify-center">
                <div className="p-4 max-w-[1920px] w-full  bg-gray-300">
                    <div className="w-full flex flex-row items-center justify-between">
                        <h4 className="text-2xl font-semibold">Restaurant Info</h4>
                        <button
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
                        >
                            <span className="text-sm">View More Details</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-start gap-6 mt-6">
                        <div className="flex flex-col items-start">
                            <h5 className="font-normal text-sm text-gray-600">Restaurant Name</h5>
                            <h4 className="font-medium text-lg text-black">{restaurant.restaurantName}</h4>
                        </div>

                        <div className="flex flex-col items-start">
                            <h5 className="font-normal text-sm text-gray-600">Contact Number</h5>
                            <h4 className="font-medium text-lg text-black">{restaurant.restaurantContact}</h4>
                        </div>

                        <div className="flex flex-col items-start">
                            <h5 className="font-normal text-sm text-gray-600">Hotel Type</h5>
                            <h4 className="font-medium text-lg text-black">{restaurant.restaurantType}</h4>
                        </div>


                        <div className="flex flex-col items-start">
                            <h5 className="font-normal text-sm text-gray-600">Hotel Location</h5>
                            <h4 className="font-medium text-lg text-black">{restaurant.restaurantLocation}</h4>
                        </div>

                        <div className="flex flex-col items-start">
                            <h5 className="font-normal text-sm text-gray-600">Onboarding Model</h5>
                            <h4 className="font-medium text-lg text-black">{restaurant.restaurantOnboardModel}</h4>
                        </div>

                        <div className="flex flex-col items-start">
                            <h5 className="font-normal text-sm text-gray-600">Commission & Pricing</h5>
                            <h4 className="font-medium text-lg text-black">{restaurant.restaurantCommissionPricing}</h4>
                        </div>


                        <div className="flex flex-col items-start">
                            <h5 className="font-normal text-sm text-gray-600">Google Rating</h5>
                            <div className="flex flex-row flex-nowrap items-center gap-2">
                                <FaStar className="text-yellow-500 w-4 h-4" />
                                <h4 className="font-medium text-lg text-black">{restaurant.rating}</h4>
                            </div>
                        </div>

                        <div className="flex flex-col items-start">
                            <h5 className="font-normal text-sm text-gray-600">Compliance Confirmation</h5>
                            <h4 className="font-medium text-lg text-black">{restaurant.restaurantCommissionPricing}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center xl:justify-between items-center max-w-[1920px] flex-wrap  gap-4 w-full p-2 md:p-4 lg:p-6">
                {/* Booking & Booking Overview */}
                <div className="flex flex-col gap-2 lg:gap-4">
                    {/* Booking Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                        {RestaurantDetailCards.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h6 className="text-sm text-gray-600 font-medium">{item.title}</h6>
                                        <h4 className="text-2xl font-bold mt-1">{item.amount}</h4>
                                    </div>
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        {item.icon}
                                    </div>
                                </div>
                                <div className="flex flex-row flex-nowrap items-center gap-1">
                                    <p className={`flex flex-row items-center gap-1 mt-2 text-xs ${item.percent > 0 ? 'text-green-400' : 'text-red-500'}`}>{item.percent}%{item.percent > 0 ? <FaSortUp className="w-2 h-2" /> : <FaSortDown className="w-2 h-2" />}</p>
                                    <p className="mt-2 text-xs text-gray-500">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Booking Overview */}
                    <div className="flex flex-col items-start justify-between">
                        <LineChart width={600} height={200} />
                    </div>



                </div>

                {/* bookings category */}
                <div className="flex flex-col items-center justify-between gap-4">
                    <div className="w-full flex flex-row flex-nowrap items-center justify-between gap-4">
                        <h5 className="font-semibold text-lg">Bookings Category</h5>
                        <div>
                            <button className="flex flex-row flex-nowrap items-center justify-center gap-2 px-4 py-2 rounded-lg border-1 border-gray-200 bg-white text-gray-700 cursor-pointer">
                                Filters
                                <IoFilter />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between">
                        <DonutChartCard />
                        <div>
                            <DonutLinesChart />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center w-full mx-auto">
                <RestaurantBookingTable />
            </div>
        </div>
    )
}

export default page