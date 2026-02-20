from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Scenario, UserScenarioProgress
from .serializers import ScenarioSerializer, UserScenarioProgressSerializer

class ScenarioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Scenario.objects.all()
    serializer_class = ScenarioSerializer

class UserScenarioProgressViewSet(viewsets.ModelViewSet):
    queryset = UserScenarioProgress.objects.all()
    serializer_class = UserScenarioProgressSerializer

    def get_queryset(self):
        queryset = UserScenarioProgress.objects.all()
        username = self.request.query_params.get('username')
        if username:
            queryset = queryset.filter(user__username=username)
        elif self.request.user.is_authenticated:
            queryset = queryset.filter(user=self.request.user)
        else:
            return queryset.none()
        return queryset

    @action(detail=False, methods=['post'])
    def complete_scenario(self, request):
        username = request.data.get('username')
        scenario_id = request.data.get('scenario_id')

        if not username or not scenario_id:
            return Response({'error': 'Username and scenario_id required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(username=username)
            scenario = Scenario.objects.get(id=scenario_id)
            
            progress, created = UserScenarioProgress.objects.get_or_create(
                user=user,
                scenario=scenario,
                defaults={'status': 'SOLVED'}
            )
            
            if not created:
                progress.status = 'SOLVED'
                progress.save()
                
            return Response(UserScenarioProgressSerializer(progress).data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Scenario.DoesNotExist:
            return Response({'error': 'Scenario not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
