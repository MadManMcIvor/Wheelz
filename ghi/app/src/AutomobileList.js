import { Link } from 'react-router-dom';


function AutoList(props) {
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
            {props.autos.map(auto => {
                return (
                <>
                <tr key={auto.id}>
                    <td>{ auto.id }</td>
                    <td>{ auto.color }</td>
                    <td>{ auto.year }</td>
                    <td>{ auto.model.manufacturer.name }</td>
                    <td>{ auto.model.name }</td>
                    <td>{ auto.vin }</td>
                    {/* <td><button type="button" className="btn btn-danger" onClick={() => deleteItem(hat)}>delete</button> </td> */}
                </tr>
                </>
                );
            })}
            </tbody>
        </table>
      </div>
    );
  }

// async function deleteItem(hat) {
//     const hatUrl = `http://localhost:8090/api/hats/${hat.id}`;
//     const fetchOptions = {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
//    await fetch(hatUrl, fetchOptions);
//    window.location.reload(true);
//   }



  export default AutoList;