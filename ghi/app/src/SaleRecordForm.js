import React from "react";

class SaleRecordForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sales_person_name: "",
            salespersons: [],
            customer_name: "",
            customers: [],
            automobile_href: "",
            automobiles: [],
            price: "",

        };
        this.handleSalesPersonNameChange = this.handleSalesPersonNameChange.bind(this);
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this); 
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
    }

    async componentDidMount() {
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const customerUrl = "http://localhost:8090/api/customers/";
        const salespersonUrl = "http://localhost:8090/api/salespersons/";
        const automobileResponse = await fetch(automobileUrl);
        const customerResponse = await fetch(customerUrl);
        const salespersonResponse = await fetch(salespersonUrl);
        if (automobileResponse.ok){
            const automobilesData = await automobileResponse.json();
            console.log(automobilesData);
            this.setState({ automobiles: automobilesData.autos});
        }
        if(customerResponse.ok){
            const customersData = await customerResponse.json();
            this.setState({ customers: customersData.customers})
        }
        if(salespersonResponse.ok){

            const salespersonsData = await salespersonResponse.json();
            this.setState({ salespersons: salespersonsData.salespersons});
        }

        
    }

    handleSalesPersonNameChange(event){
        const value = event.target.value;
        this.setState({sales_person_name: value})
    }

    handleCustomerNameChange(event){
        const value = event.target.value;
        this.setState({customer_name: value})
    }

    handleAutomobileChange(event){
        const value = event.target.value;
        this.setState({automobile_href: value})
    }

    handlePriceChange(event){
        const value = event.target.value;
        this.setState({price: value})
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        delete data.salespersons;
        delete data.customers;
        delete data.automobiles;
        console.log(data); 
        const salesrecordUrl = "http://localhost:8090/api/salesrecords/";
       
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesrecordUrl, fetchConfig);
        console.log(response);
        if (response.ok) {
    
            this.setState({
                sales_person_name: '',
                customer_name: '',
                automobile_href: '',
                price: '',
              });
        }

    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a sales record</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-record-form">
                            <div className="mb-3">
                                <select onChange={this.handleAutomobileChange} value={this.state.automobile_href} required name="automobile_href" id="automobile_href" className="form-select">
                                <option value="">Choose a automobile</option>
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.import_href} value={automobile.import_href}>
                                                {automobile.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleSalesPersonNameChange} value={this.state.sales_person_name} required name="sales_person_name" id="sales_person_name" className="form-select">
                                <option value="">Choose a sales person</option>
                                    {this.state.salespersons.map(salesperson => {
                                        return (
                                            <option key={salesperson.id} value={salesperson.name}>
                                                {salesperson.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleCustomerNameChange} value={this.state.customer_name} required name="customer_name" id="customer_name" className="form-select">
                                <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.name}>
                                                {customer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Price" required type="number" name="price" id="price" className="form-control"/>
                                <label htmlFor="price">Sale Price</label>
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

