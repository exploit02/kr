import React, { Component } from 'react'
import TopNav from '../navbar/Topnav';
import SideBar from '../navbar/SideBar';
import session from './../../utils/sessionStore'


class operation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    
    render() {
            return (
                <div>
                  <TopNav/>
                  <SideBar/>
                  <div className="row">
                            <div className="col s9 offset-s5">
                                <h2 style={{marginTop:'176px'}}>Welcome {session.uName}</h2>
                            </div>
                    </div>
                </div>
            )
    }
}

export default operation
