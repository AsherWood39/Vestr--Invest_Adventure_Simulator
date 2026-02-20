from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class UserProfile(models.Model):
    AVATAR_CHOICES = [
        ('CLARA', 'Professional Clara'),
        ('MAYA', 'Student Maya'),
    ]

    GOAL_CHOICES = [
        ('FAMILY FUND', 'Family Fund'),
        ('CAREER BREAK', 'Career Break'),
        ('WEALTH BUILDING', 'Wealth Building'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.CharField(max_length=10, choices=AVATAR_CHOICES)
    goal = models.CharField(max_length=100, choices=GOAL_CHOICES)
    xp = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username