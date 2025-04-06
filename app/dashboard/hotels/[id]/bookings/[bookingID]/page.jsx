"use client"

import BookingTable from '@/components/hotels/HotelBookingPage/BookingTable';
import { useParams } from 'next/navigation';

// Örnek veri: Gerçek uygulamanızda API'den veya global state'den alınabilir.
const bookingsColumns = ['Invoice ID', 'Booking Type', 'Room Type', 'Total Rooms', 'Avg. Price/Night', 'Action'];
const bookingsData = [
    {
        InvoiceID: 'INV-001',
        BookingType: 'Family',
        RoomType: 'Deluxe',
        TotalRooms: 3,
        AvgPrice: '$200',
        // Diğer alanlar...
    },
    // Diğer veriler...
];

export default function BookingsPage() {
    const params = useParams();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Bookings for Hotel {params.id}</h2>
            <BookingTable
                columns={bookingsColumns}
                data={bookingsData}
                isReviews={false}
                currentTab="bookings"
            />
        </div>
    );
}