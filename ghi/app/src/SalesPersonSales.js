import React, { useState, useEffect} from 'react'

function SalesPersonSales(props){
    const [state, setState] = useState({
        name: "",
        salespersons: [],
        salesrecords: []
    });

 
    const handleSalesPersonDropDown = async (event) => {
        
        // console.log("EVENT:::::", event)
        // console.log("Event target", event.target.value);

        setState({...state, 
            name: event.target.value
        
        });

        const salesrecordUrl = "http://localhost:8090/api/salesrecords/";
        const recordResponse = await fetch(salesrecordUrl)    
        if (recordResponse.ok) {
            const recordData = await recordResponse.json()
            console.log("salese record data!", recordData);
            let result = [];
            for(let record of recordData.salesrecords){
                if(record.sales_person.name === event.target.value){
                    result.push(record);
                }
            }
            console.log(result, "hello");

            setState({...state, salesrecords: result})
            }


     }
   


    useEffect(() => {
        console.log("useffect firing");
        
        async function getInfo(){
            console.log("useEffect!");
            const url = "http://localhost:8090/api/salespersons/"
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                console.log("data!",data);
                setState({...state, salespersons: data.salespersons})
            }else{
                setState({...state,salespersons: []})
            }

        }
        getInfo();
      }, []);

    


    return (
        <>
            <div className="container mt-3">
                <div>
                    <h1>Sales person history</h1>
                </div>
            </div>
            <div className="mb-3">
                <select className="form-select" onChange={handleSalesPersonDropDown} value={state.name} name="name" required id="name">
                <option value="">Select sales person</option>
                {state.salespersons.map(salesperson => {
                    return (
                        <option key={salesperson.id} value={salesperson.name}>
                            {salesperson.name}
                        </option>
                    );
                    })}
                </select>
            </div>
            <div className="container">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th> Employee Number</th>
                    <th>Sales person</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Sales price</th>
                
                </tr>
                </thead>
                <tbody>
    
                { state.salesrecords.map(salesrecord=>{
                    return (
                        <>
                        <tr key={salesrecord.id}>
                        <td> {salesrecord.sales_person.employee_number} </td>
                        <td>{ salesrecord.sales_person.name }</td>
                        <td>{ salesrecord.customer.name }</td>
                        <td>{ salesrecord.automobile.vin }</td>
                        <td>${ salesrecord.price }</td>
                    </tr>
                        </>
                    )
                    })
                }
                </tbody>
            </table>
            </div>
        </>
      );
    }

  export default SalesPersonSales;

