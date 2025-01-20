"""
URL configuration for front_stats project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('common/city-salary/', CommonSalaryByCityView.as_view(), name='common-city-salary'),
    path('common/yearly-salary/', CommonSalaryByYearView.as_view(), name='common-yearly-salary'),
    path('common/city-vacancy-share/', CommonVacanciesByCityView.as_view(), name='common-city-vacancy'),
    path('common/yearly-vacancy-count/', CommonVacanciesByYearView.as_view(), name='common-yearly-vacancy'),
    path('common/top-skills/<int:year>/', CommonTopSkillsView.as_view(), name='common-top-skills'),


    path('general-statistics/city-salary/', SalaryByCityView.as_view(), name='city-salary'),
    path('general-statistics/yearly-salary/', SalaryByYearView.as_view(), name='yearly-salary'),
    path('general-statistics/city-vacancy-share/', VacanciesByCityView.as_view(), name='city-vacancy'),
    path('general-statistics/yearly-vacancy-count/', VacanciesByYearView.as_view(), name='yearly-vacancy'),
    path('general-statistics/top-skills/<int:year>/', TopSkillsView.as_view(), name='top-skills'),
    path('general-statistics/hh_vacancies/', FetchVacanciesAPIView.as_view(), name='vacancy-list'),
]

