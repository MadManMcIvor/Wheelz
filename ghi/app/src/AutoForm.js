import {useState} from "react";

function AutoForm({models, getAutomobiles}) {
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVIN] = useState('');
  const [model, setModel] = useState('');


  const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value);
        }

  const handleYearChange = (e) => {
        const value = e.target.value;
        setYear(value);
        }

  const handleVINChange = (e) => {
        const value = e.target.value;
        setVIN(value);
        }

  const handleModelChange = (e) => {
        const value = e.target.value;
        setModel(value);
        }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model;
    const autoUrl = 'http://localhost:8100/api/automobiles/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const attendeeResponse = await fetch(autoUrl, fetchOptions);
    if (attendeeResponse.ok) {
      setColor('');
      setYear('');
      setVIN('');
      setModel('');
      getAutomobiles();
    }
  }
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Automobile!</h1>
            <form onSubmit={handleSubmit} id="create-auto-form">
              
              <div className="form-floating mb-3">
                <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              
              <div className="form-floating mb-3">
                <input onChange={handleYearChange} value={year} placeholder="Year" required type="number" name="year" id="year" className="form-control"/>
                <label htmlFor="year">Year</label>
              </div>
    
              <div className="form-floating mb-3">
                <input onChange={handleVINChange} value={vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">Vin</label>
              </div>

              <div className="mb-3">
                <select onChange={handleModelChange} value={model} required name="model" id="model" className="form-select">
                  <option value="">Choose a Model</option>
                  {models.map(model => {
                        return (
                            <option key={`${model.id} ${model.name} dropdown item`} value={model.id}>
                                {model.name}
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


export default AutoForm;