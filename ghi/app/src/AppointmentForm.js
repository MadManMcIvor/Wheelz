import {useState} from "react";

function AppointmentForm({technicians, getAppointments}) {
    const [vin, setVIN] = useState('');
    const [customer_name, setCustomerName] = useState('');
    const [scheduled, setScheduled] = useState('');
    const [reason_for_service, setReasonForService] = useState('');
    const [technician, setTechnician] = useState('');

  
    const handleVINChange = (e) => {
        const value = e.target.value;
        setVIN(value);
        }

    const handleCustomerNameChange = (e) => {
        const value = e.target.value;
        setCustomerName(value);
        }

    const handleScheduledChange = (e) => {
        const value = e.target.value;
        setScheduled(value);
        }

    const handleReasonChange = (e) => {
        const value = e.target.value;
        setReasonForService(value);
        }

    const handleTechnicianChange = (e) => {
        const value = e.target.value;
        setTechnician(value);
        }
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.vin = vin;
        data.customer_name = customer_name;
        data.scheduled = scheduled;
        data.reason_for_service = reason_for_service;
        data.technician = technician;
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchOptions = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(appointmentUrl, fetchOptions);
        if (response.ok) {
          const newAppointment = await response.json();
          console.log(newAppointment);
          setVIN('');
          setCustomerName('');
          setScheduled('');
          setReasonForService('');
          setTechnician('');
          getAppointments();
         }
        }
  
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Make an Appointment!</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
              
              <div className="form-floating mb-3">
                <input onChange={handleVINChange} value={vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCustomerNameChange} value={customer_name} placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control"/>
                <label htmlFor="customer_name">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleScheduledChange} value={scheduled} placeholder="Schedule" required type="datetime-local" name="scheduled" id="scheduled" className="form-control"/>
                <label htmlFor="scheduled">Scheduled</label>
              </div>
              
              <div className="form-floating mb-3">
                <input onChange={handleReasonChange} value={reason_for_service} placeholder="Reason for Service" required type="text" name="reason_for_service" id="reason_for_service" className="form-control"/>
                <label htmlFor="reason_for_service">Reason for Service</label>
              </div>

              <div className="mb-3">
                <select onChange={handleTechnicianChange} value={technician} required name="technician" id="technician" className="form-select">
                  <option value="">Choose a Technician</option>
                  {technicians.map(technician => {
                        return (
                            <option key={technician.employee_number} value={technician.name}>
                                {technician.name}
                            </option>
                        );
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>

          </div>
        </div>
      </div>
      );
    }

export default AppointmentForm;