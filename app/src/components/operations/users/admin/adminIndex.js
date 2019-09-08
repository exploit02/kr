import React, { Component } from 'react'
import { UserService} from './../../../../services/userService'
import { Topnav, SideBar, Table, Notification } from './../../../../utils/Util'
import { Link } from 'react-router-dom'

class adminIndex extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[],
             pageNumber:1,
             rowInPage: 5
        }

        this.paginationHandler = this.paginationHandler.bind(this)
    }

    componentWillMount = async ()=>{
        const usersList = await UserService.getUser()
        this.setState({users: usersList})
    }

    paginationHandler = async (pageNumber, SearchField='') => {
        const usersList = await UserService.getUser('', pageNumber, this.state.rowInPage, SearchField)
        this.setState({
            users: usersList,
            pageNumber: pageNumber
        })
    }
    
    render() {
        const pagination = {
            pageNumber:this.state.pageNumber,
            entryInPage:5,
            handler: this.paginationHandler
        }
       
        return (
            <div>
                <Topnav/>
                <SideBar/>
                <div className="row">
                            <div className="col s9 offset-s3">
                                <h5>Admin</h5>
                                <br/>
                                <a  href={'/operations/users/admin/add'}>
                                    <button className="waves-effect waves-light btn red">
                                        <i className="material-icons">add</i>
                                    </button>
                                </a>
                                <br/><br/>
                                <Table THead = {['Name', 'User Name', 'E-Mail', 'Contact No.', 'Gender', 'Date Of Joining']} TBody = {this.state.users} Pagination = {pagination}/>
                            </div>
                    </div>
            </div>
        )
    }
}

export default adminIndex
