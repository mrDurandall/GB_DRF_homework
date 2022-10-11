import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import force_authenticate, APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer

from users.models import User
from .models import ToDo, Project
from .views import ProjectModelViewSet, ToDoModelViewSet


class TestProjectModelViewSet(TestCase):

    def setUp(self):
        self.url = '/api/projects'
        self.format = 'json'
        self.login = 'super'
        self.email = 'super@mail.com'
        self.password = 'qwaszx'
        self.project = {'title': 'Test project',
                        'repo_link': 'http://testrepos.com/',
                        'users': []}

    def test_get_projects_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthorized_create_project(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project, self.format)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_authorized_create_project(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project, self.format)
        admin = User.objects.create_superuser(self.login, self.email, self.password)
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
