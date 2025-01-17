from collections import Counter
import requests
from django.db.models import  F
from bs4 import BeautifulSoup
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from .models import Vacancy
from .serializers import VacancyCityShareSerializer
from django.db.models.expressions import Func
from django.db.models.functions import Cast
from django.db.models import TextField


class YearlyVacancyCountView(APIView):
    def get(self, request):
        """
        Динамика количества вакансий по годам.
        """
        data = Vacancy.objects.values('published_at__year').annotate(count=Count('id')).order_by('published_at__year')
        return Response(data)

class VacancyCityShareView(APIView):
    def get(self, request):
        total_vacancies = Vacancy.objects.count()
        if total_vacancies == 0:
            return Response([])

        # Получение данных по городам, отсортированных по количеству вакансий
        city_data = (
            Vacancy.objects
            .values('area_name')
            .annotate(count=Count('id'))
            .annotate(percentage=(Count('id') * 100.0 / total_vacancies))
            .order_by('-count')
        )

        # Разделение на топ-19 и остальные
        top_19 = city_data[:19]
        other_cities = city_data[19:]

        # Подсчет для оставшихся городов
        other_count = sum(city['count'] for city in other_cities)
        other_percentage = round((other_count * 100.0 / total_vacancies), 2) if other_count else 0

        # Округляем проценты в топ-19
        result = [
            {
                'area_name': city['area_name'],
                'count': city['count'],
                'percentage': round(city['percentage'], 2)
            }
            for city in top_19
        ]

        # Добавляем "Другие города" в итоговый список
        if other_count > 0:
            result.append({
                'area_name': 'Другие города',
                'count': other_count,
                'percentage': other_percentage,
            })

        serializer = VacancyCityShareSerializer(result, many=True)
        return Response(serializer.data)


class SplitSkills(Func):
    function = 'unnest'
    template = "%(function)s(string_to_array(%(expressions)s, '\n'))"

class TopSkillsView(APIView):
    def get(self, request):
        # Разделение и подсчет навыков
        skills_data = (
            Vacancy.objects
            .exclude(key_skills__isnull=True)  # Исключаем записи без key_skills
            .exclude(key_skills='')           # Исключаем пустые строки
            .annotate(skill=SplitSkills(Cast('key_skills', TextField())))  # Разбиваем на навыки
            .values('skill')                  # Группируем по каждому навыку
            .annotate(count=Count('skill'))   # Считаем частоту
            .order_by('-count')               # Сортируем по частоте
        )

        # Ограничиваем до топ-20 навыков
        top_skills = skills_data[:20]

        # Форматируем вывод
        result = [
            {'skill': skill['skill'].strip(), 'count': skill['count']}
            for skill in top_skills
        ]

        return Response(result)
