// 1. Tüm değişkenleri tek tek export edin:
export const hotelTypes = [
    { value: '', name: 'Select Type', disabled: true },
    { value: 'Luxury', name: 'Luxury' },
    { value: 'Boutique', name: 'Boutique' },
    { value: 'Budget', name: 'Budget' },
    { value: 'Resort', name: 'Resort' },
];

export const seasonalOptions = [
    { id: 1, name: 'Select Season', value: '' },
    { id: 2, name: 'High Season', value: 'high' },
    { id: 3, name: 'Low Season', value: 'low' },
    { id: 4, name: 'Peak Season', value: 'peak' },
    { id: 5, name: 'Auto-calculated', value: 'auto' },
];

export const roomCategories = [
    { key: 'standard', title: 'Standard' },
    { key: 'deluxe', title: 'Deluxe' },
    { key: 'suite', title: 'Suite' },
    { key: 'family', title: 'Family' },
];

export const cancellationPolicies = [
    'Free cancellation up to 24 hours',
    'Non-refundable',
    'Partial refund (50%) up to 12 hours',
    'Free cancellation up to 48 hours'
];

export const checkInOutOptions = [
    { checkIn: '2:00 PM', checkOut: '12:00 PM' },
    { checkIn: '3:00 PM', checkOut: '11:00 AM' },
    { checkIn: '1:00 PM', checkOut: '10:00 AM' }
];