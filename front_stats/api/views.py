from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from collections import Counter
import requests
from .models import Vacancy

def get_exchange_rate(currency, date):
    """
    Получение курса валют для заданной даты.
    Если валюта рубль или дата отсутствует, возвращаем 1.
    """
    if not currency or currency == 'RUB' or not date:
        return 1

    try:
        url = f'https://www.cbr.ru/scripts/XML_daily.asp?date_req={date.strftime("%d/%m/%Y")}'
        response = requests.get(url, timeout=5)
        response.raise_for_status()

        import xml.etree.ElementTree as ET
        tree = ET.fromstring(response.content)
        for item in tree.findall('./Valute'):
            char_code = item.find('CharCode').text
            if char_code == currency:
                return float(item.find('Value').text.replace(',', '.'))
    except (requests.RequestException, ET.ParseError, AttributeError, ValueError):
        pass

    # Если курс не найден, возвращаем 1.
    return 1


class YearlySalaryView(APIView):
    def get(self, request):
        """
        Динамика уровня зарплат по годам.
        """
        vacancies = Vacancy.objects.all()
        yearly_data = {}

        for vacancy in vacancies:
            if vacancy.published_at and (vacancy.salary_from or vacancy.salary_to):
                year = vacancy.published_at.year
                salary_avg = ((vacancy.salary_from or 0) + (vacancy.salary_to or 0)) / 2
                if salary_avg > 10_000_000:  # Игнорируем некорректные значения
                    continue

                exchange_rate = get_exchange_rate(vacancy.salary_currency, vacancy.published_at)
                salary_rub = salary_avg * exchange_rate
                yearly_data.setdefault(year, []).append(salary_rub)

        data = {year: round(sum(salaries) / len(salaries), 2) for year, salaries in yearly_data.items()}
        return Response(data)


class YearlyVacancyCountView(APIView):
    def get(self, request):
        """
        Динамика количества вакансий по годам.
        """
        data = Vacancy.objects.values('published_at__year').annotate(count=Count('id')).order_by('published_at__year')
        return Response(data)


class CitySalaryView(APIView):
    def get(self, request):
        """
        Уровень зарплат по городам.
        """
        vacancies = Vacancy.objects.all()
        city_data = {}

        for vacancy in vacancies:
            if vacancy.area_name and (vacancy.salary_from or vacancy.salary_to):
                salary_avg = ((vacancy.salary_from or 0) + (vacancy.salary_to or 0)) / 2
                if salary_avg > 10_000_000:  # Игнорируем некорректные значения
                    continue

                exchange_rate = get_exchange_rate(vacancy.salary_currency, vacancy.published_at)
                salary_rub = salary_avg * exchange_rate
                city_data.setdefault(vacancy.area_name, []).append(salary_rub)

        data = {city: round(sum(salaries) / len(salaries), 2) for city, salaries in city_data.items()}
        return Response(data)


class CityVacancyShareView(APIView):
    def get(self, request):
        """
        Доля вакансий по городам.
        """
        vacancies = Vacancy.objects.all()
        total_vacancies = vacancies.count()
        if total_vacancies == 0:
            return Response({})

        city_vacancy_count = vacancies.values('area_name').annotate(count=Count('id')).order_by('-count')
        data = {item['area_name']: round(item['count'] / total_vacancies, 4) for item in city_vacancy_count if item['area_name']}
        return Response(data)


class TopSkillsView(APIView):
    def get(self, request):
        """
        ТОП-20 навыков по годам.
        """
        vacancies = Vacancy.objects.all()
        skill_data = {}

        for vacancy in vacancies:
            if vacancy.published_at and vacancy.key_skills:
                year = vacancy.published_at.year
                skills = vacancy.key_skills.split(',')
                skill_data.setdefault(year, []).extend([skill.strip() for skill in skills])

        data = {year: Counter(skills).most_common(20) for year, skills in skill_data.items()}
        return Response(data)

