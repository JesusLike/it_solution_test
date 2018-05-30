from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.views import generic
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.clickjacking import xframe_options_exempt
from django.utils.decorators import method_decorator

import json
import requests

@csrf_exempt
@xframe_options_exempt
def index(request):
    return render(request, "bitrix_duplicate/index.html", {"auth_id" : request.POST["AUTH_ID"]})

@csrf_exempt
def find_duplicates(request):
    api_request = requests.post("https://b24-lc1bfn.bitrix24.ru/rest/crm.company.list",
        data={
            "auth" : request
            })
    if api_request.status_code == 200:
        company_titles = list(map(lambda x: x["TITLE"], json.loads(api_request.text)["result"]))
        duplicates = []
        for i in range(len(company_titles)):
            if (company_titles[i] in company_titles[:i]) and not (company_titles[i] in duplicates):
                duplicates.append(company_titles[i])
        output = ""
        for company in duplicates:
            output += company + "<br>"
        return HttpResponse(output)
    else:
        return HttpResponse(api_request.reason)
