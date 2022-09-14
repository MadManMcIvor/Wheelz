import React from 'react';

class CreateSalesPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employee_number: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);
        const salespersonUrl = "http://localhost:8090/api/salespersons/";
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const personResponse = await fetch(salespersonUrl, fetchOptions);
        console.log(personResponse);
        if (personResponse.ok) {
            this.setState({
                name: '',
                employee_number: '',
           });
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleEmployeeNumberChange(event){
        const value = event.target.value;
        this.setState({employee_number: value})
    }
    

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Sales Person</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-person-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEmployeeNumberChange} value={this.state.employee_number} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number" className="form-control"/>
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
           
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
  }

export default CreateSalesPersonForm;