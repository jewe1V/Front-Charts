import pandas as pd
import sqlite3


input_file = "tables/frontend_vacancies_2024.csv"
data = pd.read_csv(input_file)

data['published_at'] = pd.to_datetime(data['published_at'], errors='coerce', utc=True)
data['year'] = data['published_at'].dt.year
result = data.groupby('year').size().reset_index(name='vacancy_count')
result.insert(0, 'id', range(1, len(result) + 1))

conn = sqlite3.connect('../../db.sqlite3')
result.to_sql('vacancies_by_year', conn, if_exists='replace', index=False)
conn.close()

print(result)
