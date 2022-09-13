from django.contrib import admin
from django.urls import path, include

from .views import (
    api_technician_list,
    api_show_technician,
    api_automobileVO_list,
    api_appointment_list,
    api_show_appointment,
)

urlpatterns = [
    path(
        "technicians/",
        api_technician_list,
        name="api_technician_list",
    ),
    path(
        "technicians/<int:employee_number>/",
        api_show_technician,
        name="api_show_technician",
    ),
    path(
        "appointments/",
        api_appointment_list,
        name="api_appointment_list",
    ),
    path(
        "appointments/<int:pk>/",
        api_show_appointment,
        name="api_show_appointment",
    ),
    path(
        "automobileVOs/",
        api_automobileVO_list,
        name="api_automobileVO_list",
    ),
]
