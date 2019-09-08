import React, { Component } from 'react'
import './layout.css'
import { MaterializeCSS } from './../../utils/Util'

export class layout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    componentDidMount(){
        MaterializeCSS.AutoInit()
    }
    
    render() {
        return (
            <> 
            <header>
            <ul id="dropdown1" class="dropdown-content">
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li class="divider"></li>
                <li><a href="#!">three</a></li>
            </ul>
            <nav className="green" style={{height:'45px', lineHeight:'45px'}}>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo">CRUD</a>
                    <ul class="right hide-on-med-and-down">
                    <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">User Name<i class="material-icons right" style={{height:'45px', lineHeight:'45px'}}>dehaze</i></a></li>
                    </ul>
                </div>
            </nav>
        </header>
        <ul id="sidenav-1" class="sidenav sidenav-fixed">
        <li><a class="subheader">Always out except on mobile</a></li>
        <li><a href="https://github.com/dogfalo/materialize/" target="_blank">Github</a></li>
        <li><a href="https://twitter.com/MaterializeCSS" target="_blank">Twitter</a></li>
        <li><a href="http://next.materializecss.com/getting-started.html" target="_blank">Docs</a></li>
    </ul>
    </>
        )
    }
}

export default layout
