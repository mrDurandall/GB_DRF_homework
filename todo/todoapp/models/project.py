from django.db import models

from users.models import User


class Project(models.Model):

    title = models.CharField(
        max_length=256,
        verbose_name='Название',
    )

    repo_link = models.URLField(
        max_length=256,
        verbose_name='Ссылка на репозиторий',
        null=True,
        blank=True,
    )

    users = models.ManyToManyField(
        User,
        blank=True,
        null=True,
        verbose_name='Пользователи'
    )

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'

    def __str__(self):
        return self.title
