const { FiHome, FiUsers, FiSettings } = require("react-icons/fi");
const { IoRocketOutline } = require("react-icons/io5");
const { RiRobot2Line } = require("react-icons/ri");


const menuLinks = [
    {
        id: 1,
        href: "/dashboard",
        text: "Dashboard",
        icon: <FiHome className="h-6 w-6" />
    },
    {
        id: 2,
        href: "/rolemanagment",
        text: "Role Management",
        icon: <FiUsers className="h-6 w-6" />
    },
    {
        id: 3,
        href: "/usersmanagment",
        text: "User's Managment",
        icon: <FiUsers className="h-6 w-6" />
    },
    {
        id: 4,
        href: "/payment",
        text: "Payment Managment",
        icon: <IoRocketOutline className="h-6 w-6" />
    },
    {
        id: 5,
        href: "/aitrips",
        text: "AI Trips",
        icon: <RiRobot2Line className="h-6 w-6" />
    },
    {
        id: 6,
        href: "/settings",
        text: "Settings",
        icon: <FiSettings className="h-6 w-6" />
    },
]

export default menuLinks