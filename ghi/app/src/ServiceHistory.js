import {useEffect, useState} from 'react'

function ServiceHistory({appointments}) {
    const [search, setSearch] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState(appointments)

    const handleChange = (e) => {
        setSearch(e.target.value);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilteredAppointments(filterByVIN(appointments, search))
      };
    
    function filterByVIN(appointments, search) {
        const result = appointments.filter(appointment => appointment.vin === search);
        return result.length ? result : appointments
        }


    useEffect(() => {
      setFilteredAppointments(appointments);
      },[appointments])

    return (
      <div className="container">
        <div>
            <form onSubmit={ handleSubmit }>
            <div className="form-floating mb-3">
                <input onChange={handleChange} placeholder="enter VIN" required type="text" name="vin" id="vin" className="form-control" value={search} />
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
            {filteredAppointments?.map(appointment => {
                return (
                <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.customer_name }</td>
                    <td>{ appointment.scheduled }</td>
                    <td>{ appointment.technician.name }</td>
                    <td>{ appointment.reason_for_service }</td>
                    <td>{ appointment.vip.toString() }</td>
                </tr>
                );
            })}
            </tbody>
        </table>
      </div>
    );
  }


  export default ServiceHistory;