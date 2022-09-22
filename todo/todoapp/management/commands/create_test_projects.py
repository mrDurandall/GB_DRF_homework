from random import randint, choices

from django.core.management.base import BaseCommand

from todoapp.models import Project
from users.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        users = User.objects.all()
        Project.objects.all().delete()

        for project_number in range(3):
            number_of_users = randint(0, len(users))
            users_for_project = choices(users, k=number_of_users)
            project = Project()
            project.title = f'project{project_number}'
            project.repo_link = f'http://test_repos.com/{project_number}'
            project.save()
            for user in users_for_project:
                project.users.add(user)
