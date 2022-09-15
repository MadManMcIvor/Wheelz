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


}

export default SaleRecordForm; 

