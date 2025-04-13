// components/DonutChartCard.js
import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import chartData from "./restaurantChartData";

const DonutChartCard = () => {


    const series = chartData.map((item) => item.value);
    const colors = chartData.map((item) => item.color);
    const labels = chartData.map((item) => item.label);

    const chartRef = useRef(null);
    const chartContainerRef = useRef(null);

    const getChartOptions = () => {
        return {
            series,
            colors,
            chart: {
                height: 320,
                width: '100%',
                type: 'donut',
            },
            stroke: {
                colors: ['transparent'],
                lineCap: 'round',
            },
            plotOptions: {
                pie: {
                    donut: {

                        size: '83%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontFamily: 'Inter, sans-serif',
                                offsetY: 20,
                            },
                            total: {
                                showAlways: true,
                                show: true,
                                label: 'Bookings',
                                fontFamily: 'Inter, sans-serif',
                                formatter: function (w) {
                                    const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    return sum;
                                },
                            },
                            value: {
                                show: true,
                                fontFamily: 'Inter, sans-serif',
                                offsetY: -20,
                                formatter: (value) => value,
                            },
                        },
                    },
                },
            },
            grid: {
                padding: { top: -2 },
            },
            labels,
            dataLabels: { enabled: false },
            legend: {
                position: 'bottom',
                fontFamily: 'Inter, sans-serif',
            },
        };
    };

    useEffect(() => {
        if (chartContainerRef.current) {
            chartRef.current = new ApexCharts(chartContainerRef.current, getChartOptions());
            chartRef.current.render();
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [series]);

    return (
        <div>
            {/* Donut Chart Container */}
            <div className="py-6" id="donut-chart" ref={chartContainerRef}></div>
        </div>
    );
};

export default DonutChartCard;
