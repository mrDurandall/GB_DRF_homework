from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from .models import Project, ToDo
from .serializers import ProjectSerializer, ToDoSerializer


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
