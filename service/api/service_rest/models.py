from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100, unique=True)
    import_href = models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    name = models.CharField(max_length=255)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return f"{self.name}"

    # def get_api_url(self):
    #     return reverse("api_list_hats", kwargs={"pk": self.pk})


class Appointment(models.Model):
    vin = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=255)
    scheduled = models.DateTimeField()
    reason_for_service = models.CharField(max_length=255)
    technician = models.ForeignKey( 
        Technician,
        related_name="appointments",
        on_delete=models.SET_NULL,
        null=True, 
        blank=False
    )
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer_name} at {self.scheduled}"

    # def get_api_url(self):
    #     return reverse("api_list_hats", kwargs={"pk": self.pk})