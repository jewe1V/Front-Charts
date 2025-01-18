import {SalaryCity} from "../statistic_components/salary-city";
import {CountCity} from "../statistic_components/count-city";
import {useEffect} from "react";

export const GeographyPage = () => {

    useEffect(() => {
        document.title = 'География';
    }, []);

    return (
        <>
            <SalaryCity />
            <CountCity />
        </>
    )
}