from random import choice

from django.core.management.base import BaseCommand

from todoapp.models import Project
from todoapp.models import ToDo


class Command(BaseCommand):

    def handle(self, *args, **options):
        ToDo.objects.all().delete()
        projects = Project.objects.all()

        for todo_number in range(1, 6):
            todo = ToDo()
            todo.project = choice(projects)
            todo.text = f'Test text for ToDo №{todo_number} Lorem Ipsum'
            todo.save()
