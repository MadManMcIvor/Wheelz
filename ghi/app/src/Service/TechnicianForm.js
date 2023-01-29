import {useState} from "react";

function TechnicianForm({getTechnicians}) {
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
    
    const handleSubmit= async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.employee_number = employee_number;
        const technicianUrl = "http://localhost:8080/api/technicians/";
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(technicianUrl, fetchOptions);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log(newTechnician);
            setName('');
            setEmployeeNumber('');
            getTechnicians();
        }
    }
    
    return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a technician</h1>
                        <form onSubmit={handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleEmployeeNumberChange} value={employee_number} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control"/>
                                <label htmlFor="employee_number"> Employee Number</label>
                            </div>
                        
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

export default TechnicianForm;