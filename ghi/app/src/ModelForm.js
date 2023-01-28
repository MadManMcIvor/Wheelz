import {useEffect, useState} from "react";

function ModelForm({manufacturers, getModels}) {
    const [name, setName] = useState('')
    const [picture_url, setPicURL] = useState('')
    const [manufacturer_id, setManufacturerID] = useState('')


    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    }
    
    const handlePictureChange = (e) => {
        const value = e.target.value;
        setPicURL(value);
    }

    const handleManufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturerID(value)
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.name = name;
        data.manufacturer_id = manufacturer_id
        data.picture_url = picture_url

        const modelUrl = "http://localhost:8100/api/models/";
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(modelUrl, fetchOptions);
        if (response.ok) {
            const newModel = await response.json();
            console.log(newModel);
            setName('');
            setPicURL('');
            setManufacturerID('');
            getModels();
        }
    }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a vehicle model</h1>
                        <form onSubmit={handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePictureChange} value={picture_url} placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                                <label htmlFor="picture_url">Picture URL</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleManufacturerChange} value={manufacturer_id} required name="manufacturer" id="manufacturer" className="form-select">
                                <option value="">Choose a manufacturer</option>
                                    {manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
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

export default ModelForm;