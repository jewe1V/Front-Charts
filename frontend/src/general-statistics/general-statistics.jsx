import axios from "axios";
import {useEffect, useState} from "react";
import { CountYear } from "./count-year";

const BASE_URL = "http://127.0.0.1:8000/";

const API_URLS = {
    salaryYear: "general-statistics/yearly-salary/",
    countYear: 'general-statistics/yearly-vacancy-count/',
    citySalary: 'general-statistics/city-salary/',
    cityVacancy: 'general-statistics/city-vacancy-share/',
    topSkills: 'general-statistics/top-skills/',
};

const fetchData = async (url, callback) => {
    try {
        const response = await axios.get(`${BASE_URL}${url}`);
        callback(response.data);
    } catch (error) {
        console.error("Ошибка при получении данных", error);
    }
};

export const GeneralStatistics = () => {
    const [salaryYearData, setSalaryYearData] = useState([]);
    const [countYearData, setCountYearData] = useState([]);
    const [citySalaryData, setCitySalaryData] = useState([]);
    const [cityVacancyData, setCityVacancyData] = useState([]);
    const [topSkillsData, setTopSkillsData] = useState([]);

    useEffect(() => {
        document.title = 'Общая статистика';
        fetchData(API_URLS.countYear, setCountYearData);
        fetchData(API_URLS.cityVacancy, setCityVacancyData);
        fetchData(API_URLS.topSkills, topSkillsData);
    }, [])

    console.log(topSkillsData);

    return (
        <div style={{maxHeight: '700px'}}>
            <CountYear data={countYearData}/>
            {cityVacancyData.map((city) => (
                <p>{city.city}: {city.percentage}% {city.count}</p>
    )

)}
</div>
)
}
