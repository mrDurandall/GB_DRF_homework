from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (ListModelMixin,
                                   RetrieveModelMixin,
                                   UpdateModelMixin)

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer

class UserModelViewSet(ListModelMixin,
                       RetrieveModelMixin,
                       UpdateModelMixin,
                       GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerV2
        return UserModelSerializer
