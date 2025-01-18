import homeIcon from '../img/sidebar/main.svg';
import generalStatisticsIcon from '../img/sidebar/general-statistics.svg';
import demandIcon from '../img/sidebar/demand.svg';
import geographyIcon from '../img/sidebar/geography.svg';
import skillsIcon from '../img/sidebar/skills.svg';
import latestVacanciesIcon from '../img/sidebar/latest-vacancies.svg';

import { NavLink } from 'react-router-dom';

export const Sidebar = () => {

    const menuItems = [
        { path: '', name: 'Домашняя страница', icon: homeIcon },
        { path: 'general-statistics', name: 'Общая статистика', icon: generalStatisticsIcon },
        { path: 'demand', name: 'Востребованность', icon: demandIcon },
        { path: 'geography', name: 'География', icon: geographyIcon },
        { path: 'skills', name: 'Навыки', icon: skillsIcon },
        { path: 'latest-vacancies', name: 'Последние вакансии', icon: latestVacanciesIcon },
    ];

    return (
        <div className='sidebar'>
            {menuItems.map((item, index) => (
                <NavLink to={item.path} key={index} className='sidebar-link'>
                    <img src={item.icon} className='navbar-icon' alt={item.name}/>
                    <div className='navbar-link-text'>{item.name}</div>
                </NavLink>
            ))}
        </div>
    );
}