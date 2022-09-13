import React from 'react';

class AutoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      year: '',
      vin: '',
      models: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleVINChange = this.handleVINChange.bind(this);

  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.models;
    console.log(data);
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
      this.setState({
        color: '',
        year: '',
        vin: '',
        model: '',
      });
    }
  }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color: value });
        }

    handleYearChange(event) {
        const value = event.target.value;
        this.setState({ year: value });
        }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({ model_id: value });
        }

    handleVINChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
        }


  render() {
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Automobile!</h1>
            <form onSubmit={this.handleSubmit} id="create-auto-form">
              
              <div className="form-floating mb-3">
                <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              
              <div className="form-floating mb-3">
                <input onChange={this.handleYearChange} value={this.state.year} placeholder="Year" required type="number" name="year" id="year" className="form-control"/>
                <label htmlFor="year">Year</label>
              </div>
    
              <div className="form-floating mb-3">
                <input onChange={this.handleVINChange} value={this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">Vin</label>
              </div>

              <div className="mb-3">
                <select onChange={this.handleModelChange} value={this.state.model} required name="model" id="model" className="form-select">
                  <option value="">Choose a Model</option>
                  {this.state.models.map(model => {
                        return (
                            <option key={model.id} value={model.id}>
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
  }

export default AutoForm;