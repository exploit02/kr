import React, { Component } from 'react'
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom'
import session from './../../utils/sessionStore';

export class SideBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }

    }

    // componentWillMount(){
    //     M.AutoInit()
    //     document.addEventListener('DOMContentLoaded', function() {
    //         var elems = document.querySelectorAll('.collapsible');
    //         var instances = M.Collapsible.init(elems, {});
    //       });
    // }
    
    render() {
        return (
            <div>
                <div>
                    <div className="sidebar" style={{paddingTop: '35px'}}>
                            <ul className="collapsible">
                                {
                                    session.uType == 1 || session.uType == 2 ? 

                                    <li>
                                    <a className="collapsible-header">MASTERS<i className="material-icons right">arrow_drop_down</i></a>
                                        <div className="collapsible-body">
                                            <ul>
                                            <li><a href="/operations/country">Country</a></li>
                                            <li><a href="/operations/state">State</a></li>
                                            <li><a href="#">District</a></li>
                                            <li><a href="#">Police Station</a></li>
                                            <li><a href="#">Post Office</a></li>
                                            <li><a href="#">Village</a></li>
                                            </ul>
                                        </div>
                                    </li>

                                    : 
                                    
                                    null

                                }
                                
                            </ul>
                            <ul className="collapsible">
                                <li>
                                    <a className="collapsible-header">USERS<i className="material-icons right">arrow_drop_down</i></a>
                                        <div className="collapsible-body">
                                            <ul>
                                                {
                                                    (session.uType == 1) ? 

                                                    <li><a href="/operations/users/admin">Admin</a></li> 

                                                    : 

                                                    null
                                                }
                                            <li><a href="#!">Chief Executive</a></li>
                                            <li><a href="#!">Business Executive</a></li>
                                            <li><a href="#!">Executive</a></li>
                                            </ul>
                                        </div>
                                    </li>
                            </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar
