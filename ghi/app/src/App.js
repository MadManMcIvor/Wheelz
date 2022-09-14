import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './Manufacturers'
import ManufacturerForm from './ManufacturerForm';
import AutoList from './Autos';
import AutoForm from './AutoForm';
import VehicleModelList from './VehicleModelList'
import ModelForm from './ModelForm'
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" >
            <Route path="" element={<ManufacturerList manufacturers={props.manufacturers}/>} />
            <Route path="new" element={<ManufacturerForm/>} />
          </Route>
          <Route path="models" >
            <Route path ="" element={<VehicleModelList models={props.models} />} />
            <Route path="new" element={<ModelForm/>} />
          </Route>
          <Route path="automobiles" >
            <Route path="" element={<AutoList autos={props.autos}/>} />
            <Route path="new" element={<AutoForm/>} />
          </Route>
          <Route path="technicians" >
            <Route path="new" element={<TechnicianForm/>} />
          </Route>
          <Route path="appointments" >
            <Route path="list" element={<AppointmentList appointments={props.appointments}/>} />
            <Route path="new" element={<AppointmentForm/>} />
            <Route path="history" element={<ServiceHistory  appointments={props.appointments}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
