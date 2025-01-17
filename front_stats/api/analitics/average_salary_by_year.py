import pandas as pd
from datetime import datetime
import sqlite3


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
salary_by_year = vacancies.groupby('year')['average_salary_rub'].mean().reset_index()
salary_by_year.rename(columns={'average_salary_rub': 'average_salary'}, inplace=True)

salary_by_year['average_salary'] = salary_by_year['average_salary'].round(2)

conn = sqlite3.connect('../../db.sqlite3')
salary_by_year.to_sql('average_salary_by_year', conn, if_exists='replace', index=False)