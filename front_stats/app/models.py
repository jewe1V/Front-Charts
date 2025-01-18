from django.db import models

class AverageSalaryByCity(models.Model):
    area_name = models.CharField(max_length=255)
    avg_salary_rub = models.FloatField()

    class Meta:
        db_table = 'average_salary_by_city'

class AverageSalaryByYear(models.Model):
    year = models.IntegerField()
    average_salary = models.FloatField()

    class Meta:
        db_table = 'average_salary_by_year'

class VacanciesByCity(models.Model):
    area_name = models.CharField(max_length=255)
    vacancy_count = models.IntegerField()
    percentage = models.FloatField()

    class Meta:
        db_table = 'vacancies_by_city'

class VacanciesByYear(models.Model):
    year = models.IntegerField()
    vacancy_count = models.IntegerField()

    class Meta:
        db_table = 'vacancies_by_year'

class TopSkills(models.Model):
    skill = models.CharField(max_length=255)
    count = models.IntegerField()

    class Meta:
        db_table = 'top_20_skills'