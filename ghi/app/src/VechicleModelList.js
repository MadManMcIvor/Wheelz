import { Link } from 'react-router-dom';


function VechicleModelList(props) {
  return (
      <div className="container">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-end m-4">
              <Link to="/models/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Manufacturer!</Link>
        </div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture</th>
            </tr>
            </thead>
            <tbody>
            {props.models.map(model => {
                return (
                <>
                <tr key={model.id}>
                    <td>{ model.name }</td>
                    <td>{ model.manufacturer }</td>
                    <td>{ model.picture_url } </td>
                    {/* <td><button type="button" className="btn btn-danger" onClick={() => deleteItem(model)}>delete</button> </td> */}
                </tr>
                </>
                );
            })}
            </tbody>
        </table>
      </div>
    );
  }


  export default VechicleModelList;