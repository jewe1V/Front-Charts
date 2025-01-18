import { useEffect } from "react";

export const HomePage = () => {
    useEffect(() => {
        document.title = 'Знакомство с Frontend'
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const section = entry.target;

                    if (entry.isIntersecting) {
                        section.classList.add("animate");
                    } else {
                        section.classList.remove("animate");
                    }
                });
            },
            { threshold: 0.5 } // Активируется, когда 50% секции видны
        );

        const firstSection = document.querySelector(".first-section");

        if (firstSection) {
            observer.observe(firstSection);
        }

        // Очищаем наблюдателя при размонтировании компонента
        return () => {
            if (firstSection) {
                observer.unobserve(firstSection);
            }
        };
    }, []);
    return (
        <div className='home-page-container'>
            <section className="section first-section">

                <div className="description-content">
                    <h1>Frontend-разработчик</h1>
                    <p className="first-section-description">
                        Разработчик, который отвечает за создание пользовательского
                        интерфейса
                        (UI) и обеспечивает удобство взаимодействия (UX) между пользователем и программным
                        обеспечением,
                        будь то веб-сайт, мобильное приложение или веб-приложение. Данный специалист превращает
                        дизайн-макеты в работающие интерфейсы, используя современные технологии и инструменты.
                    </p>

                </div>
            </section>

            <section className="section second-section">
                <div>
                    <h1>Задачи Frontend-разработчика</h1>
                    <ul>
                        <li>
                            <strong>Разработка интерфейсов:</strong> <br/>Создание веб-страниц с использованием
                            HTML(структура
                            страницы),
                            CSS (визуальное оформление) и JavaScript (интерактивность).
                        </li>
                        <li>
                            <strong>Интерактивные элементы:</strong> <br/>Разработка функционала, таких как выпадающие
                            меню,
                            анимации обратной связи и прочее.
                        </li>
                        <li>
                            <strong>Оптимизация:</strong> <br/>Ускорение загрузки, адаптация интерфейса для разных
                            устройств
                            десктопы, планшеты, смартфоны) и обеспечение совместимости с различными браузерами.
                        </li>
                        <li>
                            <strong>Интеграция с backend:</strong> <br/>Взаимодействие с серверной частью через API.
                        </li>
                    </ul>
                </div>

            </section>

            <section className="section second-section">
                <h1>Необходимые навыки и знания</h1>
                <ul>
                    <li>
                        <strong>Языки разметки и стилей:</strong> HTML, CSS
                    </li>
                    <li>
                        <strong>JavaScript:</strong> Язык программирования, позволяющий добавлять интерактивность на
                        страницы (например, динамическое обновление данных или валидация форм).
                    </li>
                    <li>
                        <strong>Фреймворки и библиотеки:</strong> React, Angular, Vue.js и другие —
                        позволяют ускорить разработку и упростить работу с компонентами.
                    </li>
                    <li>
                        <strong>Системы сборки:</strong> Webpack, Parcel, Gulp для оптимизации проекта.
                    </li>
                    <li>
                        <strong>Контроль версий:</strong> Git и системы, такие как GitHub или GitLab, для управления
                        кодом.
                    </li>
                    <li>
                        <strong>Дизайн и UX:</strong> Основы работы с Figma, Adobe XD или Sketch для понимания и
                        внедрения макетов.
                    </li>
                </ul>
            </section>

            <section className="section second-section">
                <h1>Преимущества работы Frontend-разработчиком</h1>
                <ul>
                    <li>Высокая заработная плата.</li>
                    <li>Высокий спрос на специалистов.</li>
                    <li>Гибкость: удалённая работа или фриланс.</li>
                    <li>Креативность: сочетание технологий и творчества.</li>
                    <li>Перспективы карьерного роста.</li>
                </ul>
            </section>

            <section className="section third-section">
                <h1>Особенности профессии</h1>
                <p>
                    Работа frontend-разработчика часто требует не только технической, но и коммуникативной
                    компетентности.
                    Специалисту нужно активно взаимодействовать с дизайнерами, менеджерами проектов и
                    backend-разработчиками,
                    чтобы обеспечить успешную реализацию проекта. Также важно быть готовым к быстрому освоению новых
                    технологий,
                    так как мир IT развивается стремительно.
                </p>
            </section>

            <section className="section third-section">
                <h1>Перспективы развития</h1>
                <p>
                    Frontend-разработка — это лишь часть айсберга. Специалист может расширить свою компетенцию и стать
                    fullstack-разработчиком, освоив серверные технологии (например, Node.js). Также возможна
                    специализация
                    в области мобильной разработки (React Native, Flutter) или переход в дизайн (UX/UI).
                </p>
            </section>

            <section className="section third-section">
                <h1>Зачем становиться frontend-разработчиком?</h1>
                <p>
                    Профессия frontend-разработчика — это отличная возможность для тех, кто хочет создать что-то
                    красивое,
                    функциональное и полезное для миллионов пользователей. Это не только работа с кодом, но и постоянное
                    изучение новых подходов, инструментов и тенденций в мире IT. Если вы мечтаете о динамичной и
                    интересной
                    карьере с перспективами роста, то эта профессия для вас!
                </p>
            </section>
        </div>
    );
}