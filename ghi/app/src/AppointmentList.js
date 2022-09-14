import { Link } from 'react-router-dom';

function AppointmentList(props) {
    
    //This removes the completed appointments
    const filteredProps = filterProps(props);
  
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
            {filteredProps.appointments.map(appointment => {
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
                    <td><button type="button" className="btn btn-danger" onClick={() => deleteItem(appointment)}>delete</button> </td>
                    <td><button type="button" className="btn btn-success" onClick={() => completeItem(appointment)}>completed</button> </td>
                </tr>
                </>
                );
            })}
            </tbody>
        </table>
      </div>
    );
  }

//for the delete button
async function deleteItem(appointment, props) {
    const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/`;
    const fetchOptions = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    };
   await fetch(appointmentUrl, fetchOptions);
   window.location.reload(true);
  }

//for the complete button
  async function completeItem(appointment) {
    const appointmentUrl = `http://localhost:8080/api/appointments/${appointment.id}/`;
    const fetchOptions = {
      method: 'put',
      body: JSON.stringify({completed: true}),
      headers: {
        'Content-Type': 'application/json',
      },
    };
   await fetch(appointmentUrl, fetchOptions);
   window.location.reload(true);
  }

   //This removes the completed appointments
   function filterProps(props) {
    let result = {appointments: []};
    for (let appointment of props.appointments) {
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