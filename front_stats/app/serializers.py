from rest_framework import serializers
from .models import *

class SalaryByCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageSalaryByCity
        fields = '__all__'


class SalaryByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageSalaryByYear
        fields = '__all__'


class VacanciesByCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = VacanciesByCity
        fields = '__all__'


class VacanciesByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacanciesByYear
        fields = '__all__'

class TopSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopSkills
        fields = '__all__'