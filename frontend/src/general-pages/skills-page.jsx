import {TopSkills} from "../statistic_components/top-skills";
import {useEffect} from "react";

export const SkillsPage = () => {

    useEffect(() => {
        document.title = 'Навыки';
    }, []);

    return (
        <div style={{marginTop: '-40px'}}>
            <TopSkills url={'general-statistics'}/>
        </div>
    )
}