import React, { Component } from "react";
import { Link } from 'react-router-dom'
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";

class Sidebar extends Component {
    componentDidMount() {
        // var elem = document.querySelector(".sidenav");
        // var instance = M.Sidenav.init(elem, {
        //     edge: "left",
        //     inDuration: 1000
        // });
        
        
      M.AutoInit();
    }

    render() {
      
       
        const styles = { 
          color: `red`,
            transform: `translateX(0%)` 
        };
        return (
         <div>
            <ul id="slide-out" class="sidenav" style={styles}>
          <li><div class="user-view">
            <div class="background">
              <img src="images/office.jpg"/>
            </div>
            <a href="#user"><img class="circle" src="images/yuna.jpg"/></a>
            <a href="#name"><span class="white-text name">John Doe</span></a>
            <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
          </div></li>
          <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div class="divider"></div></li>
          <li><a class="subheader">Subheader</a></li>
          <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      
         </div>
        );
    }
}

export default Sidebar;