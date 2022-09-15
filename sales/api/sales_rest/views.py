from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from common.json import ModelEncoder

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin","import_href","is_sold"]
    

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name","employee_number","id"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name","address","phone_number","id"]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = ["sales_person", "customer", "automobile", "price","id"]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create sales person"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        try:
            saleperson = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                saleperson,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        content = json.loads(request.body)
        try:
            salesperson = SalesPerson.objects.get(id=pk)

            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)

            props = ["name","address","phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_salesrecords(request):
    if request.method == "GET":
        salesrecords = SalesRecord.objects.all()
        return JsonResponse(
            {"salesrecords": salesrecords},
            encoder=SalesRecordEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            if True:
                automobile_href = content["automobile"]
                automobile = AutomobileVO.objects.get(import_href=automobile_href)
                if automobile.is_sold == False:
                    automobile.is_sold = True
                    automobile.save()
                    content["automobile"] = automobile

                    sales_person_name = content["sales_person"]
                    sales_person = SalesPerson.objects.get(name=sales_person_name)
                    content["sales_person"] = sales_person

                    customer_name = content["customer"]
                    customer = Customer.objects.get(name=customer_name)
                    content["customer"] = customer

                    salesrecord = SalesRecord.objects.create(**content)
                    return JsonResponse(
                        salesrecord,
                        encoder=SalesRecordEncoder,
                        safe=False,
                    )
                else:
                    response = JsonResponse(
                    {"message": "Already sold"}
                )
                response.status_code = 400
                return response
                
        except:
            response = JsonResponse(
                {"message": "Could not create sales record"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salesrecord(request, pk):
    if request.method == "GET":
        try:
            salesrecord = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesrecord = SalesRecord.objects.get(id=pk)
            salesrecord.delete()
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            salesrecord = SalesRecord.objects.get(id=pk)

            sales_person_name = content["sales_person"]
            sales_person = SalesPerson.objects.get(name=sales_person_name)
            content["sales_person"] = sales_person

            automobile_id = content["automobile"]
            automobile = AutomobileVO.objects.get(id=automobile_id)
            content["automobile"] = automobile

            customer_name = content["customer"]
            customer = Customer.objects.get(name=customer_name)
            content["customer"] = customer

            props = ["sales_person", "customer", "automobile", "price"]
            for prop in props:
                if prop in content:
                    setattr(salesrecord, prop, content[prop])
            salesrecord.save()
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
