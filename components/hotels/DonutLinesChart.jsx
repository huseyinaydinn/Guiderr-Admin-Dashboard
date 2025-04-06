import React from 'react'
import chartData from "./chartData"

const DonutLinesChart = () => {
    // Toplam değeri hesaplayalım
    const total = chartData.reduce((acc, item) => acc + item.value, 0);

    // Her bir öğeye yüzde değerini ekleyelim
    const chartDataWithPercent = chartData.map((item) => ({
        ...item,
        percent: ((item.value / total) * 100).toFixed(2), // yüzde değeri (örn. 45.67)
    }));

    return (
        <div className="flex flex-col items-start gap-4">
            {
                chartDataWithPercent.map((item, index) => (
                    <div key={index} className="flex flex-col flex-nowrap items-start text-start">
                        <div className="flex flex-row flex-nowrap text-gray-500 font-normal"><h5>{item.label}</h5><span className="ml-2">{`(${item.percent}%)`}</span></div>
                        <div className="w-[250px] bg-gray-300 h-4 rounded-2xl">
                            <div className="h-full rounded-2xl"
                                style={{ width: `${item.percent}%`, backgroundColor: item.color }}></div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DonutLinesChart