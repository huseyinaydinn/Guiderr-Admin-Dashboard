"use client"

import BookingTable from '@/components/hotels/HotelBookingPage/BookingTable';
import { useParams } from 'next/navigation';

// Örnek veri: Gerçek verinizi ekleyin.
const complaintsColumns = ['Complaint ID', 'User Name', 'Complaints', 'Status', 'Action'];
const complaintsData = [
    {
        ComplaintID: 'CPL-001',
        UserName: 'John Doe',
        Complaints: 'Room was not cleaned',
        Status: 'canceled', // Örneğin stil için 'canceled' veya 'completed'
        // Diğer alanlar...
    },
    // Diğer veriler...
];

export default function ComplaintsPage() {
    const params = useParams();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Complaints for Hotel {params.id}</h2>
            <BookingTable
                columns={complaintsColumns}
                data={complaintsData}
                isReviews={false}
                currentTab="complaints"
            />
        </div>
    );
}
