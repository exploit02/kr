// import React, {Component} from 'react'
// import M from 'materialize-css';  

// class Foo extends Component {

//     componentDidMount() {
//         document.addEventListener('DOMContentLoaded', function() {
//             var elems = document.querySelectorAll('.dropdown-trigger');
//             var instances = M.Dropdown.init(elems, options);
//           });
//     }

//     render(){
//         return(
//             <div className="input-field col s12">
//                 <a className='dropdown-button btn' data-activates='dropdown1'>Drop Me!</a>
//                 <ul id='dropdown1' className='dropdown-content'>
//                   <li><a href="#!">one</a></li>
//                   <li><a href="#!">two</a></li>
//                   <li className="divider"></li>
//                   <li><a href="#!">three</a></li>
//                   <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
//                  <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
//                 </ul>
//             </div>
//         )
//     }

// }
// export default Foo;
// import ReactNotification from "react-notifications-component";
// import "react-notifications-component/dist/theme.css";
// export const testFunc = {
//     ter:()=>{
//         console.log('ter')
//     },
//     addNotification() {
//         this.notificationDOMRef.current.addNotification({
//           title: "Awesomeness",
//           message: "Awesome Notifications!",
//           type: "success",
//           insert: "top",
//           container: "top-right",
//           animationIn: ["animated", "fadeIn"],
//           animationOut: ["animated", "fadeOut"],
//           dismiss: { duration: 2000 },
//           dismissable: { click: true }
//         });
//       }
    
// }


import React, { Component } from 'react'
import {Table} from '../../utils/Table'

export class foo extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             THead:['Name', 'Status'],
             TData:[
             {id: "1044", country_name: "Bangladesh", status: "Active", stat:true},
             {id: "1038", country_name: "Brazil", status: "Active", stat:true},
             {id: "1045", country_name: "India", status: "Active", stat:true},
             {id: "1047", country_name: "Newzeland", status: "Active", stat:false},
             {id: "1036", country_name: "Pakistan", status: "Active", stat:false},
             {id: "1078", country_name: "QWER", status: "Active", stat:true},
             {id: "1049", country_name: "THAI", status: "Active", stat:true},
             {id: "1048", country_name: "ThaiLand", status: "Active", stat:true}]
        }
    }

    clickF= ()=>{
        console.log('I am clicked')
    }
    
    render() {
        const TableData = {
            THead: this.state.THead,
            TData: this.state.TData
        }

        const ActionButton = {
            Edit:{
                Show: true,
                ActiveIcon:'edit',
                Link:`/operations/country/update`,
                StateColumn:0,
                StateName:'',
                Separator:true
            },
            Delete:{
                Show: true,
                ActiveIcon:'delete',
                InactiveIcon:'delete',
                HandlingFunction:'',
                Link:'',
                Separator:true
            },
            Status:{
                Show: true,
                Link:'',
                Icon:'block',
                ActiveIcon:'check_circle',
                InactiveIcon:'block',
                BaseColumn:3,
                Toggle:true,
                HandlingFunction:this.clickF,
                Separator:true
            },
            Details:{
                Show: true,
                ActiveIcon:'explore',
                InactiveIcon:'explore',
                Link:'',
                HandlingFunction:''
            }
        }

        return (
            <div>
                <button className="waves-effect waves-light btn red" onClick={()=>this.clickF()}/>
                <Table THead = {this.state.THead} TBody = {this.state.TData} ActionButton={ActionButton}/>
            </div>
        )
    }
}

export default foo


