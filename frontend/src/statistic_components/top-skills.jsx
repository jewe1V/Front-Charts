import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Регистрация модулей Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HalfTable = ({ data }) => {
    const midIndex = Math.ceil(data.length / 2); // Находим середину массива
    const firstHalf = data.slice(0, midIndex); // Первая половина данных
    const secondHalf = data.slice(midIndex); // Вторая половина данных

    const renderTable = (dataPart, key) => (
        <table key={key} border="1" className="data-table city-table">
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

export const TopSkills = ({url}) => {
    const [data, setData] = useState([]); // Храним данные навыков
    const [year, setYear] = useState(2024); // Храним выбранный год

    // Получение данных с сервера
    const fetchData = async (selectedYear) => {
        try {
            const response = await axios.get(
                `https://jewelv.pythonanywhere.com/${url}/top-skills/${selectedYear}/`
            );
            setData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных", error);
        }
    };

    // Обновляем данные при изменении года
    useEffect(() => {
        fetchData(year); // Вызов fetchData с текущим годом
    }, [year]); // Зависимость от year

    const chartData = {
        labels: data.map((element) => element.skill), // Названия навыков
        datasets: [
            {
                label: "Количество вакансий",
                data: data.map((element) => element.count), // Количество вакансий
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
        <div className='count-year-container'>
            <h2>ТОП-20 навыков в {year} году</h2>

            {/* Выпадающий список для выбора года */}
            <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))} // Обновление состояния year
                className={'year-select'}
            >
                {[...Array(2024 - 2015 + 1)].map((_, index) => {
                    const optionYear = 2015 + index;
                    return (
                        <option key={optionYear} value={optionYear}>
                            {optionYear}
                        </option>
                    );
                })}
            </select>

            <HalfTable data={data} />
            <div className="graph-container" style={{ marginTop: "20px" }}>
                <Bar data={chartData} options={chartOptions} style={{minHeight: "450px"}} />
            </div>
        </div>
    );
};