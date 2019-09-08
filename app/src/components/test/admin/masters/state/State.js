import React, { Component } from 'react'
import TopNav from '../../../../navbar/Topnav'
import SideBar from '../../../../navbar/SideBar'
import {stateModule} from '../../../../../api/state'
import {Link} from 'react-router-dom'

 class State extends Component {
    constructor(props){
        super(props)

        this.state = {
            state: ""
        }
        this.stateDelete = this.stateDelete.bind(this);
    }
    
    async componentWillMount(){
        const stateList = await stateModule.getState();
        this.setState({state:stateList})
    }

    async stateDelete(stateId){
        const res = await stateModule.deleteState(stateId)
        const stateList = await stateModule.getState();
        window.location.reload();
    }

    render() {
        const stateList = this.state.state
        if(!Object.keys(stateList).length){
            return (
                <div>
                    <TopNav/>
                    <SideBar userType={1}/>
                </div>
            );
        }
        return (
            <div>
              <TopNav/>
             <SideBar userType={2}/>  
            <div className ="row">
                <div className ="col s9 offset-s3">
                <h5>State List</h5>
                <br/>
                <button className ="waves-effect waves-light btn red">
                <Link
                to={{pathname :`/operations/admin/masters/state/add`, 
                     state: {stateId: ""}
                     }}> <i className ="material-icons">add</i>
                </Link>
                </button>
                <br/><br/>
                <div className="z-depth-4">
                    <table className="responsive-table centered bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>State Code</th>
                            <th>Country Id</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                                        
                    stateList.map((state , index) => {
                        return (
                            <tbody key = {state.id} className = {state.id}>
                            <tr >
                                <td>{state.state_name}</td>
                                <td>{state.state_code}</td>
                                <td>{state.country_id}</td>
                                <td>{state.status}</td>
                                <td>
                                    <Link 
                                    to={{pathname :`/operations/admin/masters/state/update`,
                                    state: {stateId:state.id}
                                        }}><i className="material-icons">edit</i>
                                    </Link>
                                    <i className="material-icons small">more_vert</i>
                                    
                                    {
                                        state.status == 'Active'?
                                        <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>this.stateDelete(state.id)}>check_circle</i>:
                                        <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>this.stateDelete(state.id)}>block</i>
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
export default State