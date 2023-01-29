import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";


const AppointmentList = ({appointments, setAppointments, getAppointments}) => {
  
  async function deleteAppointment(appointment) {
    const deleteUrl = `http://localhost:8080/api/appointments/${appointment.id}/`;
    const fetchConfig = {
        method: "delete"
    }
    const response = await fetch(deleteUrl, fetchConfig);
    if (response.ok) {
      getAppointments();
    }
  }

  async function markComplete(appointment) {
    const url = `http://localhost:8080/api/appointments/${appointment.id}/`;
    const fetchConfig = {
      method: 'put',
      body: JSON.stringify({completed: true}),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      getAppointments();
    }
  }

  function filterCompleted(appointments) {
    return appointments.filter(appointment => appointment.completed === false);
    }

  return (
    <div className="container">
      <div className="text-center fs-1 p-3" >Upcoming Appointments</div>
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
          {filterCompleted(appointments)?.map(appointment => {
              let date = formatDate(appointment.scheduled);
              let time = formatTime(appointment.scheduled);
              return (
              <tr key={'appointmentlist item' + appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.customer_name }</td>
                  <td>{ date }</td>
                  <td>{ time }</td>
                  <td>{ appointment.technician.name }</td>
                  <td>{ appointment.reason_for_service }</td>
                  <td>{ appointment.vip.toString() }</td>
                  <td><button className="btn btn-danger" onClick={event => deleteAppointment(appointment)}>Delete</button></td>
                  <td><button className="btn btn-success" onClick={event => markComplete(appointment)}>Complete</button></td>
              </tr>
              );
          })}
          </tbody>
      </table>
    </div>
    );
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