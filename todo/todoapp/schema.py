import graphene
from graphene_django import DjangoObjectType

from .models import Project, ToDo
from users.models import User


class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):

    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):

    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):

    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    project_by_username = graphene.List(ProjectType, username=graphene.String(required=False))
    todo_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))
    todos_by_project = graphene.List(ToDoType, project_id=graphene.Int(required=True))

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_project_by_username(self, info, username=None):
        return Project.objects.filter(users__username=username)

    def resolve_todo_by_id(self, info, id):
        try:
            return ToDo.objects.get(id=id)
        except ToDo.DoesNotExist:
            return None

    def resolve_todos_by_project(self, info, project_id):
        try:
            return ToDo.objects.filter(project__id=project_id)
        except ToDo.DoesNotExist:
            return None


class ToDoMutation(graphene.Mutation):

    class Arguments:
        new_text = graphene.String(required=False)
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, new_text, id):
        todo = ToDo.objects.get(pk=id)
        todo.text = new_text
        todo.save()
        return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
