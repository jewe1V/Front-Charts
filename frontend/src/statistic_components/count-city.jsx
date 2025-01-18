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
            className="data-table"
        >
            <thead>
            <tr>
                <th>Регион</th>
                {dataPart.map((element) => (
                    <th
                        style={{ fontSize: "12px", fontWeight: "400" }}
                        key={element.area_name}
                    >
                        {element.area_name}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ fontSize: "14px", fontWeight: "400" }}>
                    Доля вакансий
                </td>
                {dataPart.map((element) => (
                    <td
                        style={{ fontSize: "14px", fontWeight: "400" }}
                        key={element.area_name}
                    >
                        {element.percentage ? element.percentage : ""}%
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

export const CountCity = () => {
    const [data, setData] = useState([{}]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/general-statistics/city-vacancy-share/`
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
        labels: data.map((element) => element.area_name), // Названия городов
        datasets: [
            {
                label: "Количество вакансий",
                data: data.map((element) => element.vacancy_count), // Уровень зарплат
                backgroundColor: "rgba(215,132,237,0.9)", // Цвет столбцов
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
            <h2>Доля вакансий по городам</h2>
            <HalfTable data={data} />
            <div className="graph-container" style={{marginTop:'20px'}}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};