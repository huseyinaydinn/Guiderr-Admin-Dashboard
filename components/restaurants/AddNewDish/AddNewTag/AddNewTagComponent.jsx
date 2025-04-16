"use client";

import React, { useState, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";

const TagsInput = () => {
    const [tags, setTags] = useState([
        "Extra Cheez",
        "Extra Bred",
        "Extra Sauce",
        "Extra Veggies",
        "Extra Protein"
    ]);
    const maxTags = 15;
    const inputRef = useRef(null);

    // Ortak tag ekleme fonksiyonu
    const addTags = (inputValue) => {
        let trimmedValue = inputValue.trim().replace(/\s+/g, " ");
        if (trimmedValue.length > 1 && !tags.includes(trimmedValue)) {
            // Virgülle ayrılmış tagları al
            const newTags = trimmedValue
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);
            // Mevcut tag sayısı + eklenecek tag'lar maxTags sınırını aşmıyorsa ekle, aşacaksa eklenebilecekleri ekle
            const available = maxTags - tags.length;
            const tagsToAdd = newTags.slice(0, available);
            setTags((prevTags) => [...prevTags, ...tagsToAdd]);
        }
    };

    // Enter tuşuna basıldığında tag ekle
    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            addTags(e.target.value);
            e.target.value = "";
        }
    };

    // +New butonuna tıklandığında tag ekle
    const handleAddTag = () => {
        if (inputRef.current) {
            addTags(inputRef.current.value);
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    };

    // Tek bir tag'ı kaldırma
    const removeTag = (tagToRemove) => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="w-full rounded-lg p-2">
            <div className="flex flex-row items-start gap-2">
                <div className="mt-3 p-2 border border-gray-200 rounded-md flex flex-wrap">
                    <ul className="flex flex-wrap gap-1">
                        {tags.map((tag, index) => (
                            <li
                                key={index}
                                className="flex items-center bg-gray-100 border border-gray-200 text-gray-800 rounded-md px-2 py-1"
                            >
                                {tag}
                                <MdOutlineClose
                                    onClick={() => removeTag(tag)}
                                    className="ml-2 cursor-pointer bg-red-500 rounded-full text-white"
                                />
                            </li>
                        ))}
                    </ul>
                    <input
                        ref={inputRef}
                        type="text"
                        onKeyUp={handleKeyUp}
                        placeholder="Enter tag..."
                        className="flex-1 p-1 outline-none text-base"
                    />
                </div>
                <button
                    onClick={handleAddTag}
                    className="px-2 py-2 bg-blue-400 text-white rounded-lg mt-2 cursor-pointer text-xl"
                >
                    +New
                </button>
            </div>
        </div>
    );
};

export default TagsInput;
