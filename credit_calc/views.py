from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic

class IndexView(generic.TemplateView):
	template_name = "credit_calc/index.html"

# Create your views here.
