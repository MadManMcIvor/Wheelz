import React from 'react';

class CreateCustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address:'',
            phone_number: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);
        const customerUrl = "http://localhost:8090/api/customers/";
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const personResponse = await fetch(customerUrl, fetchOptions);
        console.log(personResponse);
        if (personResponse.ok) {
            this.setState({
                name: '',
                address: '',
                phone_number: '',
           });
        }
    }


    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleAddressChange(event){
        const value = event.target.value;
        this.setState({address: value})
    }
    

    handlePhoneNumberChange(event){
        const value = event.target.value;
        this.setState({phone_number: value})
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create new customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-new-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleAddressChange} value={this.state.address} placeholder="Address" required type="text" name="address" id="address" className="form-control"/>
                                <label htmlFor="name">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePhoneNumberChange} value={this.state.phone_number} placeholder="Phone Number" required type="number" name="phone_number" id="phone_number" className="form-control"/>
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
           
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
  }

export default CreateCustomerForm;