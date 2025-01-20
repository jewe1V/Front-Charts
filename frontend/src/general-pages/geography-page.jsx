import {SalaryCity} from "../statistic_components/salary-city";
import {CountCity} from "../statistic_components/count-city";
import {useEffect, useState} from "react";
import axios from "axios";

export const GeographyPage = () => {

    const [data, setData] = useState([{}]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://jewelv.pythonanywhere.com/general-statistics/city-vacancy-share/`
            );
            setData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных", error);
        }
    };

    useEffect(() => {
        document.title = 'География';
        fetchData();
    }, []);

    return (
        <div style={{marginTop: '-40px'}}>
            <SalaryCity url={'general-statistics'}/>
            <CountCity url={'general-statistics'}/>
        </div>
    )
}