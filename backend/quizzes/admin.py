

# Register your models here.
from django.contrib import admin
from .models import QuizQuestion, QuizOption, UserAnswer


class QuizOptionInline(admin.TabularInline):
    model = QuizOption
    extra = 4



class QuizQuestionAdmin(admin.ModelAdmin):
    inlines = [QuizOptionInline]
    list_display = ("question_text", "scenario", "xp_reward")
    list_filter = ("scenario",)

class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ("user", "question", "selected_option", "is_correct", "answered_at")
    list_filter = ("is_correct", "question__scenario")
    search_fields = ("user__username",)
    readonly_fields = ("answered_at",)

admin.site.register(QuizQuestion, QuizQuestionAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)