import { Link } from 'react-router-dom';


function ManufacturerList(props) {
  return (
      <div className="container">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-end m-4">
              <Link to="/manufacturers/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Manufacturer!</Link>
        </div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            {props.manufacturers.map(manufacturer => {
                return (
                <>
                <tr key={manufacturer.id}>
                    <td>{ manufacturer.id }</td>
                    <td>{ manufacturer.name }</td>
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



  export default ManufacturerList;