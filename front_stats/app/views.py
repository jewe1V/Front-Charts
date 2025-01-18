from datetime import datetime, timedelta
import html
import re
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from .models import *
from .serializers import *


# Код для создания данных, помещенных в таблицы БД, для представлений находится
# в папке FrontStats/front_stats/app/analitics

class SalaryByCityView(ListAPIView):
    queryset = AverageSalaryByCity.objects.all()
    serializer_class = SalaryByCitySerializer


class SalaryByYearView(ListAPIView):
    queryset = AverageSalaryByYear.objects.all()
    serializer_class = SalaryByYearSerializer


class VacanciesByCityView(ListAPIView):
    queryset =  VacanciesByCity.objects.all()
    serializer_class = VacanciesByCitySerializer

class VacanciesByYearView(ListAPIView):
    queryset = VacanciesByYear.objects.all()
    serializer_class = VacanciesByYearSerializer


class TopSkillsView(ListAPIView):
    queryset = TopSkills.objects.all()
    serializer_class = TopSkillsSerializer


class FetchVacanciesAPIView(APIView):

    def get(self, request, *args, **kwargs):
        now = datetime.now()
        past_24_hours = now - timedelta(hours=24)
        past_24_hours_str = past_24_hours.strftime('%Y-%m-%dT%H:%M:%S')

        # Запрос к API HeadHunter
        response = requests.get('https://api.hh.ru/vacancies', params={
            'text': 'Frontend',
            'search_field': 'name',
            'date_from': past_24_hours_str,
            'per_page': 10,
            'order_by': 'publication_time'
        })

        if response.status_code == 200:
            vacancies = response.json().get('items', [])
            result_vacancies = []

            for vacancy in vacancies:
                vacancy_id = vacancy['id']
                detail_url = f"https://api.hh.ru/vacancies/{vacancy_id}"
                detail_response = requests.get(detail_url)

                if detail_response.status_code == 200:
                    detail_data = detail_response.json()

                    description = html.unescape(
                        re.sub(r'<[^>]*>', '', detail_data.get('description', 'Описание не доступно'))
                    )

                    vacancy_data = {
                        "title": vacancy['name'],
                        "description": description,
                        "skills": ', '.join([skill['name'] for skill in detail_data.get('key_skills', [])]),
                        "company": vacancy['employer']['name'] if vacancy.get('employer') else 'Не указано',
                        "salary_from": vacancy['salary']['from'] if vacancy['salary'] and vacancy['salary'].get('from') else None,
                        "salary_to": vacancy['salary']['to'] if vacancy['salary'] and vacancy['salary'].get('to') else None,
                        "salary_currency": vacancy['salary']['currency'] if vacancy['salary'] and vacancy['salary'].get('currency') else 'Не указано',
                        "region": vacancy['area']['name'],
                        "published_at": vacancy['published_at']
                    }

                    result_vacancies.append(vacancy_data)

            return Response(result_vacancies, status=status.HTTP_200_OK)

        else:
            return Response({"error": f"Ошибка при запросе списка вакансий: {response.status_code}"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
