// import React, { Component } from 'react'
// import TopNav from '../../../../navbar/Topnav';
// import SideBar from '../../../../navbar/SideBar';
// import { countryModule } from '../../../../../api/country'
// import { Link } from 'react-router-dom'

// class Country extends Component {
//     constructor(props) {
//         super(props)
    
//         this.state = {
//             country:[] 
//         }

//         this.countryDelete =  this.countryDelete.bind(this);
//     }
    
//     async componentWillMount(){
    
//         const countryList = await countryModule.getCountry();
//         this.setState({country:countryList})
        
//     }

//     async countryDelete(countryId){
//         const res = await countryModule.deleteCountry(countryId)
//         const countryList = await countryModule.getCountry()
//         // console.log(this.props);
//         window.location.reload();
//     }
    
//     render() {
//         const countryList = this.state.country

//         if(!Object.keys(countryList).length){
//             return (
//                 <div>
//                     <TopNav/>
//                     <SideBar userType={1}/>
//                 </div>
//             );
//         }
//         return (
//             <div>
//                <TopNav/>
//                <SideBar userType={2}/>
//                     <div className="row">
//                             <div className="col s9 offset-s3">
//                                 <h5>Country List</h5>
//                                 <br/>
//                                 <button className="waves-effect waves-light btn red">
//                                     <Link 
//                                         to={{pathname :`/operations/admin/masters/country/add` ,
//                                         state: {countryId:""}
//                                             }}> <i className="material-icons">add</i>
//                                     </Link>
//                                 </button>
//                                 <br/><br/>
//                                 <div className="z-depth-4">
//                                 <table className="responsive-table centered bordered">
//                                     <thead>
//                                     <tr>
//                                         <th>Name</th>
//                                         <th>Status</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                     </thead>

//                                     {
                                        
//                                         countryList.map((country , index) => {
//                                             return (
//                                                 <tbody key = {country.id} className = {country.id}>
//                                                 <tr >
//                                                     <td>{country.country_name}</td>
//                                                     <td>{country.status}</td>
//                                                     <td>
//                                                         <Link 
//                                                         to={{pathname :`/operations/admin/masters/country/update`,
//                                                         state: {countryId:country.id}
//                                                             }}><i className="material-icons">edit</i>
//                                                         </Link>
//                                                         <i className="material-icons small">more_vert</i>
                                                        
//                                                         {
//                                                             country.status == 'Active'?
//                                                             <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>this.countryDelete(country.id)}>check_circle</i>:
//                                                             <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>this.countryDelete(country.id)}>block</i>
//                                                         }
                                                        
                                                        
//                                                     </td>
//                                                 </tr>
//                                                 </tbody>
//                                                 );
                                            
//                                         })
//                                     }
//                                 </table>
//                                 </div>
//                             </div> 
//                     </div>
//             </div>
//         )
//     }
// }

// export default Country
