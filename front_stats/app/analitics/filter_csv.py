import csv
import os
from datetime import datetime

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


if __name__ == "__main__":
    input_csv_path = 'tables/vacancies_2024.csv'
    filtered_csv_path = 'tables/frontend_vacancies_2024.csv'
    create_filtered_csv(input_csv_path, filtered_csv_path)

