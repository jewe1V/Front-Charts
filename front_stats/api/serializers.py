from rest_framework import serializers

class VacancyCityShareSerializer(serializers.Serializer):
    city = serializers.CharField(source='area_name')
    percentage = serializers.FloatField()
    count = serializers.IntegerField()
