"use client"

import { FaCheck, FaDiamond, FaStar } from "react-icons/fa6";
import dynamic from "next/dynamic";
const CustomCarousel = dynamic(() => import("@/components/hotels/CustomCarousel"), {
    ssr: false,
});
import popularAmenties from "@/constant/rooms/PopularAmenties";
import Image from "next/image";
import HospitalIcon from '@/public/icons/IconHospital.png'
import DoorIcon from '@/public/icons/IconDoor.png'
import ClockIcon from '@/public/icons/IconClock.png'
import BedIcon from '@/public/icons/IconBed.png'


export default function RoomsPage() {

    return (
        <div className="flex flex-col flex-nowrap items-start w-full min-h-screen px-3 ml-1 lg:p-6 md:p:6">

            {/* Rooms Info Section */}
            <div className="flex flex-col items-start gap-5 md:p-4 bg-[#F5F5F5] w-full rounded-xl">
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

            <div className="w-full md:px-10 mt-5">
                <CustomCarousel />
            </div>

            {/* Most popular amenities */}

            <div className="flex flex-col gap-3 items-start">
                <h5 className="font-semibold text-lg lg:text-2xl mt-10">Most popular amenities</h5>
                <div className="flex flex-row flex-wrap gap-2">
                    {
                        popularAmenties.map(item => (
                            <span className="flex flex-row flex-nowrap gap-2 items-center border-1 rounded-full text-nowrap p-1" key={item.id}>{item.icon}{item.text}</span>
                        ))
                    }
                </div>
            </div>

            <div className="flex flex-col items-start gap-3">
                <h5 className="font-semibold text-lg lg:text-2xl mt-10">Experience a Cozy & Well-Equipped Standard Room – Your Home Away from Home!</h5>
                <p className="font-normal text-xs lg:text-sm">Our Standard Room is the perfect retreat for solo travelers and couples, offering a harmonious blend of comfort, style, and convenience. Thoughtfully designed with modern interiors and essential amenities, this room ensures a relaxing and enjoyable stay, whether you’re visiting for business or leisure.</p>
            </div>

            <div className="flex flex-col items-start gap-4">
                <h5 className="flex flex-row flex-nowrap items-center gap-2 font-semibold text-lg lg:text-2xl mt-10"><Image src={HospitalIcon} width={20} height={20} alt="Hospital-Icon" /> Standard Room – Comfortable & Affordable Stay</h5>
                <ul className="font-normal text-xs lg:text-sm">
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />Room Size: Approx. 25m² – 30m² (depending on availability)</li>
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />High-Speed Wi-Fi: Stay connected with complimentary internet access throughout your stay.</li>
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />Work-Friendly Setup: A dedicated writing desk & ergonomic chair for business travelers or remote work.</li>
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />Climate Control: Adjustable air conditioning & heating to keep you comfortable in any season.</li>
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />Tea & Coffee Facilities: A stocked mini bar with complimentary coffee/tea-making facilities</li>
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />Secure Stay: Electronic safe & keycard access to ensure your security and privacy.</li>
                </ul>
            </div>

            <div className="flex flex-col items-start gap-4">
                <h5 className="flex flex-row flex-nowrap items-center gap-2 font-semibold text-lg lg:text-2xl mt-10"><Image src={BedIcon} width={20} height={20} alt="Bed-Icon" /> Room Features & Amenities:</h5>
                <ul className="font-normal text-xs lg:text-sm">
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} /> Spacious & Well-Designed: Thoughtfully furnished with modern décor and ample lighting for a refreshing atmosphere.</li>
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />Premium Sleep Experience: Enjoy a restful sleep on a queen-size bed or twin beds with plush bedding and soft linens.</li>
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />Scenic Views: Choose between city, garden, or courtyard views to suit your preference.</li>
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaCheck width={10} height={10} />Private Bathroom: Featuring a walk-in shower, fresh towels, complimentary toiletries, and a hairdryer for your convenience.</li>
                </ul>
            </div>

            <div className="flex flex-col items-start gap-4">
                <h5 className="flex flex-row flex-nowrap items-center gap-2 font-semibold text-lg lg:text-2xl mt-10"><Image src={DoorIcon} width={20} height={20} alt="Door-Icon" />Additional Services (On Request):</h5>
                <ul className="font-normal text-xs lg:text-sm">
                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaDiamond width={10} height={10} className="text-blue-600" />
                        Extra Bed: Available at an additional cost
                    </li>

                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaDiamond width={10} height={10} className="text-blue-600" />
                        Laundry Service: Same-day service available
                    </li>

                    <li className="flex flex-row flex-nowrap items-center gap-2"><FaDiamond width={10} height={10} className="text-blue-600" />
                        Room Service: 24/7 in-room dining
                    </li>

                </ul>
            </div>

            <div className="flex flex-col flex-nowrap items-start gap-4 text-nowrap">
                <h5 className="flex flex-row flex-nowrap items-center gap-2 font-semibold text-lg lg:text-2xl mt-10"><Image src={ClockIcon} width={20} height={20} alt="Door-Icon" />Check-in & Check-out Times:</h5>
                <div className="flex flex-row items-center text-sm flex-wrap max-w-screen gap-2">
                    <div className="flex flex-row items-center gap-1.5">
                        <h5 className="font-bold">Check-in:</h5><p>From 2:00 PM</p>
                    </div> <hr className="w-10 mx-5 hidden sm:flex" />
                    <div className="flex flex-row items-center gap-1.5">
                        <h5 className="font-bold">Check-out:</h5><p>By 12:00 PM</p>
                    </div>
                </div>
                <div>
                    <p>Early check-in or late check-out available upon request</p>
                </div>

            </div>
        </div>
    );
}
