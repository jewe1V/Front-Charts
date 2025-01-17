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

export const CountYear = ({data}) => {

    const chartData = {
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
        <div>
            <h2>Динамика количества вакансий по годам</h2>
            <table border="1" style={{width: "100%", textAlign: "center", marginTop: "20px"}}>
                <thead>
                <tr>
                    <th>Годы</th>
                    {data.map((element) => (
                        <th key={element.published_at__year}>{element.published_at__year}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Количество вакансий</td>
                    {data.map((element) => (
                        <td key={element.published_at__year}>{element.count}</td>
                    ))}
                </tr>
                </tbody>
            </table>
            <div style={{width: "800px"}}>
                <Line data={chartData} options={chartOptions}/>
            </div>

        </div>
    );
};