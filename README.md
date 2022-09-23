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
- The appointments list page will will filter out any already completed appointments and also show if the car had been sold by us as indicated with the VIP section.
- Search for past Services by VIN
- Create sales person
- Create potential customers
- Create a sales record and list all sales
- Select a sales person from a drop down list and view detail of their sales


**Context Map**
![context map of the application](/readme_images/CarCar_ContextMap.png)


## How to Use

**Setup**
- Clone the repo: ` git clone https://gitlab.com/MadManMcIvor/project-beta.git `
- Fire up your Docker desktop app
- From the terminal inside the project directory run: `docker volume create beta-data`
- Then run: `docker-compose build`
- Then run: `docker-compose up`
- **Very Important!** Wait until all the servers are running. In your console, you should see: ![screenshot of the react server running](/readme_images/Screenshot.png) This may take a while (think 5 minutes or longer) on the first time. It won't show anything out of the ordinary in the terminal - like it's working on something - so please be patient. If you're still having issues with viewing the page kill the servers with `control` + `c` and then restart them. 
- access the website at `localhost:3000`

**Creating Data**
To start testing the website with some data, just go from left to right on the NavBar:
- Click on the Manufacturer tab in the NavBar, select the create on the drop down, and make a new manufacturer.
- Then do the same for Vehicle Model
- Then do the same for Automobile (to test if the vip section works make sure to use the same VIN number you used to create the automobile you entered)
- Then do the same for Technician
- Then do the same for Appointment
- Then do the same for Salesperson
- Then do the same for Potential Customer
- Then do the same for Sales Record


**Navigating the Website**
- Links are either at the top NavBar or in the relevant page (e.g. you'll add a manufacturer from the the button on the manufacturers list page). There are dropdown menus for the manufacturers, vehicle models, automobiles, appointments, and sales record on the NavBar. 
  
**Appointments**
- Already completed appointments won't show up in the appointments list.
- Mark appointments complete using the button on the entry 
- View all appointments for a certain vehicle (completed and uncompleted) by searching via VIN in the Service History Tab

## Service microservice - Alex McIvor

![context map of the application](/readme_images/Service_models.png)


For my service - microservice, I used the poller to poll the automobile API from the inventory and then update/create and instance of an AutomobileVO on the Service - microservice. 

I created models for Automobile VO, Technicians, and Appointments. Technicians and Appointments both had full RESTful APIs (List, Details, Delete, Update, Create). Automobiles only has create and list, as the others weren't necessary at this point in time.

I used a combo of both functional and class components to get experience using both. 

If I was continuing on with this project, I'd likely create a customer model that would integrate with sales microservice.


## Sales microservice - Julie Liao

![context map of the application](/readme_images/Sales_models.png)

The sales microservice poll automobiles data from the inventory, which allows users to use, create, and update instance of AutomobileVO. 

I decided to create AutomobileVO, sales person, customer, and sales record models. For the AutomobileVO, I decided to include is_sold as an instance of AutomobileVO to check status of the car. I created an api list view for the AutomobileVO so users can see whether car is sold. The api view also includes the list, create, update, and delete for sales person, customer, and sales record. I set the sales_person, customer, and automobile to null on delete for the sales record model so the data will still be in the sales history, if the customer no longer a customer or sales person decides to leave the company or the company decides to delete the car from the catalog. 

When creating sales record in Insomnia API client, input {"sales_person": "name of sales person", "customer": "customer name", "automobile": "href of automobile", "price": "price of car"}. If users try to buy the same car by inputting the same automobile href, the console will return "Already sold". When creating new sales record in localhost:3000, refresh page after making one sales record if planning to make another sales record so page can reload with the updated available car to buy.  