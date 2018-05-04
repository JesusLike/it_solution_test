from django.db import models

class CreditOperation(models.Model):
	date = models.DateTimeField()
	repayment = models.DecimalField(max_digits=10, decimal_places=2)
	deposit = models.DecimalField(max_digits=10, decimal_places=2)

# Create your models here.
