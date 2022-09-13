from django.contrib import admin
from .models import AutomobileVO, Appointment

# Register your models here.
@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass

