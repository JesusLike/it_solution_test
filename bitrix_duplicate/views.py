from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.views import generic

import json

def index(request):
	return HttpResponse(request.body);

def find_duplicates(request):
	auth_data = json.loads(request.body.decode("utf-8"))
	return HttpResponse(request.body);
