from rest_framework import viewsets
from .models import QuizQuestion
from .serializers import QuizQuestionSerializer

class QuizQuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer

    def get_queryset(self):
        scenario_id = self.request.query_params.get('scenario')
        if scenario_id:
            return self.queryset.filter(scenario_id=scenario_id)
        return self.queryset
