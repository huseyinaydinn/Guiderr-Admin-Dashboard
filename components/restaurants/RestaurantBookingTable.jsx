
import RestaurantBookingPage from "@/constant/restaurant/RestaurantBookingPage";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";


export default function TableComponent() {
    const [activeTab, setActiveTab] = useState(RestaurantBookingPage[0].label);

    // Aktif sekmeye ait tablo konfigürasyonunu buluyoruz
    const activeTable = RestaurantBookingPage.find(
        (table) => table.label === activeTab
    );



    return (
        <div className="bg-white border-t border-gray-200 rounded-xl lg:rounded-2xl shadow-sm p-4 lg:p-6 w-full mx-auto overflow-hidden max-w-[1920px] ">
            {/* Sekme Menüsü */}
            <div className="flex flex-row items-center justify-between w-full mb-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setActiveTab("Dishes")}
                        className={`px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium rounded-xl transition-colors flex-shrink-0 cursor-pointer
                         ${activeTab === "Dishes" ? "text-white bg-blue-950" : "bg-[#EBEDFD] border border-[#D0D5DD] hover:bg-blue-200"
                            }`}
                    >
                        Dishes
                    </button>
                    <button
                        onClick={() => setActiveTab("Deals")}
                        className={`px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium rounded-xl transition-colors flex-shrink-0 cursor-pointer ${activeTab === "Deals" ? "text-white bg-blue-950" : "bg-[#EBEDFD] border border-[#D0D5DD] hover:bg-blue-200"
                            }`}
                    >
                        Deals
                    </button>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <button className="flex flex-row flex-nowrap items-center justify-center gap-2 px-4 py-2 rounded-lg border-1 border-gray-200 bg-white text-gray-700 cursor-pointer">
                        Filters
                        <IoFilter />
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
                    >
                        <FaPlus className="w-5 h-5 text-white" />
                        <span className="text-sm text-white">Add New</span>
                    </button>
                </div>
            </div>



            {/* Tablo */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            {activeTable.columns.map((column, idx) => (
                                <th
                                    key={idx}
                                    className="px-4 py-4 text-left text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {activeTable.data.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50 border-b">
                                {activeTable.columns.map((column, idx) => (
                                    <td key={idx} className="border-b border-gray-200 px-4 py-4">
                                        {row[column]}
                                    </td>

                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}