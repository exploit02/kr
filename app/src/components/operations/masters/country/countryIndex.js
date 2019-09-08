import React, { Component } from 'react'
//import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import TopNav from '../../../navbar/Topnav';
import SideBar from '../../../navbar/SideBar';
import { countryModule } from '../../../../services/countryService'
import { Link } from 'react-router-dom'
import { Notification } from '../../../../utils/Notification'

class Country extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            country:[] 
        }

        this.notificationDOMRef =  React.createRef();
        this.countryDelete =  this.countryDelete.bind(this);
    }
    
    async componentWillMount(){
        console.log('in idex')
        // if(this.props.location.state.Notification){
        //     console.log(this.props.location.state.Message)
        // }
        const countryList = await countryModule.getCountry();
        console.log(countryList)
        this.setState({country:countryList})
        
        
    }

    componentDidMount = ()=>{
        console.log('in idex2')
        //NotificationGenerator(this.notificationDOMRef.current, true, 'success', 'Country Added Successfully')
    }

    async upDateStatus(){
        const Test = await countryModule.getCountry()
        this.setState({country:Test})
        console.log(Test)
    }
    async countryDelete(countryId){
        const res = await countryModule.deleteCountry(countryId)
        
        const countryList2 = await countryModule.getCountry()
        //console.log(countryList2)
        //this.upDateStatus()
        //this.setState({country:countryList2})
        window.location.reload();
        //Notification('Info',"Country Deleted Successfully ")
    }


    
    render() {
        const countryList = this.state.country
        //console.log(countryList)
        if(!Object.keys(countryList).length){
            return (
                <div>
                    {/* <ReactNotification ref={this.notificationDOMRef} /> */}
                    <TopNav/>
                    <SideBar userType={1}/>
                </div>
            );
        }
        return (
            <div>
               {/* <ReactNotification ref={this.notificationDOMRef} /> */}
               <TopNav/>
               <SideBar userType={2}/>
                    <div className="row">
                            <div className="col s9 offset-s3">
                                <h5>Country List</h5>
                                <br/>
                                <button className="waves-effect waves-light btn red">
                                    <Link 
                                        to={{pathname :`/operations/country/add` ,
                                        state: {countryId:""}
                                            }}> <i className="material-icons">add</i>
                                    </Link>
                                </button>
                                <br/><br/>
                                <div className="z-depth-4">
                                <table className="responsive-table centered bordered">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>

                                    {
                                        
                                        countryList.map((country , index) => {
                                            return (
                                                <tbody key = {index} className = {index}>
                                                <tr >
                                                    <td>{country.country_name}</td>
                                                    <td>{country.status}</td>
                                                    <td>
                                                        <Link 
                                                        to={{pathname :`/operations/country/update`,
                                                        state: {countryId:country.id}
                                                            }}><i className="material-icons">edit</i>
                                                        </Link>
                                                        <i className="material-icons small">more_vert</i>
                                                        
                                                        {
                                                            country.status == 'Active'?
                                                            <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>this.countryDelete(country.id)}>check_circle</i>:
                                                            <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>this.countryDelete(country.id)}>block</i>
                                                        }
                                                        
                                                        
                                                    </td>
                                                </tr>
                                                </tbody>
                                                );
                                            
                                        })
                                    }
                                </table>
                                </div>
                            </div> 
                    </div>
            </div>
        )
    }
}

export default Country
