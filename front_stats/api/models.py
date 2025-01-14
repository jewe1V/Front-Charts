from django.db import models

class Vacancy(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    skills = models.TextField(null=True, blank=True)
    company = models.CharField(max_length=255)
    salary_from = models.FloatField(null=True, blank=True)
    salary_to = models.FloatField(null=True, blank=True)
    currency = models.CharField(max_length=10, null=True, blank=True)
    region = models.CharField(max_length=255)
    published_at = models.DateField()

    def __str__(self):
        return self.title
