import {useState} from "react";

function CreateSalesPersonForm({getSalesPersons}) {
    const [name, setName] = useState('');
    const [employee_number, setEmployeeNumber] = useState('');

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const handleEmployeeNumberChange = (e) => {
        const value = e.target.value;
        setEmployeeNumber(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.name = name;
        data.employee_number = parseInt(employee_number);
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
           setName('');
           setEmployeeNumber('');
           getSalesPersons();
        }
    }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Sales Person</h1>
                        <form onSubmit={handleSubmit} id="create-sales-person-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleEmployeeNumberChange} value={employee_number} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control"/>
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

export default CreateSalesPersonForm;