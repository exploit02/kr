import React, { Component } from 'react'
import TopNav from './../../../../components/navbar/Topnav'
import Sidebar from './../../../../components/navbar/SideBar'
import FormValidator from './../../../../utils/Validator';
import { countryModule } from './../../../../services/countryService'
import M from 'materialize-css';


class AddChiefExecutive extends Component {

    constructor(props) {
        super(props)
        this.validator = new FormValidator([
            { 
                field: 'fname', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'First Name is required.' 
            },
            { 
                field: 'lname', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Last Name is required.' 
            },
            { 
                field: 'uname', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'User Name is required.' 
            },
            { 
                field: 'email', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Email is required.' 
            },
            { 
                field: 'email',
                method: 'isEmail', 
                validWhen: true, 
                message: 'That is not a valid email.'
            },
            { 
                field: 'doj', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'DOJ is required.' 
            },
            { 
                field: 'dob', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'DOB is required.' 
            },
            { 
                field: 'mobile', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Pleave provide a phone number.'
            },
            {
                field: 'mobile', 
                method: 'matches',
                args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
                validWhen: true, 
                message: 'That is not a valid phone number.'
            }

          ]);

        this.state = {
            fname: '',
            lname: '',
            uname: '',
            gender:'',
            email: '',
            mobile: '',
            password: '',
            password_confirmation: '',
            validation: this.validator.valid(),
        }

        this.submitted = false;
    }

    async componentWillMount(){
    
        const countryList = await countryModule.getCountry();
        this.setState({country:countryList})
        
    }


    inputChange = event => {
        event.preventDefault();
        this.setState({
           [ event.target.name ] : event.target.value
        })
    }
    
    createUser = event => {
        event.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
    }

    componentDidMount(){
        M.AutoInit()
        var thisObj = this;
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.datepicker');
            console.log(elems)
            var instances = M.Datepicker.init(elems, {

                onClose:  () => {
                    thisObj.setState({doj:thisObj.refs.doj.value, dob:thisObj.refs.dob.value})
                  },
                autoClose: true,
                showClearBtn:true
            });
            
            
          });
          
    }



    render() {
        var test = this.state
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation               
        const countryList = [{id: "1041", country_name: "India", status: "Active"},{id: "1038", country_name: "Brazil", status: "Active"}] ;
        console.log(test.country)
        console.log(countryList.length)
        return (
            <div>
                <TopNav/>
                <Sidebar/>
                <div  className="row">
                    <div className="col s9 offset-s3">
                    <h5>Add Chief Executive</h5>
                    <br/><br/>
                    <form>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="fname" name="fname" type="text" className="validate" onChange={this.inputChange}/>
                                <label htmlFor="fname" className="active">First Name</label>
                                <span className="helper-text">{validation.fname.message}</span>
                            </div>
                            <div className="input-field col s4 offset-s1">
                                <input id="lname" name="lname" type="text" className="validate" onChange={this.inputChange}/>
                                <label htmlFor="lname" className="active">Last Name</label>
                                <span className="helper-text">{validation.lname.message}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="uname" name="uname" type="text" className="validate" onChange={this.inputChange}/>
                                <label htmlFor="uname" className="active">User Name</label>
                                <span className="helper-text">{validation.uname.message}</span>
                            </div>
                            <div className="input-field col s4 offset-s1">
                                <input id="doj" name="doj" type="text" className="datepicker" ref="doj"></input>
                                <label htmlFor="doj" className="active">DOJ</label>
                                <span className="helper-text">{validation.doj.message}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                            <select name="gender" onChange={this.inputChange}>
                                <option value="" disabled selected>Choose your option</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Others</option>
                            </select>
                            <label>Gender</label>
                            </div>
                            <div className="input-field col s4 offset-s1">
                                <input id="dob" name="dob" type="text" className="datepicker"  ref="dob"></input>
                                <label htmlFor="dob" className="active">DOB</label>
                                <span className="helper-text">{validation.dob.message}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="email" name="email" type="text" className="validate" onChange={this.inputChange}/>
                                <label htmlFor="email" className="active">E-Mail</label>
                                <span className="helper-text">{validation.email.message}</span>
                            </div>
                            <div className="input-field col s4 offset-s1">
                                <input id="mobile" name="mobile" type="text" className="validate" onChange={this.inputChange}/>
                                <label htmlFor="mobile" className="active">Mobile No</label>
                                <span className="helper-text">{validation.mobile.message}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="password" name="password" type="password" className="validate" onChange={this.inputChange}/>
                                <label htmlFor="password" className="active">Password</label>
                            </div>
                            <div className="input-field col s4 offset-s1">
                                <input id="confirm_password" name="confirm_password" type="password" className="validate" onChange={this.inputChange}/>
                                <label htmlFor="confirm_password" className="active">Confirm Password</label>
                            </div>
                        </div>
                        <div className="row">
                        <div className="input-field col s4">
                            <select name="supervisor" onChange={this.inputChange}>
                                <option value="" disabled selected>Choose your option</option>
                                {
                                     (countryList.length > 0) ? 
                                        countryList.map((country , index) => {
                                            return (
                                                <option value={country.id}>{country.country_name}</option>
                                            );
                                            
                                        })

                                     : ''
                                }
                            </select>
                            <label>Supervisor</label>
                            </div>
                            <div className="col s4 offset-s1" style={{marginTop: '35px'}}>
                            <label>
                                <input type="checkbox" onChange={this.inputChange}/>
                                <span>Active</span>
                            </label>
                            </div>
                        </div>
                        <div className="row col s3 offset-s4">
                            <button className="btn btn-info btn-block btn-sm" type="submit" onClick={this.createUser}>Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddChiefExecutive