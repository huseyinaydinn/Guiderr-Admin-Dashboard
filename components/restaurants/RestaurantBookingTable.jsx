
import RestaurantBookingPage from "@/constant/restaurant/RestaurantBookingPage";
import { useEffect, useRef, useState } from "react";
import { FaPlus, FaInfo } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";

export default function TableComponent({ restaurantId }) {
    const [activeTab, setActiveTab] = useState(RestaurantBookingPage[0].label);
    const [activePage, setActivePage] = useState(1);
    const recordsPerPage = 10;
    const [activeDropdown, setActiveDropdown] = useState(null);

    console.log(restaurantId)

    // To catch dropdown ref
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // If dropdown is on and the clicked element is not in the dropdown container
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    // Example toggleDropdown function
    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    // Sample edit and delete functions (develop as you wish)
    const handleEdit = (item) => {
        console.log("Edit", item);
    };

    const handleDelete = (item) => {
        console.log("Delete", item);
    };

    // Find active page of table
    const activeTable = RestaurantBookingPage.find(
        (table) => table.label === activeTab
    );

    // Slicing data according to page numbers
    const indexOfLastRecord = activePage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = activeTable.data.slice(indexOfFirstRecord, indexOfLastRecord);

    // We calculate the total number of pages
    const totalPages = Math.ceil(activeTable.data.length / recordsPerPage);

    // Functions for page switching
    const handleNextPage = () => {
        if (activePage < totalPages) {
            setActivePage(activePage + 1);
        }
    };

    const handlePrevPage = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    };

    return (
        <div className="bg-white border-t border-gray-200 rounded-xl lg:rounded-2xl shadow-sm p-4 lg:p-6 w-full mx-auto overflow-hidden max-w-[1920px] ">
            {/* Tab Menu */}
            <div className="flex flex-row items-center justify-between w-full mb-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            setActiveTab("Dishes");
                            setActivePage(1); // We reset the page when the tab changes.
                        }}
                        className={`px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base font-medium rounded-xl transition-colors flex-shrink-0 cursor-pointer
                         ${activeTab === "Dishes" ? "text-white bg-blue-950" : "bg-[#EBEDFD] border border-[#D0D5DD] hover:bg-blue-200"
                            }`}
                    >
                        Dishes
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("Deals");
                            setActivePage(1); // We reset the page when the tab changes.
                        }}
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
                    <Link
                        href={`/dashboard/restaurant/${restaurantId}/addNew`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
                    >
                        <FaPlus className="w-5 h-5 text-white" />
                        <span className="text-sm text-white">Add New</span>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            {activeTable.columns.map((column, idx) => (
                                <th
                                    key={idx}
                                    className="px-4 py-6 text-left text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50 border-b border-gray-200">
                                {activeTable.columns.map((column, idx) => {
                                    if (column.toLowerCase() === "action") {
                                        return (
                                            <td key={idx} className="px-4 py-3.5 text-right relative">
                                                <button
                                                    onClick={() => toggleDropdown(row.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-lg flex "
                                                >
                                                    <BsThreeDotsVertical className="w-5 h-5 text-gray-600" />
                                                </button>
                                                {activeDropdown === row.id && (
                                                    <div ref={dropdownRef} className="absolute right-10 top-10 bg-white shadow-lg rounded-lg py-1 z-50 border border-gray-200">
                                                        <Link
                                                            href={`/dashboard/restaurant/${row.id}/dishdetails`}
                                                            target="_blank"
                                                            className="flex items-center gap-2 px-4 py-2.5 w-full hover:bg-green-50 text-sm"
                                                        >
                                                            <FaInfo className="text-green-600" />
                                                            Info
                                                        </Link>
                                                        <button
                                                            onClick={() => handleEdit(row)}
                                                            className="flex items-center gap-2 px-4 py-2.5 w-full hover:bg-blue-50 text-sm"
                                                        >
                                                            <MdEdit className="text-blue-600" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(row)}
                                                            className="flex items-center gap-2 px-4 py-2.5 w-full hover:bg-red-50 text-sm"
                                                        >
                                                            <MdDelete className="text-red-600" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    } else {
                                        return (
                                            <td key={idx} className="border-b border-gray-200 px-4 py-4">
                                                {row[column]}
                                            </td>
                                        );
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                    {activePage} of {totalPages} Pages
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={activePage === 1}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${activePage === 1
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={activePage === totalPages}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${activePage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}