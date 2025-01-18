import { Line } from "react-chartjs-2";
import {useState, useEffect} from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";
import axios from "axios";

// Регистрация модулей Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export const SalaryYear = () => {
    const [data, setData] = useState([{}]);

    const fetchData = async (url, callback) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/general-statistics/yearly-salary/`);
            setData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const chartData = {
        labels: data.map((element) => element.year), // Годы
        datasets: [
            {
                label: "Уровень зарплат, ₽",
                data: data.map((element) => element.average_salary), // Количество вакансий
                borderColor: 'rgba(0, 255, 255, 0.9)',
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
        <div>
            <h2>Динамика уровня зарплат по годам, ₽</h2>
            <table border="1" style={{width: "100%", textAlign: "center", marginTop: "20px"}}>
                <thead>
                <tr>
                    <th>Годы</th>
                    {data.map((element) => (
                        <th key={element.year}>{element.year}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Уровень зарплат</td>
                    {data.map((element) => (
                        <td key={element.year}>{element.average_salary}</td>
                    ))}
                </tr>
                </tbody>
            </table>
            <div style={{width: "800px", height: '400px'}}>
                <Line data={chartData} options={chartOptions}/>
            </div>

        </div>
    );
};