from django.urls import path
from . import views

app_name = "bitrix_duplicate"
urlpatterns = [
	path('', views.index, name="index"),
	path('api/find_duplicates', views.find_duplicates, name="find_duplicates")
]