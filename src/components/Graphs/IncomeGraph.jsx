import React from 'react'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale)

const IncomeGraph = ({ data }) => {

    const values = {
        labels: data[0].attributes.roomBookings.bookedRooms.map((i) => i.type),
        datasets: [{
            data: data[0].attributes.roomBookings.bookedRooms.map((i) => i.quantity),
            backgroundColor: [
                'rgb(28, 88, 2)',
                'purple',
                'red'
            ],
            borderWidth: 1,
            radius: '80%',
            hoverOffset: 5
        }]
    };
    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Doughnut Chart',
            fontSize: 30
        },
    };

    return (

        <Doughnut data={values} options={options} />

    )
}

export default IncomeGraph