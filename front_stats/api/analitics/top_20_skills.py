import pandas as pd
from collections import Counter
import sqlite3

input_file = "tables/frontend_vacancies_2024.csv"
output_file = "top_skills_by_year.csv"
data = pd.read_csv(input_file)

data['key_skills'] = data['key_skills'].fillna('')
data = data[data['key_skills'] != '']
data['published_at'] = pd.to_datetime(data['published_at'], errors='coerce', utc=True)

all_skills = data['key_skills'].str.split('\n').explode().str.strip()
skill_counts = Counter(all_skills)
top_skills = skill_counts.most_common(20)
result = pd.DataFrame(top_skills, columns=['skill', 'count'])
result = result[result['skill'] != '']

conn = sqlite3.connect('../../db.sqlite3')
result.to_sql('top_20_skills', conn, if_exists='replace', index=False)
conn.close()

print(result)