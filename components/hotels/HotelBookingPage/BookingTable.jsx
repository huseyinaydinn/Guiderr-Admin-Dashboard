"use client"


import { useRef, useEffect, useState } from "react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdEdit, MdInfo } from "react-icons/md";

const BookingTypeStyles = {
    family: "text-blue-500 bg-blue-100 px-2 py-1 rounded-full",
    standard: "text-red-400 bg-red-100 px-2 py-1 rounded-full",
    deluxe: "text-green-500 bg-green-100 px-2 py-1 rounded-full",
    suite: "text-purple-500 bg-purple-100 px-2 py-1 rounded-full"
};

const StatusStyles = {
    completed: "text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit",
    canceled: "text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit"
};

const BookingTable = ({ columns, data, isReviews }) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    // Pagination state: 10 data will be shown on each page.
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // When the tab or data changes reset the page number.
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    // Calculate current page data.
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleActionClick = (e, id) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpenMenuId(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (isReviews) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 w-full">
                {data.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={review.ProfilePhoto}
                                alt={review.Name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800 text-base">{review.Name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{review.Email}</p>
                                <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < review.Rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {review.Comment}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 w-full max-w-[1920px] mx-auto">
            <table className="w-full min-w-[1024px] lg:min-w-full xl:min-w-[1400px] text-sm lg:text-base">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-600 uppercase tracking-wider"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                            {columns.map((col, colIndex) => {
                                const columnKeyMap = {
                                    'Invoice ID': 'InvoiceID',
                                    'Booking Type': 'BookingType',
                                    'Room Type': 'RoomType',
                                    'Total Rooms': 'TotalRooms',
                                    'Avg. Price/Night': 'AvgPrice',
                                    'Complaint ID': 'ComplaintID',
                                    'User Name': 'UserName',
                                    'Status': 'Status',
                                    'Rooms': 'Rooms',
                                    'Complaints': 'Complaints'
                                };

                                const dataKey = columnKeyMap[col] || col.replace(/[^a-zA-Z]/g, '');
                                let cellContent = row[dataKey];

                                // Apply a style for the "Booking Type" column
                                if (col === 'Booking Type' && row[dataKey]) {
                                    const type = row[dataKey].toLowerCase();
                                    const styleClass = BookingTypeStyles[type] || "";
                                    cellContent = <span className={styleClass}>• {row[dataKey]}</span>;
                                }

                                // Apply a style for the "Status" column
                                if (col === 'Status' && row[dataKey]) {
                                    const status = row[dataKey].toLowerCase();
                                    const styleClass = StatusStyles[status] || "";
                                    cellContent = <span className={`${styleClass} flex flex-row flex-nowrap items-center min-w-[90px]`}>• {row[dataKey]}</span>;
                                }

                                return (
                                    <td
                                        key={colIndex}
                                        className="px-4 lg:px-6 py-3 lg:py-4 whitespace-normal text-gray-800 text-sm relative"
                                    >
                                        {col === 'Action' ? (
                                            <div className="relative" ref={menuRef}>
                                                <button
                                                    onClick={(e) => handleActionClick(e, rowIndex)}
                                                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                                                >
                                                    <BsThreeDotsVertical className="w-5 h-5" />
                                                </button>
                                                {openMenuId === rowIndex && (
                                                    <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md border border-gray-200 z-50 min-w-[120px]">
                                                        <div className="p-1 flex flex-col items-center gap-2">
                                                            <button

                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    onNavigate(row);
                                                                }}
                                                                className="w-full px-3 py-2 text-left text-sm hover:bg-green-100 hover:text-green-700 rounded-md flex flex-row flex-nowrap items-center gap-2"
                                                            >
                                                                <MdInfo className="text-green-500" />
                                                                Info
                                                            </button>
                                                            <button className="w-full px-3 py-2 text-left text-sm hover:bg-blue-100 hover:text-blue-700 rounded-md flex flex-row flex-nowrap items-center gap-2">
                                                                <MdEdit className="text-blue-500" />
                                                                Edit
                                                            </button>
                                                            <button className="w-full px-3 py-2 text-left text-sm hover:bg-red-100 hover:text-red-800 rounded-md flex flex-row flex-nowrap items-center gap-2">
                                                                <MdDelete className="text-red-500" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            cellContent
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex flex-row items-center justify-end gap-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-gray-300 hover:bg-blue-100 text-gray-700 rounded-md transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-blue-100 rounded-md transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingTable;
