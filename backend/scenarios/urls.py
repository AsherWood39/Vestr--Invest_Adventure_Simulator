from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScenarioViewSet, UserScenarioProgressViewSet

router = DefaultRouter()
router.register(r'list', ScenarioViewSet)
router.register(r'progress', UserScenarioProgressViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
