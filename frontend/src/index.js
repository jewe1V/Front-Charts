import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './home-page'
import { MainPage } from './main-page'

createRoot(document.getElementById('root')).render(
<StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/main' element={<MainPage />} />
        </Routes>
    </BrowserRouter>
</StrictMode>
);
