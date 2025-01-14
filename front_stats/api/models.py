from django.db import models

class Vacancy(models.Model):
    name = models.CharField(max_length=255)
    key_skills = models.TextField(null=True, blank=True)
    salary_from = models.FloatField(null=True, blank=True)
    salary_to = models.FloatField(null=True, blank=True)
    salary_currency = models.TextField(null=True, blank=True)
    area_name = models.CharField(max_length=255)
    published_at = models.DateField()

    def __str__(self):
        return self.title
