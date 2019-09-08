import React, { Component } from 'react'
import {logoutModule} from './../../services/logoutService'
import session from './../../utils/sessionStore'


class logout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    async componentWillMount(){
        var res = await logoutModule.logout();
        session.uName = null;
        session.uId = null;
        session.eMail = null;
        session.uType = null;
        session.isLoggedIn = false;
        localStorage.removeItem('session');
        this.props.history.push("/login");
    }
    
    render() {
        return (
            <div>
               
            </div>
        )
    }
}

export default logout
