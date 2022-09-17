function SalesList(props) {
    
    return (
      <div className="container">
        <h1>Sales record list</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Sales person</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Sales price</th>
             
            </tr>
            </thead>
            <tbody>

            {
              props.salesrecords.map(salesrecord=>{
                return (
                  <>
                  <tr key={salesrecord.id}>
                    <td>{ salesrecord.sales_person.name }</td>
                    <td>{ salesrecord.customer.name }</td>
                    <td>{ salesrecord.automobile.vin }</td>
                    <td> ${ salesrecord.price }</td>
                </tr>
                  </>
                )
              })
            }
            </tbody>
        </table>
      </div>
    );
  }



  export default SalesList;