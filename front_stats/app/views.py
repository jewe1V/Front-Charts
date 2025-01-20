from datetime import datetime, timedelta
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from .models import *
from .serializers import *
from rest_framework.exceptions import ValidationError


# Код для создания данных, помещенных в таблицы БД, для представлений находится
# в папке FrontStats/front_stats/app/analitics

class CommonSalaryByCityView(ListAPIView):
    queryset = CommonAverageSalaryByCity.objects.all()
    serializer_class = CommonSalaryByCitySerializer


class CommonSalaryByYearView(ListAPIView):
    queryset = CommonAverageSalaryByYear.objects.all()
    serializer_class = CommonSalaryByYearSerializer


class CommonVacanciesByCityView(ListAPIView):
    queryset =  CommonVacanciesByCity.objects.all()
    serializer_class = CommonVacanciesByCitySerializer

class CommonVacanciesByYearView(ListAPIView):
    queryset = CommonVacanciesByYear.objects.all()
    serializer_class = CommonVacanciesByYearSerializer


class CommonTopSkillsView(ListAPIView):
    serializer_class = CommonTopSkillsSerializer

    def get_queryset(self):
        year = self.kwargs.get('year')
        if not year:
            raise ValidationError({"detail": "Year is required."})
        try:
            year = int(year)
        except ValueError:
            raise ValidationError({"detail": "Year must be a valid integer."})
        return CommonTopSkills.objects.filter(year=year)





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
    serializer_class = TopSkillsSerializer

    def get_queryset(self):
        year = self.kwargs.get('year')
        if not year:
            raise ValidationError({"detail": "Year is required."})
        try:
            year = int(year)
        except ValueError:
            raise ValidationError({"detail": "Year must be a valid integer."})
        return TopSkills.objects.filter(year=year)


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

                    vacancy_data = {
                        "title": vacancy['name'],
                        "description": detail_data.get('description', 'Не указано'),
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
