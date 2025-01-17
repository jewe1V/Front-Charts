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
                    borderColor: "rgba(75, 192, 192, 1)", // Цвет линии
                    backgroundColor: "rgba(75, 192, 192, 0.2)", // Цвет области под линией
                    tension: 0.4, // Интерполяция линий (сглаживание)
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
                    borderColor: "rgba(75, 192, 192, 1)", // Цвет линии
                    backgroundColor: "rgba(75, 192, 192, 0.2)", // Цвет области под линией
                    tension: 0.4, // Интерполяция линий (сглаживание)
                    fill: true,
                },
            ],
        };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Годы",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Количество вакансий",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{width: "800px"}}>
        <Line data={chartData} options={chartOptions}/>
    </div>)
}