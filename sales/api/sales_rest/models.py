from django.db import models

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    is_sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.import_href} {self.id}" 

class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.name

class SalesRecord(models.Model):
    sales_person = models.ForeignKey(SalesPerson, related_name= "sales", on_delete=models.SET_NULL, null=True, blank=False)
    customer = models.ForeignKey(Customer, related_name="sales", on_delete=models.SET_NULL, null=True, blank=False)
    automobile = models.ForeignKey(AutomobileVO, related_name="sales", on_delete=models.SET_NULL, null=True, blank=False)
    price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.sales_person} {self.customer} {self.automobile}"