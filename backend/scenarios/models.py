from django.db import models
from django.contrib.auth.models import User

class Scenario(models.Model):
    SCENARIO_CHOICES = [
        ('NIYA', 'Bank Manager'),
        ('RACHEL', 'Financial Advisor'),
        ('TINA', 'Stock Enthusiast'),
    ]

    name = models.CharField(max_length=20, choices=SCENARIO_CHOICES)
    description = models.TextField()

    def __str__(self):
        return self.get_name_display()


class UserScenarioProgress(models.Model):
    STATUS_CHOICES = [
        ('UNSOLVED', 'Unsolved'),
        ('IN_PROGRESS', 'In Progress'),
        ('SOLVED', 'Solved'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='UNSOLVED')

    def __str__(self):
        return f"{self.user.username} - {self.scenario.name} - {self.status}"
