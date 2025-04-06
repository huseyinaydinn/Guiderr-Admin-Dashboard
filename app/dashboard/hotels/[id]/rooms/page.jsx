"use client"


import Slider from "react-slick";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import RoomImage1 from '@/public/hotels/Booking/roomdetail1.jpg'
import RoomImage2 from '@/public/hotels/Booking/roomdetail2.jpg'
import RoomImage3 from '@/public/hotels/Booking/roomdetail3.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function RoomsPage() {

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="flex flex-col flex-nowrap items-start w-full min-h-screen p-4 md:p:6">

            {/* Rooms Info Section */}
            <div className="flex flex-col items-start gap-5 p-2 md:p-4 bg-[#F5F5F5] w-full rounded-xl">
                <h5 className="font-bold text-base md:text-2xl">Rooms Info</h5>
                {/* Room Info Statics */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full justify-between">
                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Room Type</p>
                        <p className="font-semibold text-sm md:text-base text-black">Standard</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Total Rooms</p>
                        <p className="font-semibold text-sm md:text-base text-black">50</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Booked</p>
                        <p className="font-semibold text-sm md:text-base text-black">45</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Available</p>
                        <p className="font-semibold text-sm md:text-base text-black">05</p>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Rating</p>
                        <div className="flex flex-row flex-nowrap items-center gap-2">
                            <FaStar className="text-yellow-500" />
                            <p className="font-semibold text-sm md:text-base text-black">4.8/5 (125 Reviews)</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-0.5">
                        <p className="font-normal text-xs md:text-sm text-neutral-400">Avg. Price/Night</p>
                        <p className="font-semibold text-sm md:text-base text-black">$550</p>
                    </div>
                </div>


            </div>

            {/* Carrousel */}

            <div className="w-full px-6 md:px-10 mt-5">
                <Slider {...sliderSettings} className="w-full">
                    {[RoomImage1, RoomImage2, RoomImage3].map((img, index) => (
                        <div key={index} className="px-2 focus:outline-none">
                            <div className="relative h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden rounded-xl group">
                                <Image
                                    src={img}
                                    alt={`Room ${index + 1}`}
                                    fill
                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                                    quality={75}
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Most popular amenities */}


        </div>
    );
}
