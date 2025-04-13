import { BsFillClipboard2CheckFill, BsFillClipboard2XFill } from "react-icons/bs";
import { FaClipboardList, FaUtensils } from "react-icons/fa6";

const RestaurantDetailCards = [
    {
        id: 1,
        title: "Total Dishes",
        amount: 143,
        percent: 7,
        date: "+25 Last Week",
        icon: <FaClipboardList />
    },
    {
        id: 2,
        title: "Total Deals",
        amount: 45,
        percent: -15,
        date: "+25 Last Week",
        icon: <BsFillClipboard2XFill />
    },
    {
        id: 3,
        title: "Total Orders",
        amount: 1445,
        percent: -15,
        date: "+25 Last Week",
        icon: <BsFillClipboard2CheckFill />
    }
];

export default RestaurantDetailCards;