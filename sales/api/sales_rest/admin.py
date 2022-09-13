from django.contrib import admin
from .models import AutomobileVO
from .models import SalesPerson
from .models import Customer
from .models import SalesRecord


# Register your models here.
@admin.register(AutomobileVO)
class AutomobileAdmin(admin.ModelAdmin):
    pass
@admin.register(SalesPerson)
class SalesPerson(admin.ModelAdmin):
    pass

@admin.register(Customer)
class Customer(admin.ModelAdmin):
    pass

@admin.register(SalesRecord)
class SalesRecord(admin.ModelAdmin):
    pass 