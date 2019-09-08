import React, { Component } from 'react';
import Sidebar from '../../../navbar/SideBar';
import TopNav from '../../../navbar/Topnav';
import { countryModule } from '../../../../services/countryService';
import {Notification} from '../../../../utils/Notification'
import Validator from '../../../../utils/Validator';


export class AddCountry extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            id:"",
            country_name:"", 
            status:""
        }
        this.notificationDOMRef =  React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.countryCreate =  this.countryCreate.bind(this);
        this.countryUpdate =  this.countryUpdate.bind(this);
    }


    async componentWillMount(){
        if(this.props.location.state.countryId){
            const countryData = await countryModule.getCountry(this.props.location.state.countryId)
            this.setState({
                id: countryData[0].id ,
                country_name: countryData[0].country_name ,
                status: countryData[0].status
            })
        }
    }


    async countryCreate(event){
        event.preventDefault();
        if(this.state.country_name ){
            const res = await countryModule.addCountry(this.state)
             this.setState({
                id:"",
                country_name:"", 
                status:""
               });
               this.props.history.push("/operations/country");
               Notification('Success',"Country Added Successfully ")
        }
    }

    async countryUpdate(event){
        event.preventDefault();
        if(this.state.country_name){
        const res = await countryModule.updateCountry(this.state)
        this.setState({
            id:"",
            country_name:"", 
            status:""
           });
          
           this.props.history.push({
            pathname:"/operations/country",
            state:{
                Notification:true,
                Type:'Success',
                Message: 'Country Updated Successfully'
             }
           });
           Notification('Info',"Country Updated Successfully ")
       }
    }
    
    handleChange(){
        console.log(this.notificationDOMRef.current)
        this.setState({
            country_name: this.refs.country_name.value 
        })
    }
    
    render() {
        return (
            <div>
                {/* <ReactNotification ref={this.notificationDOMRef} /> */}
                <TopNav/>
                <Sidebar/>
                <div  className="row">
                    <div className="col s9 offset-s3">
                    {
                        !this.props.location.state.countryId  ?
                        <h5>Add Country</h5> :
                        <h5>Update Country</h5>
                    }
                        <br/><br/><br/>
                            <form>
                                <div className="row">
                                    <div className="input-field col s4 offset-s3">
                                        <input id="contry_name" type="text" className="validate" value={this.state.country_name} onChange={this.handleChange} ref="country_name"/>
                                        <label htmlFor="contry_name" className="active">Country Name</label>
                                    </div>
                                </div>
                                <div className="row col s3 offset-s4">
                                {
                            !this.props.location.state.countryId ?
                            <button className="btn btn-info btn-block btn-sm" type="submit" onClick={this.countryCreate}>Submit</button> :
                            <button className="btn btn-info btn-block btn-sm" type="submit" onClick={this.countryUpdate}>Update</button>
                    }
                                    
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCountry
