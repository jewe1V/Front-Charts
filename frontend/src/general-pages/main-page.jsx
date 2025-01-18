import { useEffect } from 'react';
import '../App.css';
import {Outlet} from "react-router-dom";
import {Header} from "../header";
import {Footer} from "../footer";
import { Sidebar } from '../sidebar'

export const MainPage = () => {

  useEffect(() => {
    document.title = 'Главная'
  }, []);

  return (
    <div className='main-page-container'>
        <Header />

        <div className='main-container'>
            <Sidebar />
            <div className='content'>
                <Outlet />
            </div>
        </div>

        <Footer />
    </div>
  );
};
