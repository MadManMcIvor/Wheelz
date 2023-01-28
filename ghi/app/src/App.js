import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios'

import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './Manufacturers'
import ManufacturerForm from './ManufacturerForm';
import AutoList from './Autos';
import AutoForm from './AutoForm';
import VehicleModelList from './VehicleModelList'
import ModelForm from './ModelForm'
import CreateSalesPersonForm from './CreateSalesPersonForm';
import CreateCustomerForm from './CustomerForm';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
import SalesList from './SalesList';
import SaleRecordForm from './SaleRecordForm';
import SalesPersonSales from './SalesPersonSales';

function App(props) {
  const [manufacturers, setManufacturers] = useState([])
  const [models, setModels] = useState([])
  const [automobiles, setAutomobiles] = useState([])
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
            <Route path="new" element={<AutoForm/>} />
          </Route>
          <Route path="salesperson" element={<CreateSalesPersonForm />} />
          <Route path="customer" element={<CreateCustomerForm />} />
          <Route path="technicians" >
            <Route path="new" element={<TechnicianForm/>} />
          </Route>
          <Route path="appointments" >
            <Route path="" element={<AppointmentList/>} />
            <Route path="new" element={<AppointmentForm/>} />
            <Route path="history" element={<ServiceHistory  appointments={appointments}/>} />
          </Route>
          <Route path="salesrecords" >
            <Route path="" element={<SalesList salesRecords={salesRecords}/>} />
            <Route path="new" element={<SaleRecordForm />} />
            <Route path="salesperson" element={<SalesPersonSales/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
