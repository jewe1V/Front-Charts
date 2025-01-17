import pandas as pd
import sqlite3


vacancies = pd.read_csv('tables/frontend_vacancies_2024.csv')
total_vacancies = vacancies.shape[0]


city_stats = (
    vacancies.groupby('area_name')
    .size()
    .reset_index(name='vacancy_count')
)

city_stats['percentage'] = (city_stats['vacancy_count'] / total_vacancies * 100)
top_cities = city_stats[city_stats['percentage'] >= 1]

other_cities = city_stats[city_stats['percentage'] < 1]
other_row = pd.DataFrame([{
    'area_name': 'Другие города',
    'vacancy_count': other_cities['vacancy_count'].sum(),
    'percentage': other_cities['vacancy_count'].sum() / total_vacancies * 100
}])

sorted_top_cities = top_cities.sort_values(by='vacancy_count', ascending=False)

result = pd.concat([sorted_top_cities, other_row], ignore_index=True)
result['percentage'] = result['percentage'].round(2)

conn = sqlite3.connect('../../db.sqlite3')
result.to_sql('vacancies_by_city', conn, if_exists='replace', index=False)
conn.close()

print(result)