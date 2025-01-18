import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export const VacanciesPage = () => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/general-statistics/hh_vacancies/');
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                const data = await response.json();

                // Преобразуем дату публикации в читаемый формат
                const formattedData = data.map(vacancy => ({
                    ...vacancy,
                    published_at: new Date(vacancy.published_at).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                }));

                setVacancies(formattedData);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    if (loading) {
        return (
            <>
                <h1 className='vacancies-header'>Вакансии с Head Hunters</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ClipLoader color="#4A90E2" loading={true} size={50} />
                </div>
            </>
        );
    }

    return (
        <div>
            <h1 className='vacancies-header'>Вакансии с Head Hunters</h1>
            {vacancies.length === 0 ? (
                <p>Нет доступных вакансий.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {vacancies.map((vacancy, index) => (
                        <VacancyCard key={index} vacancy={vacancy} />
                    ))}
                </div>
            )}
        </div>
    );
};

const VacancyCard = ({ vacancy }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const shortenedDescription = vacancy.description?.length > 150
        ? `${vacancy.description.slice(0, 150)}...`
        : vacancy.description;

    const skills = vacancy.skills
        ?.split(',')
        .map(skill => skill.trim()) // Убираем лишние пробелы
        .filter(skill => skill.length > 0) || [];

    return (
        <div className='vacancies-container'>
            <h2>{vacancy.title || 'Название не указано'}</h2>
            {skills.length > 0 && ( // Рендерим контейнер только если есть навыки
                <div className="skills-container">
                    {skills.map((skill, index) => (
                        <span className="skill-badge" key={index}>
                    {skill}
                </span>
                    ))}
                </div>
            )}

            <div className='vacancy-short-info'>
                <p className='vacancy-company'><strong>{vacancy.company || 'Не указана'}</strong>,
                    {' ' + vacancy.region || ''}
                </p>
                { (vacancy.salary_from || vacancy.salary_to) && (
                    <p className='vacancy-salary'>
                        {vacancy.salary_from && vacancy.salary_to && vacancy.salary_from !== vacancy.salary_to
                            ? `от ${vacancy.salary_from} до ${vacancy.salary_to} ${vacancy.salary_currency || ''}`
                            : vacancy.salary_from
                                ? `от ${vacancy.salary_from} ${vacancy.salary_currency || ''}`
                                : `до ${vacancy.salary_to} ${vacancy.salary_currency || ''}`}
                    </p>
                )}
            </div>

            <div className='vacancy-description'>
                <span
                    dangerouslySetInnerHTML={{
                        __html: isExpanded
                            ? vacancy.description || 'Нет описания'
                            : shortenedDescription || 'Нет описания',
                    }}
                />
                {vacancy.description?.length > 150 && (
                    <button className='description-btn'
                            onClick={toggleDescription}
                    >
                        {isExpanded ? 'Скрыть' : 'Показать ещё'}
                    </button>
                )}
            </div>
            <p className='vacancy-date'>{vacancy.published_at || 'Не указана'}</p>
        </div>
    );
};