import {SalaryYear} from "../statistic_components/salary-year";
import {CountYear} from "../statistic_components/count-year";
import {useEffect} from "react";

export const DemandPage = () => {

    useEffect(() => {
        document.title = 'Востребованность';
    }, []);

    return (
        <>
            <SalaryYear />
            <CountYear />
        </>
    )
}