import React from 'react';

class ManufacturerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    const manufacturerURL = 'http://localhost:8100/api/manufacturers/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const attendeeResponse = await fetch(manufacturerURL, fetchOptions);
    if (attendeeResponse.ok) {
      this.setState({
        name: '',
      });
    }
  }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
        }

  render() {
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new Manufacturer!</h1>
            <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
              
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>

          </div>
        </div>
      </div>
      );
    }
  }

export default ManufacturerForm;