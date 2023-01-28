import {useState} from "react";

function ManufacturerForm({getManufacturers}) {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.name = name

    const manufacturerUrl = `${process.env.REACT_APP_INVENTORY_API}/api/manufacturers/`;
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok){
      const newManufacturer = await response.json();
      console.log(newManufacturer);
      setName('');
      getManufacturers()
    }
    }

  return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Manufacturer!</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>

          </div>
        </div>
      </div>
      );
    }


export default ManufacturerForm;