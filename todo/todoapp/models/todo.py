from django.db import models


class ToDo(models.Model):

    project = models.ForeignKey(
        'todoapp.Project',
        related_name='todos',
        verbose_name='Проект',
        on_delete=models.CASCADE
    )

    text = models.TextField(
        verbose_name='Описание',
    )

    created_on = models.DateTimeField(
        verbose_name='Время создания',
        auto_now_add=True,
    )

    updated_on = models.DateTimeField(
        verbose_name='Время последнего изменения',
        auto_now=True,
    )

    is_active = models.BooleanField(
        verbose_name='Заметка активна',
        default=True,
    )

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
        ordering = ['-created_on']

    def __str__(self):
        return f'замета от {self.created_on}'
