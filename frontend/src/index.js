import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './home-page'
import { MainPage } from './main-page'
import { GeneralStatistics } from './general-statistics/general-statistics'

createRoot(document.getElementById('root')).render(
<StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='main' element={<MainPage />}>
                <Route path='general-statistics' element={<GeneralStatistics />} />
                <Route path='demand' element={<GeneralStatistics />} />
                <Route path='geography' element={<GeneralStatistics />} />
                <Route path='skills' element={<GeneralStatistics />} />
                <Route path='latest-vacancies' element={<GeneralStatistics />} />
            </Route>

        </Routes>
    </BrowserRouter>
</StrictMode>
);
