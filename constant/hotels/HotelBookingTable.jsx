const tabs = [
    {
        label: 'Bookings',
        columns: ['Invoice ID', 'Date', 'Name', 'Email', 'Booking Type', 'Qty', 'Price', 'Status', 'Action'],
        data: [
            { id: 1, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Family', Qty: '2', Price: 250, Status: 'Completed', button: '.' },
            { id: 2, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Standard', Qty: '2', Price: 250, Status: 'Canceled', button: '.' },
            { id: 3, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Deluxe', Qty: '2', Price: 250, Status: 'Completed', button: '.' },
            { id: 4, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Suite', Qty: '2', Price: 250, Status: 'Canceled', button: '.' },
            { id: 5, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Family', Qty: '2', Price: 250, Status: 'Canceled', button: '.' },
            { id: 6, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Suite', Qty: '2', Price: 250, Status: 'Completed', button: '.' },
            { id: 7, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Family', Qty: '2', Price: 250, Status: 'Canceled', button: '.' },
            { id: 8, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Standard', Qty: '2', Price: 250, Status: 'Canceled', button: '.' },
            { id: 9, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Suite', Qty: '2', Price: 250, Status: 'Completed', button: '.' },
            { id: 10, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Suite', Qty: '2', Price: 250, Status: 'Canceled', button: '.' },
            { id: 11, InvoiceID: 'INV394fjx1', Date: '12/12/2025', Name: 'Johan Deo', Email: 'Johandoe@gmail.com', BookingType: 'Standard', Qty: '2', Price: 250, Status: 'Canceled', button: '.' }
        ],
    },
    {
        label: 'Rooms',
        columns: ['Room Type', 'Total Rooms', 'Booked', 'Available', 'Rating', 'Avg. Price/Night', 'Action'],
        data: [
            { id: 1, RoomType: 'Deluxe Suite', TotalRooms: 15, Booked: 12, Available: 3, Rating: 4.8, AvgPrice: 450, button: '.' },
            { id: 2, RoomType: 'Family Room', TotalRooms: 20, Booked: 18, Available: 2, Rating: 4.5, AvgPrice: 350, button: '.' },
            { id: 3, RoomType: 'Deluxe Suite', TotalRooms: 15, Booked: 12, Available: 3, Rating: 4.8, AvgPrice: 450, button: '.' },
            { id: 4, RoomType: 'Single Room', TotalRooms: 30, Booked: 25, Available: 5, Rating: 4.2, AvgPrice: 200, button: '.' },
            { id: 5, RoomType: 'Single Room', TotalRooms: 30, Booked: 25, Available: 5, Rating: 4.2, AvgPrice: 200, button: '.' },
            { id: 6, RoomType: 'Single Room', TotalRooms: 30, Booked: 25, Available: 5, Rating: 4.2, AvgPrice: 200, button: '.' },
            { id: 7, RoomType: 'Family Room', TotalRooms: 20, Booked: 18, Available: 2, Rating: 4.5, AvgPrice: 350, button: '.' },
            { id: 8, RoomType: 'Deluxe Suite', TotalRooms: 15, Booked: 12, Available: 3, Rating: 4.8, AvgPrice: 450, button: '.' },
            { id: 9, RoomType: 'Single Room', TotalRooms: 30, Booked: 25, Available: 5, Rating: 4.2, AvgPrice: 200, button: '.' },
            { id: 10, RoomType: 'Family Room', TotalRooms: 20, Booked: 18, Available: 2, Rating: 4.5, AvgPrice: 350, button: '.' },
            { id: 11, RoomType: 'Family Room', TotalRooms: 20, Booked: 18, Available: 2, Rating: 4.5, AvgPrice: 350, button: '.' },
        ],
    },
    {
        label: 'Reviews',
        columns: ['Name', 'Email', 'Rating', 'Profile Photo', 'Comment'],
        data: [
            {
                Name: 'Alice Smith',
                Email: 'alice@example.com',
                Rating: 5,
                ProfilePhoto: 'https://example.com/avatar1.jpg',
                Comment: 'Harika bir konaklama deneyimiydi! Personel çok ilgili.'
            },
            {
                Name: 'Bob Johnson',
                Email: 'bob@example.com',
                Rating: 4,
                ProfilePhoto: 'https://example.com/avatar2.jpg',
                Comment: 'Temiz ve konforlu odalar, ancak WiFi biraz yavaştı.'
            }
        ],
    },
    {
        label: 'Complaints',
        columns: ['Complaint ID', 'User Name', 'Email', 'Subject', 'Description', 'Status', 'Date'],
        data: [
            {
                ComplaintID: 'COMP1298',
                UserName: 'Carol Williams',
                Email: 'carol@example.com',
                Subject: 'Cleaning Problem',
                Description: 'My room was not clean enough.',
                Status: 'In Progress',
                Date: '15/05/2025',
            },
            {
                ComplaintID: 'COMP1299',
                UserName: 'David Brown',
                Email: 'david@example.com',
                Subject: 'Noise Complaint',
                Description: 'There was loud noise in the corridor throughout the night. There was loud noise in the corridor throughout the night. There was loud noise in the corridor throughout the night',
                Status: 'Resolved',
                Date: '18/05/2025',
            }
        ],
    },
];

export default tabs;