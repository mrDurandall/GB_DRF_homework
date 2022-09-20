from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import PrimaryKeyRelatedField

from .models import Project, ToDo


class ProjectSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(ModelSerializer):
    project = PrimaryKeyRelatedField

    class Meta:
        model = ToDo
        fields = '__all__'
