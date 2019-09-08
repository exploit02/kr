import React, { Component } from 'react'
import Sidebar from './../../../../navbar/SideBar'
import TopNav from '../../../../navbar/Topnav';
import { stateModule } from './../../../../../api/state'
import Validator from './../../../../../utils/Validator'

 class AddState extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: "",
            state_name:"",
            country_id:"",
            state_code:"",
            status:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.stateCreate = this.stateCreate.bind(this)
        this.stateUpdate = this.stateUpdate.bind(this)
    }

    async componentWillMount(){
       if(this.props.location.state.stateId){
        const stateData = await stateModule.getState(this.props.location.state.stateId)
        console.log(stateData)
        this.setState({
            id: stateData[0].id ,
            state_name: stateData[0].state_name ,
            country_id:stateData[0].country_id,
            state_code:stateData[0].state_code,
            status: stateData[0].status
        })
       }
    }

    async stateCreate(event){
        event.preventDefault();
        if(this.state.state_name, this.state.country_id, this.state.state_code){
            const res = await stateModule.addState(this.state)
             this.setState({
                id:"",
                state_name:"", 
                country_id:"",
                state_code:"",
                status:""
               });
               this.props.history.push("/operations/admin/masters/state");
        }
    }

    async stateUpdate(event){
        event.preventDefault();
        if(this.state.state_name, this.state.country_id, this.state.state_code){
        const res = await stateModule.updateState(this.state)
        this.setState({
            id:"",
            state_name:"", 
            country_id:"",
            state_code:"",
            status:""
           });
           this.props.history.push("/operations/admin/masters/state");
       }
    }

    handleChange(){
        this.setState({
            state_name: this.refs.state_name.value,
            country_id: this.refs.country_id.value,
            state_code: this.refs.state_code.value

        })
    }

    render() {
        return (
            <div>
              <TopNav/>
              <Sidebar/>
              <div className ="row">
                  <div className="col s9 offset-s3">
                      {
                          !this.props.location.state.stateId ? 
                          <h5>Add State</h5> :
                          <h5>Update State</h5>
                      }
                    <br/><br/><br/>
                    <form>
                        <div className="row">
                            <div className="input-field col s4 offset-s3">
                            <input id="form_state_name" type="text" className="validate" value={this.state.state_name} onChange={this.handleChange} ref="state_name"/>
                            <label htmlFor="form_state_name" className="active">State Name</label>
                            </div>
                            <div className="input-field col s4 offset-s3">
                            <input id="form_country_id" type="text" className="validate" value={this.state.country_id} onChange={this.handleChange} ref="country_id"/>
                            <label htmlFor="form_country_id" className="active">Country Name</label>
                            </div>
                            <div className="input-field col s4 offset-s3">
                            <input id="form_state_code" type="text" className="validate" value={this.state.state_code} onChange={this.handleChange} ref="state_code"/>
                            <label htmlFor="form_state_code" className="active">State Code</label>
                            </div>
                        </div>
                        <div className="row col s3 offset-s4">
                                {
                            !this.props.location.state.stateId ?
                            <button className="btn btn-info btn-block btn-sm" type="submit" onClick={this.stateCreate}>Submit</button> :
                            <button className="btn btn-info btn-block btn-sm" type="submit" onClick={this.stateUpdate}>Update</button>
                             }
                    </div>
                    </form>
                  </div>
                </div>  
            </div>
        )
    }
}
export default AddState