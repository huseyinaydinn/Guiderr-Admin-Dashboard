// constants/restaurants/AddNewRestaurant.jsx

// 1. Restaurant Tip Seçenekleri
export const restaurantTypes = [
    { value: '', name: 'Restaurant Türü Seçin', disabled: true },
    { value: 'FineDining', name: 'Fine Dining' },
    { value: 'Casual', name: 'Casual Dining' },
    { value: 'Cafe', name: 'Cafe' },
    { value: 'FastFood', name: 'Fast Food' },
    { value: 'Bar', name: 'Bar' },
    { value: 'Bistro', name: 'Bistro' },
];

// 2. Sezonluk Fiyatlandırma Kuralları
export const seasonalOptions = [
    { id: 1, name: 'Sezon Seçin', value: '' },
    { id: 2, name: 'Tatil Sezonu', value: 'holiday' },
    { id: 3, name: 'Normal Sezon', value: 'regular' },
    { id: 4, name: 'Özel Etkinlik', value: 'event' },
    { id: 5, name: 'Dinamik Fiyatlandırma', value: 'dynamic' },
];

// 3. Restoran Bölüm Kategorileri
export const diningCategories = [
    { key: 'indoor', title: 'Kapalı Alan' },
    { key: 'outdoor', title: 'Açık Alan' },
    { key: 'private', title: 'Özel Oda' },
    { key: 'vip', title: 'VIP Salon' },
];

// 4. İptal Politikaları (Restoran Rezervasyon)
export const cancellationPolicies = [
    'Rezervasyondan 2 saat öncesine kadar ücretsiz iptal',
    'İade edilmez',
    'Kısmi iade (%50) - 1 saat öncesine kadar',
    'Ücretli iptal (20% kesinti)'
];

// 5. Çalışma Saatleri Seçenekleri
export const operatingHours = [
    { open: '11:00 AM', close: '10:00 PM' },
    { open: '12:00 PM', close: '11:00 PM' },
    { open: '09:00 AM', close: '09:00 PM' },
    { open: '08:00 AM', close: '12:00 AM' }
];

// 6. Ekstra Özellikler (Opsiyonel)
export const restaurantFeatures = [
    'Open Kitchen',
    'Live Music',
    'Park Alanı',
    'Deniz Manzarası',
    'Teras'
];