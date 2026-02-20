from rest_framework import viewsets
from .models import Scenario, UserScenarioProgress
from .serializers import ScenarioSerializer, UserScenarioProgressSerializer

class ScenarioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Scenario.objects.all()
    serializer_class = ScenarioSerializer

class UserScenarioProgressViewSet(viewsets.ModelViewSet):
    queryset = UserScenarioProgress.objects.all()
    serializer_class = UserScenarioProgressSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user) if self.request.user.is_authenticated else self.queryset
