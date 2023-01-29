import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'

import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './Inventory/Manufacturers'
import ManufacturerForm from './Inventory/ManufacturerForm';
import AutoList from './Inventory/Autos';
import AutoForm from './Inventory/AutoForm';
import VehicleModelList from './Service/VehicleModelList'
import ModelForm from './Inventory/ModelForm'
import CreateSalesPersonForm from './Sales/CreateSalesPersonForm';
import CreateCustomerForm from './Inventory/CustomerForm';
import TechnicianForm from './Service/TechnicianForm';
import AppointmentForm from './Service/AppointmentForm';
import AppointmentList from './Service/AppointmentList';
import ServiceHistory from './Service/ServiceHistory';
import SalesList from './Sales/SalesList';
import SaleRecordForm from './Sales/SaleRecordForm';
import SalesPersonSales from './Sales/SalesPersonSales';

function App(props) {
  const [manufacturers, setManufacturers] = useState([])
  const [models, setModels] = useState([])
  const [automobiles, setAutomobiles] = useState([])
  const [automobileVOs, setAutomobileVOs] = useState([])
  const [appointments, setAppointments] = useState([])
  const [salesRecords, setSalesRecords] = useState([])
  const [customers, setCustomers] = useState([])
  const [technicians, setTechnicians] = useState([])
  const [salespersons, setSalespersons] = useState([])

  const getManufacturers = async () => {
    axios.get(`${process.env.REACT_APP_INVENTORY_API}/api/manufacturers/`).then((response) => {setManufacturers(response.data.manufacturers)})
  }

  const getModels = async () => {
    axios.get(`${process.env.REACT_APP_INVENTORY_API}/api/models/`).then((response) => {setModels(response.data.models)})
  }

  const getAutomobiles= async () => {
    axios.get(`${process.env.REACT_APP_INVENTORY_API}/api/automobiles/`).then((response) => {setAutomobiles(response.data.autos)})
  }
  
  const getAutomobileVOs= async () => {
    axios.get(`${process.env.REACT_APP_SALES_API}/api/cars/`).then((response) => {setAutomobileVOs(response.data.cars)})
  }

  const getTechnicians = async () => {
    axios.get(`${process.env.REACT_APP_SERVICE_API}/api/technicians/`).then((response) => {setTechnicians(response.data.technicians)})
  }

  const getAppointments = async () => {
    axios.get(`${process.env.REACT_APP_SERVICE_API}/api/appointments/`).then((response) => {setAppointments(response.data.appointments)})
  }

  const getCustomers = async () => {
    axios.get(`${process.env.REACT_APP_SALES_API}/api/customers/`).then((response) => {setCustomers(response.data.customers)})
  }

  const getSalesPersons = async () => {
    axios.get(`${process.env.REACT_APP_SALES_API}/api/salespersons/`).then((response) => {setSalespersons(response.data.salespersons)})
  }

  const getSalesRecords = async () => {
    axios.get(`${process.env.REACT_APP_SALES_API}/api/salesrecords/`).then((response) => {setSalesRecords(response.data.salesrecords)})
  }

  useEffect(() => {
    getManufacturers();
    getModels();
    getAutomobiles();
    getAutomobileVOs();
    getTechnicians();
    getAppointments();
    getCustomers();
    getSalesPersons();
    getSalesRecords();
  },[])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" >
            <Route path="" element={<ManufacturerList manufacturers={manufacturers}/>} />
            <Route path="new" element={<ManufacturerForm getManufacturers={getManufacturers}/>} />
          </Route>
          <Route path="models" >
            <Route path ="" element={<VehicleModelList models={models}/>} />
            <Route path="new" element={<ModelForm manufacturers={manufacturers} getModels={getModels}/>} />
          </Route>
          <Route path="automobiles" >
            <Route path="" element={<AutoList automobiles={automobiles}/>} />
            <Route path="new" element={<AutoForm models={models} getAutomobiles={getAutomobiles} />} />
          </Route>
          <Route path="salesperson" element={<CreateSalesPersonForm getSalesPersons={getSalesPersons}/>} />
          <Route path="customer" element={<CreateCustomerForm getCustomers={getCustomers}/>} />
          <Route path="technicians" >
            <Route path="new" element={<TechnicianForm getTechnicians={getTechnicians}/>} />
          </Route>
          <Route path="appointments" >
            <Route path="" element={<AppointmentList appointments={appointments} setAppointments={setAppointments} getAppointments={getAppointments}/>} />
            <Route path="new" element={<AppointmentForm getAppointments={getAppointments} technicians={technicians}/>} />
            <Route path="history" element={<ServiceHistory  appointments={appointments}/>} />
          </Route>
          <Route path="salesrecords" >
            <Route path="" element={<SalesList salesRecords={salesRecords}/>} />
            <Route path="new" element={<SaleRecordForm customers={customers} salespersons={salespersons} automobileVOs={automobileVOs} getSalesRecords={getSalesRecords} getAutomobileVOs={getAutomobileVOs}/>}  />
            <Route path="salesperson" element={<SalesPersonSales/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
