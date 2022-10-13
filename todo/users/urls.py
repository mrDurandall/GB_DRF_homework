from django.urls import path
from .views import UserModelViewSet


app_name = 'users'
urlpatterns = [
    path('', UserModelViewSet.as_view({'get': 'list'}))
]
