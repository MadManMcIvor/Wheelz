import React from 'react';

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: '',
      customer_name: '',
      scheduled: '',
      reason_for_service: '',
      technicians: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVINChange = this.handleVINChange.bind(this);
    this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
    this.handleScheduledChange = this.handleScheduledChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleTechnicianChange = this.handleTechnicianChange.bind(this);

  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.technicians;
    console.log(data);
    const appointmentUrl = 'http://localhost:8080/api/appointments/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const attendeeResponse = await fetch(appointmentUrl, fetchOptions);
    if (attendeeResponse.ok) {
      this.setState({
        vin: '',
        customer_name: '',
        scheduled: '',
        reason_for_service: '',
        technician: '',
      });
    }
  }

    handleVINChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
        }

    handleCustomerNameChange(event) {
        const value = event.target.value;
        this.setState({ customer_name: value });
        }

    handleScheduledChange(event) {
        const value = event.target.value;
        this.setState({ scheduled: value });
        }

    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({ reason_for_service: value });
        }

    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({ technician: value });
        }

  render() {
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Hat!</h1>
            <form onSubmit={this.handleSubmit} id="create-appointment-form">
              
              <div className="form-floating mb-3">
                <input onChange={this.handleVINChange} value={this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleCustomerNameChange} value={this.state.customer_name} placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control"/>
                <label htmlFor="customer_name">Customer Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleScheduledChange} value={this.state.scheduled} placeholder="Schedule" required type="datetime-local" name="scheduled" id="scheduled" className="form-control"/>
                <label htmlFor="scheduled">Scheduled</label>
              </div>
              
              <div className="form-floating mb-3">
                <input onChange={this.handleReasonChange} value={this.state.reason_for_service} placeholder="Reason for Service" required type="text" name="reason_for_service" id="reason_for_service" className="form-control"/>
                <label htmlFor="reason_for_service">Reason for Service</label>
              </div>

              <div className="mb-3">
                <select onChange={this.handleTechnicianChange} value={this.state.technician} required name="technician" id="technician" className="form-select">
                  <option value="">Choose a Technician</option>
                  {this.state.technicians.map(technician => {
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
  }

export default AppointmentForm;