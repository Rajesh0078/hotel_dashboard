import React from 'react'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const RevenueChart = (data) => {

    const chartData = {
        labels: Object.keys(data.data.revenueBreakdown),
        datasets: [
            {
                label: 'Revenue Breakdown ',
                backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,206,86,0.6)'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(data.data.revenueBreakdown),
            },
        ],
        width: 100
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    return (
        <div className='py-5 px-5 flex items-center h-full justify-center'>
            <Bar data={chartData} options={options} />
        </div>
    )
}

export default RevenueChart