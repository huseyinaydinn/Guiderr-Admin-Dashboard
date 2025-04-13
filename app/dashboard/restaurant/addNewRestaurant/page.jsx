"use client"

import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { seasonalOptions } from '@/constant/restaurant/AddNewRestaurant';
import RestaurantDetailsCheckbox from "@/constant/restaurant/RestaurantDetailsCheckbox";

const Page = () => {
    // State management
    const [currentStep, setCurrentStep] = useState(0);

    const [pricing, setPricing] = useState({
        averagePrice: '',
        seasonalRule: '',
        commission: ''
    });

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
                    {/* Restaurant Details Form */}
                    <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h4 className="font-semibold text-2xl mb-6 text-gray-800">Restaurant Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {[
                                { label: 'Restaurant Name', name: 'restaurantName', type: 'text' },
                                { label: 'Location', name: 'location', type: 'text', placeholder: 'Enter address' },
                                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '123-456-7890' },
                                { label: 'Email', name: 'email', type: 'email', placeholder: 'restaurant@example.com' },
                                { label: 'Website', name: 'website', type: 'url', placeholder: 'https://example.com' },
                            ].map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                                    <input
                                        {...field}
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all duration-200 hover:border-gray-300 placeholder:text-gray-400"
                                        required={field.name !== 'website'}
                                    />
                                </div>
                            ))}
                        </div>
                    </form>

                    {/* Amenities Checkboxes */}
                    <div>
                        <h4 className="font-semibold text-2xl mb-6 text-gray-800">Restaurant Amenities</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {RestaurantDetailsCheckbox.map((item) => (
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
                                    label: 'Average Price per Person',
                                    name: 'averagePrice',
                                    value: pricing.averagePrice,
                                    placeholder: '0.00'
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
                                        value={field.value || ''}
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
                                                        className={({ active }) =>
                                                            `cursor-default select-none relative py-2.5 pl-3 pr-4 ${active ? 'bg-gray-50' : 'text-gray-700'}`
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

                    {/* Terms Agreement */}
                    <label className="flex items-start gap-3 mt-6">
                        <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                        />
                        <span className="text-gray-500 text-sm leading-5">
                            I confirm that I have read and agree to the Restaurant Onboarding Terms & Conditions. I acknowledge that by proceeding, I accept the platform's policies regarding restaurant listing, pricing, commissions, cancellations, and compliance with local regulations.
                        </span>
                    </label>
                </div>
            )}

            {currentStep === 1 && (
                <div className="space-y-8">
                    {/* 2. Form Sayfası: Şimdilik boş bir div */}
                    <div>
                        Second Page of Form

                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3 mt-8">
                <button
                    onClick={currentStep === 0 ? () => console.log('Canceled') : prevStep}
                    className="text-center px-8 md:px-16 py-2.5 ml-4 rounded-lg border border-gray-300 text-gray-700"
                >
                    {currentStep === 0 ? 'Cancel' : 'Previous'}
                </button>
                <button
                    onClick={currentStep === 1 ? () => console.log('Finish pressed') : nextStep}
                    className="text-center px-8 md:px-16 py-2.5 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                    {currentStep === 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Page;
