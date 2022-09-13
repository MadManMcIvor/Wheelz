import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './Manufacturers'
import ManufacturerForm from './ManufacturerForm';
import AutoList from './Autos';
import AutoForm from './AutoForm';

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
          <Route path="automobiles" >
            <Route path="" element={<AutoList autos={props.autos}/>} />
            <Route path="new" element={<AutoForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
