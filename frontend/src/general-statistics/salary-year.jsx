import axios from "axios";
import {useEffect, useState} from "react";

export const SalaryYearGraph = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/yearly-vacancy-count/", {
            });
            setData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных о зарплате по годам", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    if (data.length === 0) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            {data.map((element) => (
                <div key={element.published_at__year}>
                    <p>{element.published_at__year}: {element.count}</p>
                </div>
            ))}
        </div>
    );
}