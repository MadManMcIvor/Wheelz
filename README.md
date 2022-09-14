# CarCar

Team:

* Alex McIvor - Service Microservice
* Julie Liao - Sales Microservice

## Design

CarCar is a webapp designed to track a car dealership with services for it's inventory, sales, and service. Each service is broken out into it's own microservice, implementing RESTful APIs to communicate with one another. The project is containerize with Docker.

It's built on a Django backend, React frontend, and uses a PostgreSQL database.

**Features**
- Create & List Manufacturers
- Create & List Vehicle Models
- Create & List Automobiles in the Inventory
- Create Technicians
- Create, List, Delete, and mark as complete Appointments
- Search for past Services by VIN


**Context Map**
![context map of the application](/readme_images/CarCar_ContextMap.png)


## How to Use

**Setup**
- Clone the repo: ` git clone https://gitlab.com/MadManMcIvor/project-beta.git `
- Fire up your Docker desktop app
- from the terminal inside the project directory run: `docker volume create pgdata`
- then run: `docker-compose build`
- then run: `docker-compose up`
- access the website at `localhost:3000`

**Creating Data**
- Click on the Manufacturer tab in the NavBar
- Click the blue Add a manufacturer button 
- Fill out the form and hit submit.
- repeat for Vehicle Model, Automobiles, and Add Technician tabs
- for appointments, click on the tab and select make appointment
- Fill out the form and hit submit.

**Navigating the Website**
- Links are either at the top NavBar or in the relevant page (e.g. you'll add a manufacturer from the the button on the manufacturers list page)
  
**Appointments**
- Already completed appointments won't show up in the appointments list.
- Mark appointments complete using the button on the entry 
- View all appointments for a certain vehicle (completed and uncompleted) by searching via VIN in the Service History Tab

## Service microservice - Alex McIvor

![context map of the application](/readme_images/Service_models.png)


For my service - microservice, I used the poller to poll the automobile API from the inventory and then update/create and instance of an AutomobileVO on the Service - microservice. 

I created models for Automobile VO, Technicians, and Appointments. Technicians and Appointments both had full RESTful APIs (List, Details, Delete, Update, Create). Automobiles only has create and list, as the others weren't necessary at this point in time.

If I was continuing on with this project, I'd likely create a customer model that would integrate with sales microservice.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.


