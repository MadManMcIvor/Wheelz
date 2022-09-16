// import React, { useState} from 'react'

// function SalesPersonSales(props){
//     const [select, setSelected] = useState({
//         sales_person: "",
//     });

    
//     const handleChange = (event) => {
//         setSelected({ ...select, [event.target.name]: event.target.value });
//       };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setEntered({ ...search, [event.target.name]: event.target.value });
//         setSearch({ vin: ""});
//       };
    
//     const enteredVIN = entered["vin"]
//     const filteredProps =  filterProps(props, enteredVIN);
//     return (
//         <>
//             <div className="container mt-3">
//                 <div>
//                     <h1>Sales person history</h1>
//                 </div>
//             </div>
//             <div className="mt-4">
//                 <select className="form-select" value={select} onSelect={handleSelect}>
//                 <option value="">Select sales person</option>
//                 {props.salesrecords.map(salesrecord => {
//                     return (
//                         <option key={salesrecord.id} value={salesrecord.sales_person.name}>
//                             {salesrecord.sales_person.name}
//                         </option>
//                     );
//                     })}
//                 </select>
//             </div>
//             <div className="container">
//             <table className="table table-striped">
//                 <thead>
//                 <tr>
//                     <th>Sales person</th>
//                     <th>Customer</th>
//                     <th>VIN</th>
//                     <th>Sales price</th>
                
//                 </tr>
//                 </thead>
//                 <tbody>
    
//                 { filteredProps.salesrecords.map(salesrecord=>{
//                     return (
//                         <>
//                         <tr key={salesrecord.id}>
//                         <td>{ salesrecord.sales_person.name }</td>
//                         <td>{ salesrecord.customer.name }</td>
//                         <td>{ salesrecord.automobile.vin }</td>
//                         <td>{ salesrecord.price }</td>
//                     </tr>
//                         </>
//                     )
//                     })
//                 }
//                 </tbody>
//             </table>
//             </div>
//         </>
//       );
//     }

//     // function filterProps(props, name) {
//     //     let result = {salesrecords: []};
//     //     for (let salesrecord of props.salesrecords) {
//     //         if (salesrecord.sales_person.name === name) {
//     //             result.salesrecords.push(salesrecord)
//     //         }
//     //     }
//     //     return result
//     //   }

//   export default SalesPersonSales;



import React from "react";

class SalesPersonSales extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            salesrecords: [],
            salespersons:[],
            selectOptions: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const salesrecordUrl = "http://localhost:8090/api/salesrecords/";
        const salespersonUrl = "http://localhost:8090/api/salespersons/";
        const salespersonResponse = await fetch(salespersonUrl);
        const salesrecordResponse = await fetch(salesrecordUrl);

        if (salesrecordResponse.ok) {
            const data = await salesrecordResponse.json()
            this.setState({ salesrecords: data.salesrecords })
        }

        if(salespersonResponse.ok){
            const salespersonsData = await salespersonResponse.json();
            this.setState({ salespersons: salespersonsData.salespersons});

        }
    }

   

    handleChange(event) {
        this.setState({
        [event.target.name]: event.target.value
        });

    }
    

    render() {
        return (
            <>
             <div className="container mt-3">
                 <div>
                     <h1>Sales person history</h1>
                 </div>
                <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.salespersons} name="salespersons" required id="salespersons" className="form-select">
                <option value="">Select a sales person</option>
                {this.state.salespersons.map(salesperson => {
                    return <option key={salesperson.id} value={salesperson.name}>{salesperson.name}</option>
                })}
                </select>
                </div>
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
                        {this.state.salesrecords.map(salesrecord => {
                            return (
                                <tr key={salesrecord.id}>
                                    <td>{salesrecord.sales_person.name}</td>
                                    <td>{salesrecord.customer.name}</td>
                                    <td>{salesrecord.automobile.vin}</td>
                                    <td>{salesrecord.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            </>
        )
    }
}

// function filterProps(props, name) {
//     let result = {salesrecords: []};
//     for (let salesrecord of props.salesrecords) {
//         if (salesrecord.sales_person.name === name) {
//             result.salesrecords.push(salesrecord)
//         }
//     }
//     return result
// }

export default SalesPersonSales;
