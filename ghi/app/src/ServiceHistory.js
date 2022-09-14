import React, { useState} from 'react'

function ServiceHistory(props) {
    const [search, setSearch] = useState({vin: ''});
    
    const handleChange = (event) => {
        setSearch({ ...search, [event.target.name]: event.target.value });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch({vin: " "})
      };
    
    const searchVIN = search["vin"]
    const filteredProps =  filterProps(props, searchVIN);
 
    return (
      <div className="container">
        <div onSubmit={ handleSubmit }>
            <form>
            <div className="form-floating mb-3">
                <input onChange={handleChange} placeholder="enter VIN" required type="text" name="vin" id="vin" className="form-control" value={search.vin} />
                <label htmlFor="vin">Enter VIN</label>
            </div>
                <button className="btn btn-primary">Search</button>
            </form>
        </div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-end m-4">
        </div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>VIN</th>
                <th>Customer Name</th>
                <th>Scheduled</th>
                <th>Technician</th>
                <th>Reason for Service</th>
                <th>VIP?</th>
            </tr>
            </thead>
            <tbody>
            {filteredProps.appointments.map(appointment => {
                return (
                <>
                <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.customer_name }</td>
                    <td>{ appointment.scheduled }</td>
                    <td>{ appointment.technician.name }</td>
                    <td>{ appointment.reason_for_service }</td>
                    <td>{ appointment.vip.toString() }</td>
                </tr>
                </>
                );
            })}
            </tbody>
        </table>
      </div>
    );
  }

//This filters appointments by VIN
function filterProps(props, vin) {
    let result = {appointments: []};
    for (let appointment of props.appointments) {
        if (appointment.vin === vin) {
            result.appointments.push(appointment)
        }
    }
    return result
  }

  export default ServiceHistory;