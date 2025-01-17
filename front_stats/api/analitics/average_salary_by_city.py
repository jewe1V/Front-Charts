import pandas as pd
from datetime import datetime
import re
import sqlite3


def regex_round(value):
    """
    Округляет значение до двух знаков после запятой с помощью регулярного выражения
    """
    if pd.isna(value):
        return value
    value_str = f"{value:.10f}"
    rounded = re.sub(r"(\d+\.\d{2})\d*", r"\1", value_str)
    return rounded


vacancies = pd.read_csv('tables/frontend_vacancies_2024.csv')
rates = pd.read_csv('tables/rates.csv')

def calculate_salary(row, currency_rates):
    salary_from = row['salary_from']
    salary_to = row['salary_to']

    if pd.notna(salary_from) and pd.notna(salary_to):
        avg_salary = (salary_from + salary_to) / 2
    elif pd.notna(salary_from):
        avg_salary = salary_from
    elif pd.notna(salary_to):
        avg_salary = salary_to
    else:
        return pd.NA

    if pd.isna(row['salary_currency']) or row['salary_currency'] == 'RUR':
        return avg_salary

    cleaned_date = row['published_at'].split("T")[0]
    date_key = datetime.strptime(cleaned_date, '%Y-%m-%d').replace(day=1).strftime('%d/%m/%Y')

    if row['salary_currency'] in currency_rates.columns:
        rate_row = currency_rates.loc[currency_rates['date'] == date_key, row['salary_currency']]
        if not rate_row.empty:
            rate = rate_row.values[0]
            if pd.notna(rate):
                return avg_salary * rate

    return pd.NA


vacancies['salary'] = vacancies.apply(lambda row: calculate_salary(row, rates), axis=1)
vacancies_filtered = vacancies[pd.notna(vacancies['salary'])]
total_vacancies = len(vacancies_filtered)
city_percentage = vacancies_filtered['area_name'].value_counts() / total_vacancies
cities_to_include = city_percentage[city_percentage >= 0.01].index


def calculate_average_salary_by_city(vacancies_filtered, cities_to_include):
    """
    Рассчитывает средние зарплаты по городам

    Args:
        vacancies_filtered (pd.DataFrame): Фильтрованный DataFrame с вакансиями.
        cities_to_include (pd.Index): Города, которые нужно учитывать.

    Returns:
        pd.DataFrame: DataFrame со средними зарплатами по городам.
    """
    # Средние зарплаты по городам
    salary_by_city = (
        vacancies_filtered[vacancies_filtered['area_name'].isin(cities_to_include)]
        .groupby('area_name')['salary']
        .mean()
        .sort_values(ascending=False)
        .round(2)
    )

    other_cities = vacancies_filtered[~vacancies_filtered['area_name'].isin(cities_to_include)]
    other_avg_salary = other_cities['salary'].mean()

    result = salary_by_city.reset_index().rename(columns={'salary': 'avg_salary_rub'})
    if not pd.isna(other_avg_salary):
        result = pd.concat(
            [
                result,
                pd.DataFrame({'area_name': ['Другие города'], 'avg_salary_rub': [round(other_avg_salary, 2)]}),
            ],
            ignore_index=True,
        )

    result['avg_salary_rub'] = result['avg_salary_rub'].apply(regex_round)
    return result

result = calculate_average_salary_by_city(vacancies_filtered, cities_to_include)

conn = sqlite3.connect('../../db.sqlite3')  # Укажите путь к базе данных
result.to_sql('average_salary_by_city', conn, if_exists='replace', index=False)
conn.close()

print(result)