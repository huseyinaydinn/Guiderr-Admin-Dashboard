import React, { useRef } from 'react'
import { IoImageOutline } from "react-icons/io5";
import { PiUploadSimple } from "react-icons/pi";

const ImageUploadContainer = () => {


    const fileInputRef = useRef(null);

    const handleContainerClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <div
            className="w-[128px] h-[128px] border border-gray-200 bg-gray-100
                    flex items-center justify-center cursor-pointer 
                    hover:bg-gray-50 active:bg-gray-100 transition-colors
                    relative rounded-lg"
            onClick={handleContainerClick}
        >
            <input
                type="file"
                accept="image/*"
                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                ref={fileInputRef}
                id="fileInput"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        console.log("Selected file:", file);
                    }
                }}
            />
            <div className="text-center flex flex-col items-center justify-between font-light h-full py-2">

                <IoImageOutline className="h-20 w-20 text-gray-400" />

                <span className="flex flex-row flex-nowrap items-center text-gray-500 hover:text-gray-600 text-sm font-medium">
                    <PiUploadSimple className="h-4 w-4" />
                    Upload Image
                </span>
            </div>
        </div>
    )
}

export default ImageUploadContainer