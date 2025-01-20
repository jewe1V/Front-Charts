from rest_framework import serializers
from .models import *

class CommonSalaryByCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonAverageSalaryByCity
        fields = '__all__'


class CommonSalaryByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonAverageSalaryByYear
        fields = '__all__'


class CommonVacanciesByCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonVacanciesByCity
        fields = '__all__'


class CommonVacanciesByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonVacanciesByYear
        fields = '__all__'

class CommonTopSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonTopSkills
        fields = ['skill', 'count']




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
        fields = ['skill', 'count']  # Исключили поле 'year'