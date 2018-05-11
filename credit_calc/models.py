from django.db import models

class CreditOperation(models.Model):
	date = models.DateField()
	repayment = models.DecimalField(max_digits=10, decimal_places=2)
	deposit = models.DecimalField(max_digits=10, decimal_places=2)

	def __init__(self, date, deposit, repayment, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.date = date
		self.repayment = repayment
		self.deposit = deposit

class InterestFlow(models.Model):
	date = models.DateField()
	flow = models.DecimalField(max_digits=10, decimal_places=2)

	def __init__(self, date, flow, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.date = date
		self.flow = flow

# Create your models here.
