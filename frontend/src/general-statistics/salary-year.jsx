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

const HalfTable = ({ data }) => {
    const midIndex = Math.ceil(data.length / 2); // Находим середину массива
    const firstHalf = data.slice(0, midIndex); // Первая половина данных
    const secondHalf = data.slice(midIndex); // Вторая половина данных

    const renderTable = (dataPart, key) => (
        <table
            key={key}
            border="1"
            className='data-table'
        >
            <thead>
            <tr>
                <th >Годы</th>
                {dataPart.map((element) => (
                    <th style={{fontWeight:'400'}} key={element.year}>{element.year}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{fontSize:'14px', fontWeight:'400'}}>Уровень зарплат</td>
                {dataPart.map((element) => (
                    <td style={{fontSize:'14px', fontWeight:'400'}} key={element.year}>{element.average_salary
                        ? element.average_salary.toString().split('.')[0]
                        : ''} ₽</td>
                ))}
            </tr>
            </tbody>
        </table>
    );

    return (
        <div className='table-container'>
            {renderTable(firstHalf, "firstHalf")}
            {renderTable(secondHalf, "secondHalf")}
        </div>
    );
};


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
            <h2>Динамика уровня зарплат по годам</h2>
            <HalfTable data={data} />
            <div className='graph-container'>
                <Line data={chartData} options={chartOptions}/>
            </div>

        </div>
    );
};