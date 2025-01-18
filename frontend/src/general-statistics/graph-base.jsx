import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";

// Регистрация модулей Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export const GraphBase = ({data}) => {

    const isValidArray = Array.isArray(data);

    const chartData = isValidArray
        ? {
            labels: data.map((element) => element.published_at__year), // Годы
            datasets: [
                {
                    label: "Количество вакансий",
                    data: data.map((element) => element.count), // Количество вакансий
                    borderColor: 'rgba(0, 255, 191, 0.9)',
                    borderWidth: 3,
                    backgroundColor: 'none',
                    tension: 0.4,
                    fill: true,
                },
            ],
        }
        : {
            labels: [], // Пустые метки
            datasets: [
                {
                    label: "Количество вакансий",
                    data: [], // Пустые данные
                    borderColor: 'rgba(0, 255, 191, 0.9)',
                    borderWidth: 3,
                    backgroundColor: 'none',
                    tension: 0.4,
                    fill: true,
                },
            ],
        };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                border:{
                    display:false
                },
                ticks: {
                    color: '#737373',
                    font: {
                        size: 14,
                        weight: 700,
                    },
                },
                grid: {
                    color: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    display: false,
                },
            },
            y: {
                display: false, // Убираем подписи оси Y
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{width: "800px"}}>
        <Line data={chartData} options={chartOptions}/>
    </div>)
}