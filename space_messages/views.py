from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.core import serializers
from .models import Message

class IndexView(generic.ListView):
	template_name = "index.html"

	def get_queryset(self):
		return Message.objects.filter(is_read=False).order_by('-date')

def mark_read(request):
	try:
		message = Message.objects.get(pk=request.GET['id'])
	except (KeyError, Message.DoesNotExist):
		return HttpResponse("This message does not exist.")
	else:
		message.is_read = True
		message.save()
		return HttpResponseRedirect(reverse('space_messages:index'))
	

def get_messages(request):
	return HttpResponse(serializers.serialize('json', 
		Message.objects.filter(pk__gt=request.GET['last_id'], is_read=False).order_by('-date')))





