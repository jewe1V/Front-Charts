import pandas as pd
from datetime import datetime
import sqlite3
import re


def regex_round(value):
    """
    Округляет значение до двух знаков после запятой с помощью регулярного выражения
    """
    if pd.isna(value):
        return value
    value_str = f"{value:.10f}"
    rounded = re.sub(r"(\d+\.\d{2})\d*", r"\1", value_str)
    return float(rounded)


vacancies = pd.read_csv('tables/frontend_vacancies_2024.csv')
rates = pd.read_csv('tables/rates.csv')

def calculate_average_salary(row, rates):
    salary_from = row['salary_from']
    salary_to = row['salary_to']
    currency = row['salary_currency']
    publish_date = row['published_at']

    if pd.isna(salary_from) and pd.isna(salary_to):
        return pd.NA

    if pd.notna(salary_from) and pd.isna(salary_to):
        avg_salary = pd.to_numeric(salary_from, errors='coerce', downcast='float')
    elif pd.notna(salary_to) and pd.isna(salary_from):
        avg_salary = pd.to_numeric(salary_to, errors='coerce', downcast='float')
    else:
        avg_salary = (pd.to_numeric(salary_from, errors='coerce', downcast='float') +
                      pd.to_numeric(salary_to, errors='coerce', downcast='float')) / 2

    if pd.isna(currency) or currency == 'RUR':
        return avg_salary

    cleaned_date = publish_date.split("T")[0]
    date_key = datetime.strptime(cleaned_date, '%Y-%m-%d').replace(day=1).strftime('%d/%m/%Y')

    if currency in rates.columns:
        rate_row = rates.loc[rates['date'] == date_key, currency]
        if not rate_row.empty:
            rate = rate_row.values[0]
            if pd.notna(rate):
                avg_salary *= rate
            else:
                avg_salary = pd.NA
        else:
            avg_salary = pd.NA
    else:
        avg_salary = pd.NA

    return avg_salary

vacancies['average_salary_rub'] = vacancies.apply(lambda row: calculate_average_salary(row, rates), axis=1)
vacancies = vacancies[vacancies['average_salary_rub'] <= 10_000_000]

vacancies['year'] = vacancies['published_at'].apply(lambda x: datetime.strptime(x.split("T")[0], '%Y-%m-%d').year)
result = vacancies.groupby('year')['average_salary_rub'].mean().reset_index()
result.rename(columns={'average_salary_rub': 'average_salary'}, inplace=True)

result['average_salary'] = result['average_salary'].apply(regex_round)
result.insert(0, 'id', range(1, len(result) + 1))

conn = sqlite3.connect('../../db.sqlite3')
result.to_sql('average_salary_by_year', conn, if_exists='replace', index=False)
conn.close()

print(result)