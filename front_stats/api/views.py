from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Vacancy
from .serializers import VacancySerializer
import pandas as pd

class StatisticsView(APIView):
    def get(self, request):
        # Обработка CSV данных
        vacancies = Vacancy.objects.all()
        data = VacancySerializer(vacancies, many=True).data
        return Response({"data": data})
