import csv
import os
from datetime import datetime

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "front_stats.settings")

import django
django.setup()

from api.models import Vacancy

KEYWORDS = [
    'frontend', 'фронтенд', 'вёрстка', 'верстка', 'верста',
    'front end', 'angular', 'html', 'css', 'react', 'vue'
]

def parse_datetime(value):
    try:
        # Попытка преобразовать ISO 8601 формат (с временной зоной)
        return datetime.fromisoformat(value)
    except ValueError:
        return None

def create_filtered_csv(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as infile, open(output_path, 'w', encoding='utf-8', newline='') as outfile:
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()

        for row in reader:
            combined_text = (row['name'] + " " + row['key_skills']).lower()
            if any(keyword in combined_text for keyword in KEYWORDS):
                writer.writerow(row)
        print(f"Отфильтрованная таблица сохранена в {output_path}")

def load_csv_to_db(file_path):
    with open(file_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        vacancies = []
        for row in reader:
            vacancies.append(
                Vacancy(
                    name=row['name'],
                    key_skills=row['key_skills'],
                    salary_from=row.get('salary_from') if row.get('salary_from') else None,
                    salary_to=row.get('salary_to') if row.get('salary_to') else None,
                    salary_currency=row.get('salary_currency') if row.get('salary_currency') else None,
                    area_name=row.get('area_name'),
                    published_at=parse_datetime(row.get('published_at')),
                )
            )
        Vacancy.objects.bulk_create(vacancies)
        print(f"{len(vacancies)} записей было добавлено в БД")


if __name__ == "__main__":
    input_csv_path = 'api/analitics/tables/vacancies_2024.csv'
    filtered_csv_path = 'api/analitics/tables/frontend_vacancies_2024.csv'
    create_filtered_csv(input_csv_path, filtered_csv_path)
    load_csv_to_db(filtered_csv_path)

