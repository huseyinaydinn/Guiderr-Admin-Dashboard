const { CiParking1, CiAirportSign1 } = require("react-icons/ci");
const { FaSmokingBan } = require("react-icons/fa");
const { FaWifi } = require("react-icons/fa6");
const { MdRoomService, MdFamilyRestroom, MdFreeBreakfast } = require("react-icons/md");
const { IoMdFitness, IoMdRestaurant } = require("react-icons/io")
const { TbDisabled } = require("react-icons/tb")

const popularAmenties = [
    {
        id: 1,
        icon: <CiParking1 />,
        text: "Free parking"
    },
    {
        id: 2,
        icon: <CiAirportSign1 />,
        text: "Airport shuttle"
    },

    {
        id: 3,
        icon: <FaSmokingBan />,
        text: "Non-smoking rooms"
    },

    {
        id: 4,
        icon: <MdRoomService />,
        text: "Room service"
    },

    {
        id: 5,
        icon: <IoMdFitness />,
        text: "Fitness center"
    },

    {
        id: 6,
        icon: <MdFamilyRestroom />,
        text: "Family rooms"
    },

    {
        id: 7,
        icon: <MdFreeBreakfast />,
        text: "Breakfast"
    },
    {
        id: 8,
        icon: <FaWifi />,
        text: "Free Wifi"
    },
    {
        id: 9,
        icon: <IoMdRestaurant />,
        text: "Restaurant"
    },

    {
        id: 10,
        icon: <TbDisabled />,
        text: "Facilities for disabled guests"
    },
]

export default popularAmenties;