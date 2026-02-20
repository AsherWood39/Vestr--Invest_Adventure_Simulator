from django.db import models
from scenarios.models import Scenario
from django.contrib.auth.models import User


class QuizQuestion(models.Model):
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE)
    question_text = models.TextField()
    xp_reward = models.IntegerField(default=10)

    def __str__(self):
        return f"{self.scenario.get_name_display()} - {self.question_text[:50]}"


class QuizOption(models.Model):
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE, related_name="options")
    option_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    
    def __str__(self):
        return self.option_text
    
class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey('QuizQuestion', on_delete=models.CASCADE)
    selected_option = models.CharField(max_length=1)
    is_correct = models.BooleanField(default=False)
    answered_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ('user', 'question')
    
    def __str__(self):
        return f"{self.user.username} - Q{self.question.id}"
