import {useEffect} from "react";
import { CountYear } from "../statistic_components/count-year";
import { SalaryYear } from "../statistic_components/salary-year";
import { SalaryCity } from "../statistic_components/salary-city";
import { CountCity } from "../statistic_components/count-city";
import { TopSkills } from "../statistic_components/top-skills";

export const GeneralStatisticsPage = () => {

    useEffect(() => {
        document.title = 'Общая статистика';
    }, []);

    return (
        <>
            <SalaryYear/>
            <CountYear />
            <SalaryCity />
            <CountCity />
            <TopSkills />
        </>
    )
}
