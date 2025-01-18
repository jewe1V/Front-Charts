import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './general-pages/home-page'
import { MainPage } from './general-pages/main-page'
import { GeneralStatisticsPage } from './general-pages/general-statistics-page'
import { DemandPage } from "./general-pages/demand-page";
import { GeographyPage } from "./general-pages/geography-page";
import { SkillsPage } from "./general-pages/skills-page";

createRoot(document.getElementById('root')).render(
<StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='main' element={<MainPage />}>
                <Route path='general-statistics' element={<GeneralStatisticsPage />} />
                <Route path='demand' element={<DemandPage />} />
                <Route path='geography' element={<GeographyPage />} />
                <Route path='skills' element={<SkillsPage />} />
                <Route path='latest-vacancies' element={<GeneralStatisticsPage />} />
            </Route>

        </Routes>
    </BrowserRouter>
</StrictMode>
);
