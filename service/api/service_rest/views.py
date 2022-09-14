from django.shortcuts import render
from common.json import ModelEncoder
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "reason_for_service",
        "technician",
        "scheduled",
        "completed",
        "vip",
    ]
    encoders =  {
        "technician": TechnicianEncoder()
    }
    

@require_http_methods(["GET", "POST"])
def api_technician_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, employee_number):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(employee_number=employee_number)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(employee_number=employee_number)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(employee_number=employee_number)

            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response



@require_http_methods(["GET", "POST"])
def api_automobileVO_list(request):
    if request.method == "GET":
        automobileVOs = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobileVOs": automobileVOs},
            encoder=AutomobileVOEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            automobileVO = AutomobileVO.objects.create(**content)
            return JsonResponse(
                automobileVO,
                encoder=AutomobileVOEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the automobileVO"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician_name = content["technician"]
            technician = Technician.objects.get(name=technician_name)
            content["technician"] = technician
            print(content["vin"])
            try:
                auto = AutomobileVO.objects.get(vin=content["vin"])
                if auto != AutomobileVO.DoesNotExist:
                    content["vip"] = True
            except AutomobileVO.DoesNotExist:
                pass
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=pk)
            technician_name = content["technician"]
            technician = Technician.objects.get(name=technician_name)
            content["technician"] = technician
        
            props = ["vin", "customer_number", "scheduled", "reason_for_service", "technician", "completed"]
            for prop in props:
                if prop in content:
                    setattr(appointment, prop, content[prop])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
