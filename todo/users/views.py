from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (ListModelMixin,
                                   RetrieveModelMixin,
                                   UpdateModelMixin)

from .models import User
from .serializers import UserModelSerializer


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer

class UserModelViewSet(ListModelMixin,
                       RetrieveModelMixin,
                       UpdateModelMixin,
                       GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
