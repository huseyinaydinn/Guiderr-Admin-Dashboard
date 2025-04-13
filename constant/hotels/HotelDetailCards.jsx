import { BsFillClipboard2CheckFill, BsFillClipboard2XFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa6"

const HotelDetailCards = [
    {
        id: 1,
        title: "Bookings",
        amount: 784,
        percent: -3,
        date: "+25 Last Week",
        icon: <FaClipboardList />
    },
    {
        id: 2,
        title: "Canceled",
        amount: 150,
        percent: -15,
        date: "+25 Last Week",
        icon: <BsFillClipboard2XFill />
    },
    {
        id: 3,
        title: "Completed",
        amount: 234,
        percent: 10,
        date: "+25 Last Week",
        icon: <BsFillClipboard2CheckFill />
    }
]

export default HotelDetailCards;