import { useEffect } from 'react';
import '../App.css';
import {Outlet} from "react-router-dom";
import {Header} from "../basic_interface/header";
import {Footer} from "../basic_interface/footer";
import { Sidebar } from '../basic_interface/sidebar'

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
