import {useState, useEffect} from "react";

function SaleRecordForm({salespersons, customers, automobileVOs, getSalesRecords, getAutomobileVOs}) {
    const[automobile, setAutomobile] = useState('');
    const[sales_person, setSalesPerson] = useState('');
    const[customer, setCustomer] = useState('');
    const[price, setPrice] = useState('');
    const[availableCars, setAvailableCars] = useState(filterSold(automobileVOs))

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

   const handleSalesPersonNameChange = (event) => {
        const value = event.target.value;
        setSalesPerson(value);
    }

    const handleCustomerNameChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.sales_person = sales_person;
        data.customer = customer;
        data.automobile = automobile;
        data.price = parseInt(price);
        console.log(data)
        const salesrecordUrl = "http://localhost:8090/api/salesrecords/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesrecordUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);
            setSalesPerson('');
            setCustomer('');
            setAutomobile('');
            setPrice('');
            getAutomobileVOs();
            getSalesRecords();        
        }
    }
        
        function filterSold(automobilesVOs) {
            return automobilesVOs.filter(auto => auto.is_sold === false);
            }

        useEffect(() => {
            setAvailableCars(filterSold(automobileVOs));
        },[automobileVOs])

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a sales record</h1>
                        <form onSubmit={handleSubmit} id="create-sales-record-form">
                            <div className="mb-3">
                                <select onChange={handleAutomobileChange} value={automobile} required name="automobile" id="automobile" className="form-select">
                                <option value="">Choose a automobile</option>
                                    {availableCars.map(automobile => {
                                        return (
                                            <option key={automobile.import_href} value={automobile.vin}>
                                                {automobile.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleSalesPersonNameChange} value={sales_person} required name="sales_person" id="sales_person" className="form-select">
                                <option value="">Choose a sales person</option>
                                    {salespersons.map(salesperson => {
                                        return (
                                            <option key={"salesperson" + salesperson.id} value={salesperson.name}>
                                                {salesperson.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleCustomerNameChange} value={customer} required name="customer" id="customer" className="form-select">
                                <option value="">Choose a customer</option>
                                    {customers.map(customer => {
                                        return (
                                            <option key={"customer" + customer.id} value={customer.name}>
                                                {customer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePriceChange} value={price} placeholder="Price" required type="number" name="price" id="price" className="form-control"/>
                                <label htmlFor="price">Sale Price</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

export default SaleRecordForm; 

