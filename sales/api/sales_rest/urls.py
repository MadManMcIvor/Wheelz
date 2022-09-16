from django.urls import path

from .views import api_list_salespersons, api_show_salesperson 
from .views import api_list_customers, api_show_customer
from .views import api_list_salesrecords, api_show_salesrecord
from .views import api_list_automobiles

urlpatterns = [
    path("salespersons/", api_list_salespersons, name="api_list_salespersons"),
    path("salespersons/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("salesrecords/", api_list_salesrecords, name="api_list_salesrecords"),
    path("salesrecords/<int:pk>/", api_show_salesrecord, name="api_show_salesrecord"),
    path("cars/", api_list_automobiles, name="api_list_automobiles"),
]

