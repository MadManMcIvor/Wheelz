import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './Manufacturers'
import ManufacturerForm from './ManufacturerForm'
import VechicleModelList from './VechicleModelList'
import ModelForm from './ModelForm'


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
            <Route path ="" element={<VechicleModelList models={props.models} />} />
            <Route path="new" element={<ModelForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
