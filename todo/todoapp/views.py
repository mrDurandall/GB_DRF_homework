from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import (FilterSet,
                                           CharFilter,
                                           ModelChoiceFilter,
                                           DateFromToRangeFilter)

from .models import Project, ToDo
from .serializers import ProjectSerializer, ToDoSerializer


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectFilter(FilterSet):
    title = CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['title']


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter


class ToDoPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoFilter(FilterSet):
    project = ModelChoiceFilter(queryset=Project.objects.all())
    created_on = DateFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'created_on']


class ToDoModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = ToDoPagination
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
