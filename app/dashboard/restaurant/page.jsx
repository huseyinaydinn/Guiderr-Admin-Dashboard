"use client"

import RestaurantTable from "@/constant/restaurant/RestaurantTable";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react'
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaStar, FaArrowDown, FaArrowUp, FaInfo, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { IoFilterOutline } from "react-icons/io5";
import { LuFileCheck } from "react-icons/lu";
import { MdEdit, MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";

const ITEMS_PER_PAGE = 10;

const Page = () => {
    const roleStyles = {
        Active: "text-blue-500 bg-blue-100",
        Blocked: "text-red-400 bg-red-100",
        Pending: "text-yellow-600 bg-yellow-100"
    };

    // STATES
    const [currentPage, setCurrentPage] = useState(1);
    const [originalData, setOriginalData] = useState(RestaurantTable);
    const [filteredData, setFilteredData] = useState(RestaurantTable);
    const [sortConfig, setSortConfig] = useState({ column: null, isAscending: true });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        restaurantName: "",
        restaurantType: "",
        restaurantEmail: "",
        restaurantContact: "",
        rating: "",
        status: ""
    });
    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [searchCategory, setSearchCategory] = useState('all');
    const [showSearchFilters, setShowSearchFilters] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = originalData.filter(item => {
            const name = item.restaurantName?.toLowerCase() || "";
            const type = item.restaurantType?.toLowerCase() || "";
            const email = item.restaurantEmail?.toLowerCase() || "";
            const status = item.status?.toLowerCase() || "";

            if (searchCategory === 'restaurantName') return name.includes(lowerQuery);
            if (searchCategory === 'restaurantType') return type.includes(lowerQuery);
            if (searchCategory === 'restaurantEmail') return email.includes(lowerQuery);
            if (searchCategory === 'status') return status.includes(lowerQuery);

            return (
                name.includes(lowerQuery) ||
                type.includes(lowerQuery) ||
                email.includes(lowerQuery) ||
                status.includes(lowerQuery)
            );
        });
        const sorted = [...filtered].sort((a, b) => {
            if (!sortConfig.column) return 0;
            const aVal = a[sortConfig.column]?.toString() || "";
            const bVal = b[sortConfig.column]?.toString() || "";
            return sortConfig.isAscending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });

        setFilteredData(sorted);
        setCurrentPage(1);
    }, [searchQuery, sortConfig, originalData, searchCategory]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Sorting functions
    const handleSort = (column) => {
        setSortConfig(prev => ({
            column,
            isAscending: prev.column === column ? !prev.isAscending : true
        }));
    };

    const renderSortIcon = (column) => {
        if (sortConfig.column === column) {
            return sortConfig.isAscending
                ? <FaArrowDown className="w-3 h-3" />
                : <FaArrowUp className="w-3 h-3" />;
        }
        return <FaArrowDown className="w-2 h-2 opacity-0" />;
    }

    // PageNext PagePrev functions
    const handlePrevious = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

    // Search and Filter
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchFilters(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // CRUD Operations
    const handleEditRestaurant = (restaurant) => {
        setEditingRestaurant(restaurant);
        setFormData(restaurant);
        setShowEditModal(true);
        setActiveDropdown(null);
    };

    const updateRestaurant = (e) => {
        e.preventDefault();
        const updatedData = originalData.map(item =>
            item.id === editingRestaurant.id ? { ...item, ...formData } : item
        );
        setOriginalData(updatedData);
        setShowEditModal(false);
    };

    const confirmDelete = () => {
        setOriginalData(prev => prev.filter(restaurant => restaurant.id !== deletingItem.id));
        setShowDeleteModal(false);
        setActiveDropdown(null);
    };

    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const stats = [
        { title: 'Total Restaurants', count: 784, change: 7, weekRange: 25 },
        { title: 'Active Restaurants', count: 512, change: -3, weekRange: 30 },
        { title: 'Pending Restaurants', count: 102, change: 12, weekRange: 6 },
        { title: 'Blocked Restaurants', count: 23, change: -5, weekRange: 12 },
    ]


    return (
        <div className="mx-auto max-w-[2880px] pb-6 px-4 md:px-6 lg:px-8 flex flex-col gap-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-4">
                {stats.map(({ title, count, change, weekRange }, idx) => {
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
                                    <LuFileCheck className="w-5 h-5 text-purple-900" />
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

            {/* Search & Filter Side */}
            <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch">
                <form className="flex-1 relative" ref={searchRef}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={() => setShowSearchFilters(true)}
                            className="w-full pl-10 pr-24 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search restaurants..."
                        />

                        {searchCategory !== 'all' && (
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    {searchCategory.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        )}

                        {showSearchFilters && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                <div className="p-2 space-y-1">
                                    {['all', 'restaurantName', 'restaurantType', 'restaurantEmail', 'status'].map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setSearchCategory(category);
                                                setShowSearchFilters(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm ${searchCategory === category
                                                ? 'bg-blue-50 text-blue-800'
                                                : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                        >
                                            {category.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </form>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <IoFilterOutline className="w-5 h-5" />
                        <span className="text-sm">Filters</span>
                    </button>
                    <Link
                        href={'/dashboard/restaurant/addNewRestaurant'}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                    >
                        <FaPlus className="w-5 h-5 text-white" />
                        <span className="text-sm text-white">Add New Restaurant</span>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Restaurants</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                {['restaurantName', 'restaurantType', 'restaurantEmail', 'restaurantContact', 'rating', 'status'].map((column) => (
                                    <th
                                        key={column}
                                        onClick={() => handleSort(column)}
                                        className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <span>{column.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            {renderSortIcon(column)}
                                        </div>
                                    </th>
                                ))}
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3.5 text-sm text-gray-900">{item.restaurantName}</td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700">{item.restaurantType}</td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700">{item.restaurantEmail}</td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700">{item.restaurantContact}</td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700">
                                        <div className="flex items-center gap-1.5">
                                            <FaStar className="text-yellow-400" />
                                            <span>{item.rating}/5</span>
                                            <span className="text-gray-500">({item.reviews})</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className={`inline-flex items-center justify-center flex-nowrap flex-row px-2.5 py-0.5 rounded-full text-xs font-medium ${roleStyles[item.status]}`}>
                                            <BsDot />
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5 text-right relative">
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            className="p-1 hover:bg-gray-100 rounded-lg"
                                        >
                                            <BsThreeDotsVertical className="w-5 h-5 text-gray-600" />
                                        </button>
                                        {activeDropdown === item.id && (
                                            <div className="absolute right-10 top-10 bg-white shadow-lg rounded-lg py-1 z-50 border border-gray-200">
                                                <Link
                                                    href={`/dashboard/restaurant/${item.id}`}
                                                    target="_blank"
                                                    className="flex items-center gap-2 px-4 py-2.5 w-full hover:bg-green-50 text-sm"
                                                >
                                                    <FaInfo className="text-green-600" />
                                                    Info
                                                </Link>
                                                <button
                                                    onClick={() => handleEditRestaurant(item)}
                                                    className="flex items-center gap-2 px-4 py-2.5 w-full hover:bg-blue-50 text-sm"
                                                >
                                                    <MdEdit className="text-blue-600" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDeletingItem(item);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2.5 w-full hover:bg-red-50 text-sm"
                                                >
                                                    <MdDelete className="text-red-600" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200">
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

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-md p-6">
                        <div className="text-center">
                            <PiWarningCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-bold mb-2">Delete Restaurant</h3>
                            <p className="mb-4">Are you sure you want to delete this restaurant? This action cannot be undone.</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-md p-6">
                        <h2 className="text-xl font-bold mb-4">Edit Restaurant</h2>
                        <form onSubmit={updateRestaurant}>
                            {['restaurantName', 'restaurantType', 'restaurantEmail', 'restaurantContact', 'rating', 'status'].map((field) => (
                                <div key={field} className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        {field.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    {field === 'status' ? (
                                        <select
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            {Object.keys(roleStyles).map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field === 'rating' ? 'number' : 'text'}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                            step={field === 'rating' ? "0.1" : undefined}
                                            min={field === 'rating' ? "0" : undefined}
                                            max={field === 'rating' ? "5" : undefined}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex gap-3 justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page;