from rest_framework import serializers
from .models import Scenario, UserScenarioProgress

class ScenarioSerializer(serializers.ModelSerializer):
    name_display = serializers.CharField(source='get_name_display', read_only=True)

    class Meta:
        model = Scenario
        fields = ['id', 'name', 'name_display', 'description']

class UserScenarioProgressSerializer(serializers.ModelSerializer):
    scenario_details = ScenarioSerializer(source='scenario', read_only=True)

    class Meta:
        model = UserScenarioProgress
        fields = ['id', 'user', 'scenario', 'scenario_details', 'status']
