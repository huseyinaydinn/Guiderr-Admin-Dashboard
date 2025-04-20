"use client"

import Image from "next/image"
import React, { useState } from 'react'
import AvatarPhoto from '@/public/AvatarPhoto.jpeg'
import { BsPencil } from "react-icons/bs"

const Settings = () => {
    const [emailList, setEmailList] = useState(false);
    const [importantNotices, setImportantNotices] = useState(false)

    return (
        <div className="flex flex-col gap-10 items-start pb-4">
            <div className="w-full bg-linear-to-r from-blue-400 to-blue-500 h-[125px] relative">
                {/* Settings Profile Photo */}
                <div className="absolute -bottom-[40px] md:-bottom-[75px] left-20 md:left-28 -translate-x-1/2">
                    <Image
                        src={AvatarPhoto}
                        className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full border-4 border-white shadow-lg"
                        alt="profile-photo"
                        width={150}
                        height={150}
                    />
                    <div className="absolute left-[75px] md:left-28 top-[70px] md:top-28 bg-black p-1 md:p-2 rounded-full cursor-pointer">
                        <BsPencil className=" text-white" />
                    </div>
                </div>
            </div>

            <div className="mt-16 px-4">
                <h2 className="text-3xl font-bold">John Doe</h2>
                <p className="underline text-gray-400 text-base">johndow@gmail.com</p>
            </div>

            {/* Personal Info */}
            <div className="px-4 flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
                <div className="flex flex-col items-center lg:items-start gap-2 w-[400px]">
                    <h5 className="font-bold text-base">Personal Info</h5>
                    <p className="text-sm text-gray-400">
                        You can change your personal information settings here.
                    </p>
                </div>
                {/* Buraya flex-1 ve min-w-0 ekledik */}
                <div className="flex-1 min-w-0 w-full grid grid-cols-1 place-items-center md:grid-cols-2 gap-4 p-6 border border-gray-300 rounded-lg">
                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none placeholder:text-black"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="emailAddress"
                            className="mt-1 block w-full border bg-gray-200 border-gray-300 rounded-md py-2 px-3 focus:outline-none placeholder:text-gray-400 cursor-not-allowed"
                            placeholder="johndoe@gmail.com"
                            readOnly
                        />
                    </div>

                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            Region
                        </label>
                        <select
                            id="region"
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none placeholder:text-black"
                        >
                            <option value="" disabled className="text-gray-400">
                                Select
                            </option>
                            <option value="Italy" className="text-black">
                                Italy
                            </option>
                            <option value="England" className="text-black">
                                England
                            </option>
                            <option value="Germany" className="text-black">
                                Germany
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                            Language
                        </label>
                        <select
                            id="language"
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none placeholder:text-black"
                        >
                            <option value="" disabled className="text-gray-400">
                                Select
                            </option>
                            <option value="Italian" className="text-black">
                                Italian
                            </option>
                            <option value="English" className="text-black">
                                English
                            </option>
                            <option value="German" className="text-black">
                                German
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Email Preferences */}
            <div className="px-4 flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
                <div className="flex flex-col items-center lg:items-start gap-2 w-[400px]">
                    <h5 className="font-bold text-base">Email Preferences</h5>
                    <p className="text-sm text-gray-400">
                        Choose what kind of mails you want to receive
                    </p>
                </div>

                <div className="flex-1 min-w-0 w-full flex flex-col items-start gap-4 p-6 border border-gray-300 rounded-lg">
                    <div className="flex flex-row flex-nowrap items-center justify-start w-full gap-4">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={emailList}
                                onChange={() => setEmailList(!emailList)}
                                className="sr-only peer"
                            />
                            <div
                                className="w-14 h-8 bg-gray-300 rounded-full relative
                   transition-colors peer-checked:bg-blue-600"
                            >
                                <span
                                    className={`block absolute top-1 left-1 w-6 h-6 rounded-full
                      transition-all
                      ${emailList ? "left-7 bg-white" : "bg-white"}`}
                                ></span>
                            </div>
                        </label>
                        <div className="flex flex-col items-start gap-1">
                            <h5 className="font-bold text-sm">Email List</h5>
                            <p className="font-light text-sm text-gray-500">Receive promotional updates and newsletters.</p>
                        </div>
                    </div>


                    <div className="flex flex-row flex-nowrap items-center justify-start w-full gap-4">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={importantNotices}
                                onChange={() => setImportantNotices(!importantNotices)}
                                className="sr-only peer"
                            />
                            <div
                                className="w-14 h-8 bg-gray-300 rounded-full relative
                   transition-colors peer-checked:bg-blue-600"
                            >
                                <span
                                    className={`block absolute top-1 left-1 w-6 h-6 rounded-full
                      transition-all
                      ${importantNotices ? "left-7 bg-white" : "bg-white"}`}
                                ></span>
                            </div>
                        </label>
                        <div className="flex flex-col items-start gap-1">
                            <h5 className="font-bold text-sm">Important Notices </h5>
                            <p className="font-light text-sm text-gray-500">Choose whether to receive essential notifications and alerts.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings