from django.urls import path
from .views import *

urlpatterns = [
    path('api/yearly-salary/', YearlySalaryView.as_view(), name='yearly_salary'),
    path('api/yearly-vacancy-count/', YearlyVacancyCountView.as_view(), name='yearly_vacancy_count'),
    path('api/city-salary/', CitySalaryView.as_view(), name='city_salary'),
    path('api/city-vacancy-share/', CityVacancyShareView.as_view(), name='city_vacancy_share'),
    path('api/top-skills/', TopSkillsView.as_view(), name='top_skills'),
]