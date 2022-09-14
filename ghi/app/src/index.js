import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadData() {
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const modelResponse = await fetch('http://localhost:8100/api/models/');
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
  const appointmentResponse = await fetch('http://localhost:8080/api/appointments/');
  if (manufacturerResponse.ok && modelResponse.ok && automobileResponse.ok) {
    const manufacturerData = await manufacturerResponse.json();
    const modelData = await modelResponse.json();
    const automobileData = await automobileResponse.json();
    const appointmentData = await appointmentResponse.json();
    root.render(
      <React.StrictMode>
        <App manufacturers={manufacturerData.manufacturers} models={modelData.models} autos={automobileData.autos} appointments={appointmentData.appointments} />
      </React.StrictMode>
    );
  } else {
    console.error(manufacturerResponse);
    console.error(modelResponse);
    console.error(automobileResponse);
    console.error(appointmentResponse);
  }
}

loadData();