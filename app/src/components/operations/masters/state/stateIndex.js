import React, { Component } from 'react'
import TopNav from '../../../navbar/Topnav';
import SideBar from '../../../navbar/SideBar';
import {stateModule} from '../../../../services/stateService'
import {Link} from 'react-router-dom'
import { Notification } from '../../../../utils/Notification'

import { Table } from './../../../../utils/Util'

 class State extends Component {
    constructor(props){
        super(props)

        this.state = {
            state: [],
            pageNumber:1,
            rowInPage: 5
        }
        this.paginationHandler = this.paginationHandler.bind(this)

        this.notificationDOMRef =  React.createRef();
        this.stateDelete = this.stateDelete.bind(this);
    }
    
    async componentWillMount(){
        const stateList = await stateModule.getState('', this.state.pageNumber, this.state.rowInPage);
        this.setState({state:stateList})
    }

    async stateDelete(stateId){
        const res = await stateModule.deleteState(stateId)
        const stateList = await stateModule.getState();
        window.location.reload();
    }

    paginationHandler = async (pageNumber) => {
        console.log(pageNumber);
        const stateList = await stateModule.getState('', pageNumber, this.state.rowInPage)
        this.setState({
            state: stateList,
            pageNumber: pageNumber
        })
    }

    render() {
        const pagination = {
            pageNumber:this.state.pageNumber,
            entryInPage:5,
            handler: this.paginationHandler
        }

        const ActionButton = {
            Edit:{
                Show: true,
                ActiveIcon:'edit',
                Link:`/operations/state/update`,
                StateColumn:0,
                StateName:'',
                Separator:true
            },
            Status:{
                Show: true,
                Link:'',
                Icon:'block',
                ActiveIcon:'check_circle',
                InactiveIcon:'block',
                BaseColumn:6,
                Toggle:true,
                HandlingFunction:this.stateDelete,
                Separator:false
            }
        }
        const stateList = this.state.state
        // if(!Object.keys(stateList).length){
        //     return (
        //         <div>
        //             <TopNav/>
        //             <SideBar userType={1}/>
        //         </div>
        //     );
        // }
        return (
            <div>
              <TopNav/>
             <SideBar/>  
            <div className ="row">
                <div className ="col s9 offset-s3">
                <h5>State List</h5>
                <br/>
                <button className ="waves-effect waves-light btn red">
                <Link
                to={{pathname :`/operations/state/add`, 
                     state: {Id: ""}
                     }}> <i className ="material-icons">add</i>
                </Link>
                </button>
                <br/><br/>
                <Table THead = {['Name', 'State Code', 'Country Id', 'Status']} TBody = {this.state.state} ActionButton={ActionButton} Pagination = {pagination}/>

                {/* <div className="z-depth-4">
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
                                    to={{pathname :`/operations/state/update`,
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
                </div> */}


                </div>

            </div>
            </div>
        )
    }
}
export default State