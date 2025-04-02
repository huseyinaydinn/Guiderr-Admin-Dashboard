"use client"
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import HotelDetailsCheckbox from "@/app/constant/HotelDetailsCheckbox";
import { ImUpload } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import {
    hotelTypes,
    seasonalOptions,
    roomCategories,
    cancellationPolicies,
    checkInOutOptions
} from '@/app/constant/AddNewHotel'



// Reusable Components
const FileUpload = ({ id, label }) => (
    <div className="relative group">
        <input type="file" className="hidden" id={id} accept=".jpeg,.jpg,.pdf" />
        <label
            htmlFor={id}
            className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary transition-colors cursor-pointer"
        >
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-blue-950 rounded-2xl flex items-center justify-center">
                    <ImUpload className="text-3xl text-primary text-white" />
                </div>
                <p className="text-gray-600 font-medium">{label}</p>
                <p className="text-sm text-gray-400">Supported formats: JPEG, PDF</p>
            </div>
        </label>
    </div>
);

const RoomTypeSection = ({ title, categoryKey, images, handleImageChange, handleRemoveImage }) => {
    const [selectedPolicy, setSelectedPolicy] = useState('');
    const [selectedCheckInOut, setSelectedCheckInOut] = useState('');
    const [price, setPrice] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPrice(value ? `$ ${value}` : '');
    };

    const handleNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setNumberOfRooms(value);
    };

    return (
        <div className="min-h-[500px] flex flex-col gap-6 mb-10 text-gray-500 text-xl">
            <h4 className="font-semibold text-2xl mb-2 text-gray-800">{title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Room Type Dropdown */}
                <div>
                    <label className="block mb-1 text-sm">Room Type</label>
                    <Listbox value={title} onChange={() => { }}>
                        <div className="relative">
                            <Listbox.Button className="w-full border px-4 py-3 rounded-md border-gray-300 outline-none focus:border-gray-400 transition-colors duration-300 text-left bg-gray-100">
                                {title}
                            </Listbox.Button>
                        </div>
                    </Listbox>
                </div>

                {/* Number of Rooms */}
                <div>
                    <label className="block mb-1 text-sm">Number of Rooms</label>
                    <input
                        type="text"
                        value={numberOfRooms}
                        onChange={handleNumberChange}
                        placeholder="Enter"
                        className="w-full border px-4 py-3 rounded-md placeholder:font-extralight border-gray-300 outline-none focus:border-gray-400 transition-colors duration-300"
                        onKeyDown={(e) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
                    />
                </div>

                {/* Cancellation Policy Dropdown */}
                <div>
                    <label className="block mb-1 text-sm">Cancellation Policy</label>
                    <Listbox value={selectedPolicy} onChange={setSelectedPolicy}>
                        <div className="relative">
                            <Listbox.Button className="w-full border px-4 py-3 rounded-md border-gray-300 outline-none focus:border-gray-400 transition-colors duration-300 text-left">
                                {selectedPolicy || 'Select Policy'}
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                                    {cancellationPolicies.map((policy, index) => (
                                        <Listbox.Option
                                            key={index}
                                            value={policy}
                                            className={({ active }) => `cursor-pointer p-3 ${active ? 'bg-blue-50' : ''}`}
                                        >
                                            {policy}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>

                {/* Check-in/Check-out Dropdown */}
                <div>
                    <label className="block mb-1 text-sm">Check-in/Check-out Policy</label>
                    <Listbox value={selectedCheckInOut} onChange={setSelectedCheckInOut}>
                        <div className="relative">
                            <Listbox.Button className="w-full border px-4 py-3 rounded-md border-gray-300 outline-none focus:border-gray-400 transition-colors duration-300 text-left">
                                {selectedCheckInOut || 'Select Time'}
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto ">
                                    {checkInOutOptions.map((option, index) => (
                                        <Listbox.Option
                                            key={index}
                                            value={`Check-in: ${option.checkIn}, Check-out: ${option.checkOut}`}
                                            className={({ active }) => `cursor-pointer p-3 ${active ? 'bg-blue-50' : ''}`}
                                        >
                                            {`Check-in: ${option.checkIn}, Check-out: ${option.checkOut}`}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>

                {/* Price Input */}
                <div>
                    <label className="block mb-1 text-sm">Price per Night</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={price}
                            onChange={handlePriceChange}
                            placeholder="$ 0"
                            className="w-full border px-4 py-3 rounded-md placeholder:font-extralight border-gray-300 outline-none focus:border-gray-400 transition-colors duration-300"
                            onKeyDown={(e) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
                        />

                    </div>
                </div>
            </div>

            <div>
                <h5 className="text-lg mb-2">Upload Rooms Images</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                    {images[categoryKey].map((imgSrc, idx) => (
                        <div key={`${categoryKey}-${idx}`} className="relative group">
                            <label className="block border-2 border-dashed border-gray-300 rounded-md text-center p-4 cursor-pointer hover:border-blue-400 overflow-hidden h-full">
                                {imgSrc ? (
                                    <>
                                        <img
                                            src={imgSrc}
                                            alt="preview"
                                            className="w-full h-full object-cover absolute inset-0 z-0"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleRemoveImage(categoryKey, idx);
                                            }}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600 transition-colors"
                                        >
                                            <RxCross2 className="w-3 h-3" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-24 text-gray-500 relative z-10">
                                        <span className="text-2xl font-semibold">+</span>
                                        <span className="text-sm">Upload</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, categoryKey, idx)}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    // State management
    const [currentStep, setCurrentStep] = useState(0);
    const [images, setImages] = useState({
        standard: Array(7).fill(null),
        deluxe: Array(7).fill(null),
        suite: Array(7).fill(null),
        family: Array(7).fill(null),
    });

    const [formData, setFormData] = useState({
        hotelName: '',
        hotelType: '',
        location: '',
        phone: '',
        email: '',
        website: ''
    });

    const [pricing, setPricing] = useState({
        basePrice: '',
        seasonalRule: '',
        commission: ''
    });

    // Handlers
    const handleImageChange = (event, category, index) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setImages(prev => {
            const prevImg = prev[category][index];
            if (prevImg) URL.revokeObjectURL(prevImg); // Önce eski URL'i temizle
            return {
                ...prev,
                [category]: prev[category].map((img, i) => i === index ? imageUrl : img)
            }
        });
    };
    const handleRemoveImage = (category, index) => {
        setImages(prev => {
            const imgToRemove = prev[category][index];
            if (imgToRemove) URL.revokeObjectURL(imgToRemove);
            return {
                ...prev,
                [category]: prev[category].map((img, i) => i === index ? null : img)
            }
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePricingChange = (name, value) => {
        const numericValue = value.replace(/[^0-9.]/g, '');
        setPricing(prev => ({ ...prev, [name]: numericValue }));
    };

    // Step navigation
    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    return (
        <div className="px-4 md:px-4 lg:px-6 py-4 md:py-8">
            {currentStep === 0 && (
                <div className="space-y-8">
                    {/* Hotel Details Form */}
                    <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h4 className="font-semibold text-2xl mb-6 text-gray-800">Hotel Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {[
                                { label: 'Hotel Name', name: 'hotelName', type: 'text' },
                                { label: 'Location', name: 'location', type: 'text', placeholder: 'Enter address' },
                                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '123-456-7890' },
                                { label: 'Email', name: 'email', type: 'email', placeholder: 'hotel@example.com' },
                                { label: 'Website', name: 'website', type: 'url', placeholder: 'https://example.com' },
                            ].map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                                    <input
                                        {...field}
                                        value={formData[field.name]}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200 hover:border-gray-300 placeholder:text-gray-400"
                                        required={field.name !== 'website'}
                                    />
                                </div>
                            ))}

                            {/* Hotel Type Dropdown */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">Hotel Type</label>
                                <Listbox value={formData.hotelType} onChange={(value) => setFormData(prev => ({ ...prev, hotelType: value }))}>
                                    <div className="relative">
                                        <Listbox.Button className="w-full px-3 py-2.5 text-left border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-200 bg-white hover:border-gray-300 transition-all duration-200 cursor-pointer">
                                            <span className={`block truncate ${!formData.hotelType ? 'text-gray-400' : 'text-gray-700'}`}>
                                                {hotelTypes.find(type => type.value === formData.hotelType)?.name || 'Select Type'}
                                            </span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </Listbox.Button>

                                        <Transition
                                            enter="transition duration-100 ease-out"
                                            enterFrom="transform scale-95 opacity-0"
                                            enterTo="transform scale-100 opacity-100"
                                            leave="transition duration-75 ease-out"
                                            leaveFrom="transform scale-100 opacity-100"
                                            leaveTo="transform scale-95 opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-white py-1 shadow-lg border border-gray-200 focus:outline-none">
                                                {hotelTypes.map((type) => (
                                                    <Listbox.Option
                                                        key={type.value}
                                                        value={type.value}
                                                        disabled={type.disabled}
                                                        className={({ active }) =>
                                                            `cursor-default select-none relative py-2.5 pl-3 pr-4 ${active ? 'bg-gray-50' : 'text-gray-700'
                                                            } ${type.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`
                                                        }
                                                    >
                                                        <span className={`block truncate ${type.disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                                                            {type.name}
                                                        </span>
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>
                    </form>

                    {/* Amenities Checkboxes */}
                    <div>
                        <h4 className="font-semibold text-2xl mb-6 text-gray-800">Hotel Amenities</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {HotelDetailsCheckbox.map((item) => (
                                <label key={item.id} className="flex items-start p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id={item.id}
                                        className="mt-1 mr-2 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <span className="text-gray-600 text-xs">{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h4 className="font-semibold text-2xl mb-6 text-gray-800">Pricing Settings</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {[
                                {
                                    label: 'Base Price per Night',
                                    name: 'basePrice',
                                    value: pricing.basePrice,
                                    placeholder: '0.00 %'
                                },
                                {
                                    label: 'Commission Percentage',
                                    name: 'commission',
                                    value: pricing.commission,
                                    placeholder: '0.00 %'
                                }
                            ].map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                                    <input
                                        type="text"
                                        value={field.value ? `${field.value} %` : ''}
                                        onChange={(e) => handlePricingChange(field.name, e.target.value)}
                                        placeholder={field.placeholder}
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200 hover:border-gray-300"
                                    />
                                </div>
                            ))}

                            {/* Seasonal Pricing Dropdown */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">Seasonal Pricing Rules</label>
                                <Listbox value={pricing.seasonalRule} onChange={(value) => setPricing(prev => ({ ...prev, seasonalRule: value }))}>
                                    <div className="relative">
                                        <Listbox.Button className="w-full pl-3 pr-10 py-2.5 text-left border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-200 bg-white hover:border-gray-300 transition-all duration-200 cursor-pointer">
                                            <span className="block truncate">
                                                {seasonalOptions.find(opt => opt.value === pricing.seasonalRule)?.name || 'Select Season'}
                                            </span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </Listbox.Button>

                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-lg bg-white py-1 shadow-lg border border-gray-200 focus:outline-none">
                                                {seasonalOptions.map((option) => (
                                                    <Listbox.Option
                                                        key={option.id}
                                                        value={option.value}
                                                        disabled={option.id === 1}
                                                        className={({ active }) =>
                                                            `cursor-default select-none relative py-2.5 pl-3 pr-4 ${active ? 'bg-gray-50' : 'text-gray-700'
                                                            } ${option.id === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`
                                                        }
                                                    >
                                                        <span className="block truncate">{option.name}</span>
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>
                    </form>

                    {/* File Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FileUpload id="fileInput1" label="Drag & Drop or choose file to upload" />
                        <FileUpload id="fileInput2" label="Drag & Drop or choose file to upload" />
                    </div>

                    {/* Terms Agreement */}
                    <label className="flex items-start gap-3 mt-6">
                        <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                        />
                        <span className="text-gray-500 text-sm leading-5">
                            I confirm that I have read and agree to the Ocean Breeze Resort Onboarding Terms & Conditions. I acknowledge that by proceeding, I accept the platform's policies regarding property listing, pricing, commissions, cancellations, and compliance with local regulations.
                        </span>
                    </label>
                </div>
            )}

            {currentStep === 1 && (
                <div className="max-w-[2048px] mx-auto">
                    <h2 className="text-2xl font-semibold mb-8">Room Details</h2>
                    {roomCategories.map((category) => (
                        <RoomTypeSection
                            key={category.key}
                            title={category.title}
                            categoryKey={category.key}
                            images={images}
                            handleImageChange={handleImageChange}
                            handleRemoveImage={handleRemoveImage}
                        />
                    ))}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3 mt-8">
                <button
                    onClick={prevStep}
                    className={`text-center px-8 md:px-16 py-2.5 ml-4 rounded-lg border ${currentStep === 0 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700'
                        }`}
                >
                    {currentStep === 0 ? 'Cancel' : 'Previous'}
                </button>
                <button
                    onClick={nextStep}
                    className="text-center px-8 md:px-16 py-2.5 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                    {currentStep === 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Page;