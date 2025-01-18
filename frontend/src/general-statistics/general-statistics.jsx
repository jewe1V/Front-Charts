import axios from "axios";
import {useEffect, useState} from "react";
import { CountYear } from "./count-year";
import { SalaryYear } from "./salary-year";
import { SalaryCity } from "./salary-city";
import { CountCity } from "./count-city";
import { TopSkills } from "./top-skills";

const BASE_URL = "http://127.0.0.1:8000/";

const API_URLS = {
    salaryYear: "general-statistics/yearly-salary/",
    citySalary: 'general-statistics/city-salary/',
    cityVacancy: 'general-statistics/city-vacancy-share/',
    topSkills: 'general-statistics/top-skills/',
    hhVacancies: 'general-statistics/hh_vacancies/',
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
    const [citySalaryData, setCitySalaryData] = useState([]);
    const [cityVacancyData, setCityVacancyData] = useState([]);
    const [topSkillsData, setTopSkillsData] = useState([]);
    const [hhVacanciesData, setHHVacancies] = useState([]);
    useEffect(() => {
        document.title = 'Общая статистика';
        fetchData(API_URLS.salaryYear, setSalaryYearData);
        fetchData(API_URLS.citySalary, setCitySalaryData);
        fetchData(API_URLS.cityVacancy, setCityVacancyData);
        fetchData(API_URLS.topSkills, setTopSkillsData);
        fetchData(API_URLS.hhVacancies, setHHVacancies);
    }, [])

    console.log(`зп-год ${salaryYearData}`);
    console.log(`город-зп ${citySalaryData}`);
    console.log(`кол-во город ${cityVacancyData}`);
    console.log(`топ 20 скилов ${topSkillsData}`);
    console.log(`вакансии с HH ${hhVacanciesData}`);

    return (

        <div>
            <SalaryYear/>
            <CountYear />
            <SalaryCity />
            <CountCity />
            <TopSkills />
        </div>
)
}
