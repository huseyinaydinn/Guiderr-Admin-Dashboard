import { MdOutlineApartment } from "react-icons/md";

const { FiHome, FiUsers, FiSettings } = require("react-icons/fi");
const { IoRocketOutline, IoRestaurant } = require("react-icons/io5");
const { RiRobot2Line } = require("react-icons/ri");
const { LiaHotelSolid } = require("react-icons/lia");



const menuLinks = [
    {
        id: 1,
        href: "/dashboard",
        text: "Dashboard",
        icon: <FiHome className="h-6 w-6" />
    },
    {
        id: 2,
        href: "/dashboard/rolemanagment",
        text: "Role Management",
        icon: <FiUsers className="h-6 w-6" />
    },
    {
        id: 3,
        href: "/dashboard/users",
        text: "Users Managment",
        icon: <FiUsers className="h-6 w-6" />
    },
    {
        id: 4,
        href: "/dashboard/hotels",
        text: "Hotels Management",
        icon: <LiaHotelSolid className="h-6 w-6" />
    },

    {
        id: 5,
        href: "/dashboard/resturents",
        text: "Resturents Management",
        icon: <IoRestaurant className="h-6 w-6" />
    },

    {
        id: 6,
        href: "/dashboard/apartments",
        text: "Apartments Management",
        icon: <MdOutlineApartment className="h-6 w-6" />
    },


    {
        id: 7,
        href: "/dashboard/aitrips",
        text: "AI Trips",
        icon: <RiRobot2Line className="h-6 w-6" />
    },
    {
        id: 8,
        href: "/dashboard/settings",
        text: "Settings",
        icon: <FiSettings className="h-6 w-6" />
    },

]



export default menuLinks