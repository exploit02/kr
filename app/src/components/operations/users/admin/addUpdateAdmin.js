import React, { Component } from 'react'
import { MaterializeCSS, Topnav, SideBar, FormValidator, Notification } from './../../../../utils/Util'
import { UserService } from './../../../../services/userService'
class addUpdateAdmin extends Component {
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
                field: 'gender', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Gender is required.' 
            },
            { 
                field: 'email_id', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Email is required.' 
            },
            { 
                field: 'email_id',
                method: 'isEmail', 
                validWhen: true, 
                message: 'That is not a valid email.'
            },
            { 
                field: 'mobile_no', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Pleave provide a phone number.'
            },
            {
                field: 'mobile_no', 
                method: 'matches',
                args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
                validWhen: true, 
                message: 'That is not a valid phone number.'
            },
            { 
                field: 'doj', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Pleave provide a Date of Joining.'
            },
            { 
                field: 'dob', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Pleave provide a Date of Birth.'
            }

          ]);

        this.state = {
            fname: '',
            lname: '',
            uname:'',
            gender:'',
            email_id: '',
            mobile_no: '',
            doj:'',
            dob:'',
            user_type_id:2,
            validation: this.validator.valid() 
        };

        this.submitted = false;
        
    }

    componentDidMount = ()=>{
        console.log('In did mount');
        MaterializeCSS.AutoInit()
        var thisObj = this;
        console.log('hereeeee')
        console.log(document.readyState)
        document.addEventListener('DOMContentLoaded', function() {
            console.log(document.readyState)
            var elems = document.querySelectorAll('.datepicker');
            console.log('hereeeee')
            console.log(elems)
            var instances = MaterializeCSS.Datepicker.init(elems, {
                onClose:  () => {
                    thisObj.setState({doj:thisObj.refs.doj.value, dob:thisObj.refs.dob.value})
                },
                autoClose: true,
                showClearBtn:true
            });
            
          });
    }

    handleInputChange = (event) =>{
        this.setState({
            [ event.target.name ] : event.target.value
        })
    }

    createAdmin = async (event) => {
        event.preventDefault();
        const validation = this.validator.validate(this.state);
        console.log(validation.isValid)
        this.setState({ validation });
        this.submitted = true;
        if(validation.isValid){
            const userCreate = await UserService.addUser(this.state)
            if(userCreate.status == 201){
                this.props.history.push("/operations/users/admin");
               Notification('Success',"User Added Successfully ")
            }else{
                Notification('Error',"Something Is Wrong")
            }
        }else{
            Notification('Warning',"Input Validation Failed") 
        }
    }
    
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation 
        return (
            <div>
                <Topnav/>
                <SideBar/>
                <div  className="row">
                    <div className="col s9 offset-s3">
                        <h5>Add Admin</h5>
                        <br/><br/>
                        <form>
                            <div className="row">
                                <div className="input-field col s4">
                                    <input id="fname" name="fname" type="text" className="validate" onChange={this.handleInputChange}/>
                                    <label htmlFor="fname" className="active">First Name</label>
                                    <span className="helper-text" style={{color:'red'}}>{validation.fname.message}</span>
                                </div>
                                <div className="input-field col s4 offset-s1">
                                    <input id="lname" name="lname" type="text" className="validate" onChange={this.handleInputChange}/>
                                    <label htmlFor="lname" className="active">Last Name</label>
                                    <span className="helper-text" style={{color:'red'}}>{validation.lname.message}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4">
                                    <input id="uname" name="uname" type="text" className="validate" onChange={this.handleInputChange}/>
                                    <label htmlFor="uname" className="active">User Name</label>
                                    <span className="helper-text" style={{color:'red'}}>{validation.uname.message}</span>
                                </div>
                                <div className="input-field col s4 offset-s1">
                                    <input id="doj" name="doj" type="text" className="datepicker" ref="doj"></input>
                                    <label htmlFor="doj" className="active">DOJ</label>
                                    <span className="helper-text"style={{color:'red'}}>{validation.doj.message}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4">
                                    <select name="gender" onChange={this.handleInputChange}>
                                        <option value="" disabled selected>Choose your option</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <label>Gender</label>
                                    <span className="helper-text" style={{color:'red'}}>{validation.gender.message}</span>
                                </div>
                                <div className="input-field col s4 offset-s1">
                                    <input id="dob" name="dob" type="text" className="datepicker"  ref="dob"></input>
                                    <label htmlFor="dob" className="active">DOB</label>
                                    <span className="helper-text" style={{color:'red'}}>{validation.dob.message}</span>
                                </div>
                            </div>
                            
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="email_id" name="email_id" type="text" className="validate" onChange={this.handleInputChange}/>
                                <label htmlFor="email_id" className="active">E-Mail</label>
                                <span className="helper-text" style={{color:'red'}}>{validation.email_id.message}</span>
                            </div>
                            <div className="input-field col s4 offset-s1">
                                <input id="mobile_no" name="mobile_no" type="text" className="validate" onChange={this.handleInputChange}/>
                                <label htmlFor="mobile_no" className="active">Mobile No</label>
                                <span className="helper-text" style={{color:'red'}}>{validation.mobile_no.message}</span>
                            </div>
                        </div>
                            <div className="row col s3 offset-s4">
                                <button className="btn btn-info btn-block btn-sm" type="submit" onClick={this.createAdmin}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default addUpdateAdmin
