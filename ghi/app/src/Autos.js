import { Link } from 'react-router-dom';


function AutoList({automobiles}) {
  return (
      <div className="container">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-end m-4">
              <Link to="/automobiles/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Automobile!</Link>
        </div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Color</th>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>VIN</th>
            </tr>
            </thead>
            <tbody>
            {automobiles.map(auto => {
                return (
                <tr key={auto.id + auto.model.name + "autolist"}>
                    <td>{ auto.id }</td>
                    <td>{ auto.color }</td>
                    <td>{ auto.year }</td>
                    <td>{ auto.model.manufacturer.name }</td>
                    <td>{ auto.model.name }</td>
                    <td>{ auto.vin }</td>
                </tr>
                );
            })}
            </tbody>
        </table>
      </div>
    );
  }
  
  export default AutoList;