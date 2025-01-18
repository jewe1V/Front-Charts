import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";

// Регистрация модулей Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HalfTable = ({ data }) => {
    const midIndex = Math.ceil(data.length / 2); // Находим середину массива
    const firstHalf = data.slice(0, midIndex); // Первая половина данных
    const secondHalf = data.slice(midIndex); // Вторая половина данных

    const renderTable = (dataPart, key) => (
        <table
            key={key}
            border="1"
            className="data-table city-table"
        >
            <thead>
            <tr>
                <th>Навык</th>
                {dataPart.map((element) => (
                    <th
                        style={{ fontSize: "13px", fontWeight: "400" }}
                        key={element.skill}
                    >
                        {element.skill}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ fontSize: "14px", fontWeight: "400" }}>
                    Кол-во вакансий
                </td>
                {dataPart.map((element) => (
                    <td
                        style={{ fontSize: "14px", fontWeight: "400" }}
                        key={element.skill}
                    >
                        {element.count ? element.count : ""}
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    );

    return (
        <div className="table-container">
            {renderTable(firstHalf, "firstHalf")}
            {renderTable(secondHalf, "secondHalf")}
        </div>
    );
};

export const TopSkills = () => {
    const [data, setData] = useState([{}]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/general-statistics/top-skills/`
            );
            setData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const chartData = {
        labels: data.map((element) => element.skill), // Названия городов
        datasets: [
            {
                label: "Количество вакансий",
                data: data.map((element) => element.count), // Уровень зарплат
                backgroundColor: "rgba(168, 118, 248, 0.9)", // Цвет столбцов
                borderRadius: 5, // Скругление углов столбцов
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false, // Скрываем легенду
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#737373",
                    font: {
                        size: 14,
                        weight: 700,
                    },
                },
                grid: {
                    display: false, // Отключаем сетку
                },
            },
            y: {
                ticks: {
                    display: false, // Скрываем подписи оси Y
                },
                grid: {
                    display: false, // Отключаем сетку
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <h2>ТОП-20 навыков по годам</h2>
            <HalfTable data={data} />
            <div className="graph-container" style={{marginTop:'20px'}}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};