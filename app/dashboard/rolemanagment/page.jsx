"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FaPlus } from "react-icons/fa6";
import { IoFilterOutline } from "react-icons/io5";
import { BsThreeDotsVertical, BsDot } from "react-icons/bs";
import RoleTable from "@/constant/RoleManagmentTable";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";

const ITEMS_PER_PAGE = 10;

const RoleManagment = () => {
    const roleStyles = {
        superadmin: "text-blue-500 bg-blue-100",
        user: "text-red-400 bg-red-100",
        moderator: "text-green-500 bg-green-100",
        admin: "text-purple-500 bg-purple-100"
    };

    // STATE'S
    const [currentPage, setCurrentPage] = useState(1);
    const [originalData, setOriginalData] = useState(RoleTable);
    const [filteredData, setFilteredData] = useState(RoleTable);
    const [sortConfig, setSortConfig] = useState({ column: null, isAscending: true });
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        roleName: "",
        supportEmail: "",
        roleType: ""
    });
    const [editingRole, setEditingRole] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);

    // Search States
    const [showSearchFilters, setShowSearchFilters] = useState(false);
    const [searchCategory, setSearchCategory] = useState('all');
    const searchRef = useRef(null);

    // close action menu event
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchFilters(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter and sort events
    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = originalData.filter(item => {
            if (searchCategory === 'RoleName') {
                return item.RoleName.toLowerCase().includes(lowerQuery);
            }
            if (searchCategory === 'SupportEmail') {
                return item.SupportEmail.toLowerCase().includes(lowerQuery);
            }
            if (searchCategory === 'RoleStatus') {
                return item.RoleStatus.toLowerCase().includes(lowerQuery);
            }
            return (
                item.RoleName.toLowerCase().includes(lowerQuery) ||
                item.SupportEmail.toLowerCase().includes(lowerQuery) ||
                item.RoleStatus.toLowerCase().includes(lowerQuery)
            );
        });

        const sorted = [...filtered].sort((a, b) => {
            if (!sortConfig.column) return 0;
            const aVal = a[sortConfig.column]?.toString() || "";
            const bVal = b[sortConfig.column]?.toString() || "";
            return sortConfig.isAscending
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

        setFilteredData(sorted);
        setCurrentPage(1);
    }, [searchQuery, sortConfig, originalData, searchCategory]);

    // Pagination events
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Sort by A-Z functions
    const handleSort = (column) => {
        setSortConfig(prev => ({
            column,
            isAscending: prev.column === column ? !prev.isAscending : true
        }));
    };

    const renderSortIcon = (column) => {
        if (sortConfig.column === column) {
            return sortConfig.isAscending ? (
                <FaArrowDown className="w-3 h-3" />
            ) : (
                <FaArrowUp className="w-3 h-3" />
            );
        }
        return <FaArrowDown className="w-2 h-2 opacity-0" />;
    }

    // Next-Prev functions
    const handlePrevious = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

    // search function
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Add new Role function
    const addNewData = (e) => {
        e.preventDefault();
        const newRole = {
            id: originalData.length + 1,
            RoleName: formData.roleName,
            SupportEmail: formData.supportEmail,
            RoleStatus: formData.roleType,
            icon: null
        };
        setOriginalData(prev => [...prev, newRole]);
        setFormData({
            roleName: "",
            supportEmail: "",
            roleType: ""
        });
        setShowModal(false);
    };

    // Edit function
    const handleEditRole = (role) => {
        setEditingRole(role);
        setFormData({
            roleName: role.RoleName,
            supportEmail: role.SupportEmail,
            roleType: role.RoleStatus
        });
        setShowEditModal(true);
        setActiveDropdown(null);
    };

    // Update function
    const updateRole = (e) => {
        e.preventDefault();
        const updatedData = originalData.map(item =>
            item.id === editingRole.id ? {
                ...item,
                RoleName: formData.roleName,
                SupportEmail: formData.supportEmail,
                RoleStatus: formData.roleType
            } : item
        );
        setOriginalData(updatedData);
        setShowEditModal(false);
    };

    // Delete function
    const confirmDelete = () => {
        setOriginalData(prev => prev.filter(role => role.id !== deletingItem.id));
        setShowDeleteModal(false);
        setActiveDropdown(null);
    };

    // Action Dropdown menu
    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    return (
        <div className="ml-1 mt-6 mb-6 md:ml-6 border border-gray-200 rounded-lg">
            <div className="flex flex-col items-start justify-center">
                {/* Title and Create Role Container */}
                <div className="flex flex-col md:flex-row items-center md:justify-between w-full px-6 py-3 gap-2">
                    <div className="flex flex-col items-start gap-2 md:gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <h4 className="text-lg font-medium">All Roles Listing</h4>
                            <span className="text-[#0077C8] py-1 px-2 rounded-2xl text-sm bg-[rgba(132,14,167,0.1)]">
                                {filteredData.length} Roles
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">Manage your Roles fleet with ease.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex flex-row flex-nowrap items-center cursor-pointer gap-2 px-4 py-2 bg-blue-700 rounded-lg hover:hover:bg-blue-800 text-white transition-colors duration-300">
                        <FaPlus className="w-4 h-4" />
                        <p>Create Role</p>
                    </button>
                </div>

                {/* Filter Search div */}
                <div className="flex flex-col md:flex-row gap-2 flex-nowrap justify-between items-center w-full px-6 py-3">
                    <form
                        className="w-3/4 md:max-w-md relative flex flex-col md:flex-row items-center gap-2"
                        onSubmit={(e) => e.preventDefault()}
                        ref={searchRef}
                    >
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 hidden lg:flex items-center pl-4 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={() => setShowSearchFilters(true)}
                                className="block w-full px-4 py-2 pl-3 lg:pl-10 md:pr-28 pr-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-white outline-none cursor-pointer [&::-webkit-search-cancel-button]:hidden [-moz-appearance:textfield]"
                                placeholder="Search"
                            />

                            {/* Arama Kategorisi Badge */}
                            {searchCategory !== 'all' && (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {searchCategory.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                </div>
                            )}

                            {/* Arama Filtreleri Dropdown */}
                            {showSearchFilters && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    <div className="p-2 space-y-1">
                                        <div
                                            className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${searchCategory === 'all' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                            onClick={() => {
                                                setSearchCategory('all');
                                                setShowSearchFilters(false);
                                            }}
                                        >
                                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                            </svg>
                                            <span className="text-sm">Search All Categories</span>
                                        </div>
                                        <div
                                            className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${searchCategory === 'RoleName' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                            onClick={() => {
                                                setSearchCategory('RoleName');
                                                setShowSearchFilters(false);
                                            }}
                                        >
                                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-sm">Role Name</span>
                                        </div>
                                        <div
                                            className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${searchCategory === 'SupportEmail' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                            onClick={() => {
                                                setSearchCategory('SupportEmail');
                                                setShowSearchFilters(false);
                                            }}
                                        >
                                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm">Support Email</span>
                                        </div>
                                        <div
                                            className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${searchCategory === 'RoleStatus' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                            onClick={() => {
                                                setSearchCategory('RoleStatus');
                                                setShowSearchFilters(false);
                                            }}
                                        >
                                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm">Status</span>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="md:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none  transition-colors duration-300 cursor-pointer">
                            <p>Search</p>
                        </button>
                    </form>

                    <button className="border border-gray-300 text-sm font-medium inline-flex items-center justify-center rounded-lg gap-2 py-2 px-4 cursor-pointer">
                        <IoFilterOutline className="w-5 h-5" />
                        <p>Filters</p>
                    </button>
                </div>

                {/* Table */}
                <div className="min-h-[180px] relative overflow-x-auto border border-gray-200 sm:rounded-t-md w-full px-6 py-3">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    onClick={() => handleSort("RoleName")}
                                    className="px-6 py-3 cursor-pointer whitespace-nowrap"
                                >
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Role Name</p>
                                        {renderSortIcon("RoleName")}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    onClick={() => handleSort("SupportEmail")}
                                    className="px-6 py-3 cursor-pointer whitespace-nowrap"
                                >
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Support Email</p>
                                        {renderSortIcon("SupportEmail")}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    onClick={() => handleSort("RoleStatus")}
                                    className="px-6 py-3 cursor-pointer whitespace-nowrap"
                                >
                                    <div className="flex flex-row gap-2 items-center">
                                        <p>Status</p>
                                        {renderSortIcon("RoleStatus")}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-end whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className="flex flex-row gap-2 items-center">
                                            <span>{item.icon}</span>
                                            <span>{item.RoleName}</span>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.SupportEmail}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className={`flex flex-row items-center gap-1 pr-3 pl-2 py-2 w-fit rounded-2xl font-medium text-xs ${roleStyles[item.RoleStatus] || ""}`}>
                                            <BsDot />
                                            {item.RoleStatus}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-end text-end relative">
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                                        >
                                            <BsThreeDotsVertical />
                                        </button>

                                        {activeDropdown === item.id && (
                                            <div className="absolute -top-3 right-12 mt-1 w-32 px-1 py-1 origin-top-right rounded-lg bg-white shadow-lg outline-1 outline-gray-300 z-50">
                                                <div className="py-1">
                                                    <button
                                                        className="flex flex-row flex-nowrap gap-4 items-center justify-start w-full text-start px-4 py-4 text-sm rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-200 cursor-pointer"
                                                        onClick={() => handleEditRole(item)}
                                                    >
                                                        <MdEdit />
                                                        <p className="text-start">Edit</p>
                                                    </button>
                                                    <button
                                                        className="flex flex-row flex-nowrap justify-start gap-4 items-center w-full text-left px-4 py-4 text-sm rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-700 cursor-pointer"
                                                        onClick={() => {
                                                            setDeletingItem(item);
                                                            setShowDeleteModal(true);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        <MdDelete />
                                                        <p>Delete</p>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="w-full flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-b-lg border border-gray-200">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Page <span className="font-bold">{currentPage}</span>
                                <span className="mx-1"> of </span>
                                <span className="font-bold">{totalPages}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end gap-2">
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

            {/* Create Role Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center ml-8 md:ml-0 z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
                    <div className="bg-white rounded-lg p-3 md:p-6 relative z-10 w-2/3 md:w-1/3">
                        <h2 className="text-xl font-semibold mb-2 text-center">Create Role</h2>
                        <p className="text-base text-gray-600 mb-4 text-center">Please enter the details to add the Roles</p>
                        <form onSubmit={addNewData}>
                            <div className="mb-4">
                                <label htmlFor="roleName" className="block text-sm font-light text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    id="roleName"
                                    name="roleName"
                                    value={formData.roleName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-200 outline-none rounded-md p-2 font-medium text-gray-600 placeholder:font-light placeholder:text-gray-400"
                                    placeholder="Enter Full Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="supportEmail" className="block text-sm font-light text-gray-400">Email</label>
                                <input
                                    type="email"
                                    id="supportEmail"
                                    name="supportEmail"
                                    value={formData.supportEmail}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-200 outline-none rounded-md p-2 font-medium text-gray-600 placeholder:font-light placeholder:text-gray-400"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="roleType" className="block text-sm font-light text-gray-400">Role Type</label>
                                <select
                                    id="roleType"
                                    name="roleType"
                                    value={formData.roleType}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-200 outline-none rounded-md p-2 font-light text-gray-400"
                                    required
                                >
                                    <option value="">Select role type</option>
                                    {Object.keys(roleStyles).map(role => (
                                        <option key={role} value={role} className={`${roleStyles[role]}`}>
                                            • {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-[48px] w-full md:w-1/2 transition-colors duration-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-[48px] w-full md:w-1/2 transition-colors duration-300 cursor-pointer"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Role Modal */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center ml-8 md:ml-0 z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowEditModal(false)}></div>
                    <div className="bg-white rounded-lg p-3 md:p-6 relative z-10 w-2/3 md:w-1/3">
                        <h2 className="text-xl font-semibold mb-2 text-center">Edit Role</h2>
                        <p className="text-base text-gray-600 mb-4 text-center">Update the role details</p>
                        <form onSubmit={updateRole}>
                            <div className="mb-4">
                                <label htmlFor="editRoleName" className="block text-sm font-light text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    id="editRoleName"
                                    name="roleName"
                                    value={formData.roleName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-200 outline-none rounded-md p-2 font-medium text-gray-600 placeholder:font-light placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="editSupportEmail" className="block text-sm font-light text-gray-400">Email</label>
                                <input
                                    type="email"
                                    id="editSupportEmail"
                                    name="supportEmail"
                                    value={formData.supportEmail}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-200 outline-none rounded-md p-2 font-medium text-gray-600 placeholder:font-light placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="editRoleType" className="block text-sm font-light text-gray-400">Role Type</label>
                                <select
                                    id="editRoleType"
                                    name="roleType"
                                    value={formData.roleType}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-200 outline-none rounded-md p-2 font-light text-gray-400"
                                    required
                                >
                                    <option value="">Select role type</option>
                                    {Object.keys(roleStyles).map(role => (
                                        <option key={role} value={role} className={`${roleStyles[role]}`}>
                                            • {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-[48px] w-full md:w-1/2 transition-colors duration-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-[48px] w-full md:w-1/2 transition-colors duration-300 cursor-pointer"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center ml-12 md:ml-0 z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowDeleteModal(false)}></div>
                    <div className="bg-white rounded-lg p-6 relative flex flex-col items-center z-10 w-4/5 md:w-1/3">
                        <div className="w-12 h-12 bg-[rgba(228,81,81,0.3)] outline-16 outline-red-100 flex items-center justify-center rounded-full ">
                            <PiWarningCircle className="w-6 h-6 text-red-700 font-extrabold" />
                        </div>
                        <h2 className="text-xl font-semibold mb-4 mt-8 text-center">Delete</h2>
                        <p className="text-gray-600 text-center mb-6">
                            Are you sure you want to delete this Role? This action cannot be undone.<br />

                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-12 py-2 border-1 border-gray-300 rounded-4xl hover:bg-gray-50 transition-colors  cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-12 py-2 bg-red-500 text-white rounded-4xl hover:bg-red-600 transition-colors cursor-pointer border-1 border-[#6A4C93]"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RoleManagment;