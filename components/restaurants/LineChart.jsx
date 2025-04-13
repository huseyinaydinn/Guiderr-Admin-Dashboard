import React, { useState } from 'react';

const dummyData = {
    weekly: [
        { label: 'Mon', value: 200 },
        { label: 'Tue', value: 300 },
        { label: 'Wed', value: 120 },
        { label: 'Thu', value: 400 },
        { label: 'Fri', value: 350 },
        { label: 'Sat', value: 500 },
        { label: 'Sun', value: 450 },
    ],
    monthly: Array.from({ length: 30 }, (_) => ({
        value: Math.floor(Math.random() * 300) + 200,
    })),
    yearly: [
        { label: 'Jan', value: 250 },
        { label: 'Feb', value: 300 },
        { label: 'Mar', value: 280 },
        { label: 'Apr', value: 350 },
        { label: 'May', value: 400 },
        { label: 'Jun', value: 380 },
        { label: 'Jul', value: 420 },
        { label: 'Aug', value: 390 },
        { label: 'Sep', value: 410 },
        { label: 'Oct', value: 360 },
        { label: 'Nov', value: 330 },
        { label: 'Dec', value: 300 },
    ],
};

const LineChart = ({ width = 800, height = 400 }) => {
    // Varsayılan veri aralığı olarak yıllık seçildi.
    const [selectedRange, setSelectedRange] = useState('yearly');
    // Zoom minimum 1 (orijinal genişlik) ve maksimum 3 olarak sınırlandırıldı.
    const [zoom, setZoom] = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    // Seçili veri kümesi
    const data = dummyData[selectedRange];
    const maxValue = Math.max(...data.map((d) => d.value));

    // Grafik için dış kenar boşlukları (sol: y-ekseni değerleri, alt: x-ekseni etiketleri)
    const marginLeft = 50;
    const marginBottom = 30;
    const chartWidth = width - marginLeft;
    const chartHeight = height - marginBottom;
    // Veri noktaları arası eşit boşluk (sadece grafik alanı için hesaplanır)
    const spacing = chartWidth / (data.length - 1);

    // Her veri noktasını, grafik alanı koordinatlarına dönüştürüyoruz
    const points = data.map((d, i) => {
        const x = i * spacing;
        const y = chartHeight - (d.value / maxValue) * chartHeight;
        return { x, y };
    });

    // Catmull-Rom -> Cubic Bezier dönüşümü ile yumuşak eğri oluşturma fonksiyonu
    const getSmoothPath = (pts) => {
        if (pts.length < 2) return '';
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = i === 0 ? pts[0] : pts[i - 1];
            const p1 = pts[i];
            const p2 = pts[i + 1];
            const p3 = i + 2 < pts.length ? pts[i + 2] : p2;
            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = p1.y + (p2.y - p0.y) / 6;
            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = p2.y - (p3.y - p1.y) / 6;
            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }
        return d;
    };

    const smoothPath = getSmoothPath(points);
    // Alan grafiği için, eğrinin altına grafik alanının alt kenarını ekleyip kapatıyoruz
    const areaPath = `${smoothPath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

    // Zoom uygulanmış toplam genişlik (grafik alanındaki veri noktalarının toplam uzunluğu)
    const effectiveWidth = (data.length - 1) * spacing * zoom;
    // Pan sırasında boşluk oluşmaması için offset sınırlandırılıyor
    const clampOffset = (off) => {
        const minOffset = chartWidth - effectiveWidth;
        return Math.min(0, Math.max(off, minOffset));
    };
    // Pan işlemleri (fare ile sürükleme)
    const handleMouseDown = (e) => {
        setDragging(true);
        setDragStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const deltaX = e.clientX - dragStartX;
        setDragStartX(e.clientX);
        setOffsetX((prev) => clampOffset(prev + deltaX));
    };

    const handleMouseUp = () => setDragging(false);
    const handleMouseLeave = () => setDragging(false);

    // Y-eksenindeki grid çizgileri ve etiketler (5 adet örnek çizgi: en üst= max, en alt = 0)
    const gridLines = 5;
    const grid = Array.from({ length: gridLines }, (_, i) => {
        const y = (chartHeight / (gridLines - 1)) * i;
        const value = Math.round(maxValue * (1 - i / (gridLines - 1)));
        return { y, value };
    });

    return (
        <div className="bg-white shadow rounded p-4">
            {/* Üst kontrol alanı: Dropdown ve Zoom Butonları */}
            <div className="mb-4 flex justify-between items-center">

                <div className="flex flex-row justify-between w-full space-x-2">
                    <div className="flex flex-row items-center justify-between gap-2">
                        <h5 className="font-semibold text-md">Bookings Overview</h5>
                    </div>

                    <select
                        className="text-gray-700 bg-white hover:bg-gray-50 focus:outline-none border-1 border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-start inline-flex items-center"
                        value={selectedRange}
                        onChange={(e) => {
                            setSelectedRange(e.target.value);
                            setZoom(1);
                            setOffsetX(0);
                        }}
                    >
                        <option value="weekly">This Week</option>
                        <option value="monthly">This Month</option>
                        <option value="yearly">This Year</option>
                    </select>
                </div>
            </div>
            <svg
                width={width}
                height={height}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: dragging ? 'grabbing' : 'default' }}
            >
                {/* Y-Eksen Etiketleri (sol marginden bağımsız, sabit konumda) */}
                <g>
                    {grid.map((tick, i) => (
                        <text
                            key={`y-label-${i}`}
                            x={marginLeft - 10}
                            y={tick.y + 5}
                            textAnchor="end"
                            className="text-xs fill-slate-500"
                        >
                            {tick.value}
                        </text>
                    ))}
                </g>
                {/* Grafik Alanı: Sol margin uygulandı */}
                <g transform={`translate(${marginLeft},0)`}>
                    {/* Sabit grid çizgileri (yatay) */}
                    {grid.map((tick, i) => (
                        <line
                            key={`grid-${i}`}
                            x1={0}
                            y1={tick.y}
                            x2={chartWidth}
                            y2={tick.y}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    ))}
                    {/* Veri ve X-Eksen Etiketlerinin bulunduğu grup (pan & zoom uygulanıyor) */}
                    <g transform={`translate(${offsetX},0) scale(${zoom})`}>
                        {/* Alan grafiği */}
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EE9D1A" stopOpacity="0.4" />
                                <stop offset="72%" stopColor="#FFC90A" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d={areaPath} fill="url(#areaGradient)" />
                        {/* Yumuşak eğri */}
                        <path d={smoothPath} fill="none" stroke="#EEBB31" strokeWidth="2" />
                        {/* X-Eksen Etiketleri: Verinin altına yerleştiriliyor */}
                        {data.map((d, i) => {
                            const x = i * spacing;
                            return (
                                <text
                                    key={`x-label-${i}`}
                                    x={x}
                                    y={chartHeight + 15}
                                    textAnchor="middle"
                                    className="text-xs fill-slate-500"
                                >
                                    {d.label}
                                </text>
                            );
                        })}
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default LineChart;