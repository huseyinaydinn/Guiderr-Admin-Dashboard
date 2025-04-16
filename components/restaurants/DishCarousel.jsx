"use client"

import React from "react";
import Image from "next/image";
import DishImage1 from "@/public/restaurant/dishdetails/dish1.jpg";
import DishImage2 from "@/public/restaurant/dishdetails/dish2.jpg";
import DishImage3 from "@/public/restaurant/dishdetails/dish3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DishCarousel = () => {
    return (
        <div className="relative">
            {/* Özel sol navigasyon butonu */}
            <button className="swiper-custom-prev absolute left-1/6 lg:left-1/4 -bottom-10 z-10 -translate-y-1/2 transform rounded-full bg-black p-1 text-white hover:bg-black/80">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                    prevEl: ".swiper-custom-prev",
                    nextEl: ".swiper-custom-next",
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="px-4 pb-12"
            >
                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image src={DishImage1} alt="Slide 1" fill className="object-fill" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image src={DishImage2} alt="Slide 2" fill className="object-fill" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image src={DishImage3} alt="Slide 3" fill className="object-fill" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image src={DishImage3} alt="Slide 4" fill className="object-fill" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image src={DishImage2} alt="Slide 5" fill className="object-fill" />
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* Özel sağ navigasyon butonu */}
            <button className="swiper-custom-next absolute right-1/6 lg:right-1/4 -bottom-10 z-10 -translate-y-1/2 transform rounded-full bg-black p-1 text-white hover:bg-black/80">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default DishCarousel;