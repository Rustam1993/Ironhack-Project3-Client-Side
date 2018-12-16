
import React, {Component} from 'react';
import "../../App.css";
import Axios from 'axios';
import UserService from '../../services/UserServices';
import {Link} from 'react-router-dom'



class LoginForm extends Component{

    state = { emailInput: '', passwordInput: '' };

    userService = new UserService();


handleChange = (e) =>{ 

    this.setState({
        [e.target.name] : e.target.value
    })

}

handleFormSubmit =(e) =>{
    e.preventDefault();

    this.userService.login(this.state.emailInput, this.state.passwordInput)
    .then((UserFromDb) =>{
        this.setState({emailInput: '', passwordInput: ''})
        this.props.logTheUserIntoAppComponent(UserFromDb)
        this.props.history.push('/all-properties')
    })
    .catch((err) =>{
        console.log('wrong passoword' ,err)
    })
}



    render(){

        return(
            <div className="login-signup-form" >
                <form onSubmit = {this.handleFormSubmit}>

                    <label>Email</label>
                    <input  type="text"  name = "emailInput"        value={this.state.emailInput}    onChange = { e => this.handleChange(e)}  />

                    <label>Password</label>
                    <input  type="password"  name = "passwordInput" value={this.state.passwordInput} onChange = { e => this.handleChange(e)}   />

                    <input type = "submit" />
                </form>
            </div>
        )
    }

}


export default LoginForm;



