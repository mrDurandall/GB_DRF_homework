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
        self.project_data = {
            'title': 'Test project',
            'repo_link': 'http://testrepos.com/',
            'users': []
        }
        self.project_data_new = {
            'title': 'New Test project',
            'repo_link': 'http://testrepos.com/new',
            'users': []
        }
        self.project = Project.objects.create(
            title=self.project_data['title'],
            repo_link=self.project_data['repo_link']
        )
        self.admin = User.objects.create_superuser(self.login, self.email, self.password)

    def test_get_projects_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthorized_create_project(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project_data, self.format)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_authorized_create_project(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project_data, self.format)
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_project_detail(self):
        client = APIClient()
        response = client.get(f'{self.url}/{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthorized_update_project(self):
        client = APIClient()
        response = client.put(
            f'{self.url}/{self.project.id}/',
            self.project_data_new,
            format=self.format,
        )
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_authorized_update_project(self):
        client = APIClient()
        client.login(username=self.login, password=self.password)
        response = client.put(
            f'{self.url}/{self.project.id}/',
            self.project_data_new,
            format=self.format,
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )
        self.project.refresh_from_db()
        self.assertEqual(self.project.title, self.project_data_new.get('title'))
        self.assertEqual(self.project.repo_link, self.project_data_new.get('repo_link'))
        client.logout()
