import React from "react";

class SaleRecordForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sales_person: "",
            sales_persons: [],
            customer: "",
            customers: [],
            automobile: "",
            automobiles: [],
            price: "",

        };
        this.handleSalesPersonChange = this.handleNameChange.bind(this);
        this.handleCustomerChange = this.handleStartsChange.bind(this); 
        this.handleAutomobileChange = this.handleEndsChange.bind(this);
        this.handlePriceChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
    }

    handleSalesPersonChange(event){
        const value = event.target.value;
        this.setState({sales_person: value})
    }

    handleCustomerChange(event){
        const value = event.target.value;
        this.setState({customer: value})
    }

    handleAutomobileChange(event){
        const value = event.target.value;
        this.setState({automobile: value})
    }

    handlePriceChange(event){
        const value = event.target.value;
        this.setState({price: value})
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        delete data.sales_persons;
        delete data.customers;
        delete data.automobiles;
        console.log(data); 

        const salespersonUrl = "http://localhost:8090/api/salespersons/";
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const customerUrl = "http://localhost:8090/api/customers/";

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salespersonUrl, automobileUrl, customerUrl, fetchConfig);
        if (response.ok) {
    
            this.setState({
                person_name: '',
                customer: '',
                automobile: '',
                price: '',
              });
        }

    }

    // async componentDidMount() {
    //     const url = "http://localhost:8000/api/locations/";
        
    //     const response = await fetch(url);

    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState({locations: data.locations}); 
    //     }
    // }

    render(){
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new conference</h1>
                        <form onSubmit={this.handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={this.state.name} className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleStartsChange} placeholder="Starts" required type="date" name="starts" id="starts" value={this.state.starts} className="form-control" />
                                <label htmlFor="starts">Starts</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEndsChange} placeholder="Ends" required type="date" name="ends" id="ends" value={this.state.ends} className="form-control" />
                                <label htmlFor="ends">Ends</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Description" className="form-label">Description</label>
                                <textarea onChange={this.handleDescriptionChange} className="form-control" id="description" value={this.state.description} rows="3"></textarea>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxPresentationsChange} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" value={this.state.maxPresentations} className="form-control" />
                                <label htmlFor="max_presentations">Maximum presentations</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleMaxAttendeesChange} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" value={this.state.maxAttendees} className="form-control" />
                                <label htmlFor="max_attendees">Maximum attendees</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleLocationChange} name="location" required id="location" value={this.state.location} className="form-select">
                                    <option value="">Choose a location</option>
                                    {this.state.locations.map(location => {
                                        return(
                                            <option key={location.id} value= {location.id}>
                                                {location.name}
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

export default SaleRecordForm; 

