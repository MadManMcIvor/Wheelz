import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";


const AppointmentList = () => {
  
  const [state, setState] = useState({
    appointments:[],
  });
 
  useEffect(() => {
    const url = 'http://localhost:8080/api/appointments/';
    (async () => {
      const response = await fetch(url)  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const filteredData = filterCompleted(data);
        console.log(filteredData);
        setState({...state, appointments: filteredData.appointments})
      } else {
        setState({...state, appointments: []})
      }
    }
    )();
  
  }, []);
  
  
  async function deleteAppointment(event, appointment) {
    const deleteUrl = `http://localhost:8080/api/appointments/${appointment.id}/`;
    const fetchConfig = {
        method: "delete"
    }
    await fetch(deleteUrl, fetchConfig)
    const index = state.appointments.indexOf(appointment)
    const updated_appointments = [...state.appointments]
    console.log(updated_appointments)
    updated_appointments.splice(index, 1)
    console.log(updated_appointments)
    setState({...state, appointments: updated_appointments})
  }

  async function markComplete(event, appointment) {
    const url = `http://localhost:8080/api/appointments/${appointment.id}/`;
    const fetchConfig = {
      method: 'put',
      body: JSON.stringify({completed: true}),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await fetch(url, fetchConfig)
    const index = state.appointments.indexOf(appointment)
    const updated_appointments = [...state.appointments]
    console.log(updated_appointments)
    updated_appointments.splice(index, 1)
    console.log(updated_appointments)
    setState({...state, appointments: updated_appointments})
  }

  return (
    <div className="container">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-end m-4">
            <Link to="/appointments/new" className="btn btn-primary btn-lg px-4 gap-3">Make an Appointment!</Link>
      </div>
      <table className="table table-striped">
          <thead>
          <tr>
              <th>VIN</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason for Service</th>
              <th>VIP?</th>
          </tr>
          </thead>
          <tbody>
          {state.appointments?.map(appointment => {
              let date = formatDate(appointment.scheduled);
              let time = formatTime(appointment.scheduled);
              return (
              <>
              <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.customer_name }</td>
                  <td>{ date }</td>
                  <td>{ time }</td>
                  <td>{ appointment.technician.name }</td>
                  <td>{ appointment.reason_for_service }</td>
                  <td>{ appointment.vip.toString() }</td>
                  <td><button className="btn btn-danger" onClick={event => deleteAppointment(event, appointment)}>Delete</button></td>
                  <td><button className="btn btn-success" onClick={event => markComplete(event, appointment)}>Complete</button></td>
              </tr>
              </>
              );
          })}
          </tbody>
      </table>
    </div>
    );
  }

   //This removes the completed appointments
   function filterCompleted(data) {
    let result = {appointments: []};
    for (let appointment of data.appointments) {
        if (appointment.completed === false) {
            result.appointments.push(appointment)
        }
    }
    return result
  }

//Needed to formate the singular UTC time into a more readable format.
function formatDate(dateString){
  let d = new Date(dateString);
  return ` ${(d.getMonth()+1)}/${d.getDate()}/${d.getFullYear()}`
}

//Needed to formate the singular UTC time into a more readable format.
function formatTime(dateString){
  let d = new Date(dateString);
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return `${strTime}`
}

  export default AppointmentList;