from rest_framework import serializers
from .models import QuizQuestion, QuizOption

class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = ['id', 'option_text', 'is_correct']

class QuizQuestionSerializer(serializers.ModelSerializer):
    options = QuizOptionSerializer(many=True, read_only=True)
    scenario_name = serializers.CharField(source='scenario.get_name_display', read_only=True)

    class Meta:
        model = QuizQuestion
        fields = ['id', 'scenario', 'scenario_name', 'question_text', 'xp_reward', 'options']
