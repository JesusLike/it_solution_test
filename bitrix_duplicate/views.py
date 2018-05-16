from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.views import generic
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.clickjacking import xframe_options_exempt

import json

@csrf_exempt
@xframe_options_exempt
def index(request):
	return HttpResponse("Hello world!");

def find_duplicates(request):
	auth_data = json.loads(request.body.decode("utf-8"))
	return HttpResponse(request.body);
