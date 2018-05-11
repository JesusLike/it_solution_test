from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from django.core import serializers
from .models import CreditOperation, InterestFlow
import json
from datetime import datetime, timedelta
from decimal import *

class IndexView(generic.TemplateView):
	template_name = "credit_calc/index.html"

def calculate(request):
	def is_year_leap(year):
		return 1 if year % 400 == 0 else (0 if year % 100 == 0 else (1 if year % 4 == 0 else 0))

	def days_in_month(current_date):
		days_in_month = [0, 31, 28 + is_year_leap(current_date.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		return days_in_month[current_date.month]
	
	data = json.loads(request.body.decode("utf-8"))
	credit_operations = []
	for row in data["creditData"]:
		#print(row[2]["data"] == "")
		credit_operations.append(CreditOperation(datetime.strptime(row[0]["data"], "%d.%m.%Y"), 
			0 if row[1]["data"] == "" else float(row[1]["data"]), 
			0 if row[2]["data"] == "" else float(row[2]["data"])))
	interest_rate = float(data["interestRate"]) / 100
	interest_date = int(data["interestDate"])
	interest_flow = []
	
	it = 0
	current_flow_sum = 0
	current_date = credit_operations[0].date 
	current_debt = 0
	while current_date <= credit_operations[-1].date:
		print(str(current_date) + ": " + str(current_debt * interest_rate / 365) + "/" + str(current_flow_sum))
		current_flow_sum += current_debt * interest_rate / (365 + is_year_leap(current_date.year))
		if current_date == credit_operations[it].date:
			current_debt += credit_operations[it].deposit - credit_operations[it].repayment
			it += 1
		if (current_date.day == interest_date or
			(current_date.day == days_in_month(current_date) and interest_date > current_date.day) or
			(current_date == credit_operations[-1].date and current_flow_sum != 0)):
			interest_flow.append(InterestFlow(current_date, current_flow_sum))
			print(interest_flow[-1].flow)
			current_flow_sum = 0
		current_date += timedelta(days=1)
	return HttpResponse(serializers.serialize('json', interest_flow))




# Create your views here.
