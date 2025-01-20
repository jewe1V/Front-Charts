from django.contrib import admin
from .models import *

@admin.register(CommonAverageSalaryByCity)
class AverageSalaryByCityAdmin(admin.ModelAdmin):
    list_display = ('area_name', 'avg_salary_rub')
    search_fields = ('area_name',)

@admin.register(CommonAverageSalaryByYear)
class AverageSalaryByYearAdmin(admin.ModelAdmin):
    list_display = ('year', 'average_salary')
    search_fields = ('year',)

@admin.register(CommonVacanciesByCity)
class VacanciesByCityAdmin(admin.ModelAdmin):
    list_display = ('area_name', 'vacancy_count', 'percentage')
    search_fields = ('area_name',)

@admin.register(CommonVacanciesByYear)
class VacanciesByYearAdmin(admin.ModelAdmin):
    list_display = ('year', 'vacancy_count')
    search_fields = ('year',)

@admin.register(CommonTopSkills)
class TopSkillsAdmin(admin.ModelAdmin):
    list_display = ('skill', 'count', 'year')
    list_filter = ('year',)
    search_fields = ('skill',)




@admin.register(AverageSalaryByCity)
class AverageSalaryByCityAdmin(admin.ModelAdmin):
    list_display = ('area_name', 'avg_salary_rub')
    search_fields = ('area_name',)

@admin.register(AverageSalaryByYear)
class AverageSalaryByYearAdmin(admin.ModelAdmin):
    list_display = ('year', 'average_salary')
    search_fields = ('year',)

@admin.register(VacanciesByCity)
class VacanciesByCityAdmin(admin.ModelAdmin):
    list_display = ('area_name', 'vacancy_count', 'percentage')
    search_fields = ('area_name',)

@admin.register(VacanciesByYear)
class VacanciesByYearAdmin(admin.ModelAdmin):
    list_display = ('year', 'vacancy_count')
    search_fields = ('year',)

@admin.register(TopSkills)
class TopSkillsAdmin(admin.ModelAdmin):
    list_display = ('skill', 'count', 'year')
    list_filter = ('year',)
    search_fields = ('skill',)

