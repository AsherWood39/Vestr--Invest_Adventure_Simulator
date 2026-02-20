from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserAnswer
from users.models import UserProfile
from scenarios.models import UserScenarioProgress  


@receiver(post_save, sender=UserAnswer)
def update_user_xp(sender, instance, created, **kwargs):
    if created and instance.is_correct:
        profile = UserProfile.objects.get(user=instance.user)
        profile.xp += instance.question.xp_reward
        profile.save()


        from quizzes.models import QuizQuestion  
        correct_answers = UserAnswer.objects.filter(
            user=instance.user,
            is_correct=True,
            question__scenario=instance.question.scenario
        ).count()

        if correct_answers >= 10:
            progress, created = UserScenarioProgress.objects.get_or_create(
                user=instance.user,
                scenario=instance.question.scenario
            )
            progress.mark_solved()