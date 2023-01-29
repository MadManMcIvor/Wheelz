import {useState} from "react";

function CreateCustomerForm({getCustomers}) {
    const[name, setName] = useState('');
    const[address, setAddress] = useState('');
    const[phone_number, setPhoneNumber] = useState('');

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);
    }
    
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
    }

    const handleSubmit= async (e) => {
        e.preventDefault();
        const data = {};
        data.name = name;
        data.address = address;
        data.phone_number = phone_number
        const customerUrl = "http://localhost:8090/api/customers/";
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };

        const response = await fetch(customerUrl, fetchOptions);
        if (response.ok) {
            setName('');
            setAddress('');
            setPhoneNumber('');
            getCustomers();
        }
    }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create new customer</h1>
                        <form onSubmit={handleSubmit} id="create-new-customer-form">
                                <div className="form-floating mb-3">
                                    <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                    <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleAddressChange} value={address} placeholder="Address" required type="text" name="address" id="address" className="form-control"/>
                                <label htmlFor="name">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePhoneNumberChange} value={phone_number} placeholder="Phone Number" required type="number" name="phone_number" id="phone_number" className="form-control"/>
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


export default CreateCustomerForm;