from django.urls import path
from . import views

app_name = "credit_calc"
urlpatterns = [
	path('', views.IndexView.as_view(), name="index"),
	path('api/calculate', views.calculate, name="calculate")
]