"use client"

import Image from "next/image";
import RoomImage1 from '@/public/hotels/Booking/roomdetail1.jpg'
import RoomImage2 from '@/public/hotels/Booking/roomdetail2.jpg'
import RoomImage3 from '@/public/hotels/Booking/roomdetail3.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CustomCarousel = () => {
    return (
        <div className="relative">
            {/* Custom Navigation Buttons */}
            <button className="swiper-custom-prev absolute left-1/6 lg:left-1/4 -bottom-10 z-10 -translate-y-1/2 transform rounded-full bg-black p-1 text-white hover:bg-black/80">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
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
                pagination={{
                    clickable: true,

                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}

                className="px-4 pb-12"
            >

                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image
                            src={RoomImage1}
                            alt="Slide"
                            fill
                            className="object-cover"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide >
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image
                            src={RoomImage2}
                            alt="Slide"
                            fill
                            className="object-cover"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image
                            src={RoomImage3}
                            alt="Slide"
                            fill
                            className="object-cover"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image
                            src={RoomImage1}
                            alt="Slide"
                            fill
                            className="object-cover"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative h-64 overflow-hidden rounded-lg">
                        <Image
                            src={RoomImage2}
                            alt="Slide"
                            fill
                            className="object-cover"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>

            <button className="swiper-custom-next absolute right-1/6 lg:right-1/4 -bottom-10 z-10 -translate-y-1/2 transform rounded-full bg-black p-1 text-white hover:bg-black/80">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

        </div>
    );
};

export default CustomCarousel;