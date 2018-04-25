from django.db import models

class Message(models.Model):
	text = models.TextField()
	date = models.DateTimeField()
	is_read = models.BooleanField()

	def __str__(self):
		return self.text
# Create your models here.
