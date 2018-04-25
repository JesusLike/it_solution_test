from django.urls import path
from . import views

app_name = 'space_messages'
urlpatterns = [
	path('', views.IndexView.as_view(), name='index'),
	path('api/mark_read', views.mark_read, name='mark_read'),
	path('api/get_messages', views.get_messages, name='get_messages'),
]