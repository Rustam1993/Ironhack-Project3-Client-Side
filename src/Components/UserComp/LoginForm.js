
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
        console.log('/then')
        this.setState({emailInput: '', passwordInput: ''})
        this.props.logTheUserIntoAppComponent(UserFromDb)
        this.props.history.push('/all-properties')
    })
    .catch((err) =>{
        this.setState({error: "Sorry, these credentials are not correct. Please try again."})
        console.log('wrong passoword' ,err)
        
    })
}



    render(){

        return(

            <div>

                <form onSubmit = {this.handleFormSubmit}>
                <h1><a className="neonHeader" href="">Login</a></h1>
                    <div class="form-group">
                        <label className="loginLabelColor">Email address</label>
                        <input type="text" placeholder="Enter E-mail Address" class="form-control inputSpacingStyle" id="exampleInputEmail1" aria-describedby="emailHelp" name = "emailInput" value={this.state.emailInput} onChange = { e => this.handleChange(e)}/>
                    </div>
                    <div class="form-group">
                        <label className="loginLabelColor">Password</label>
                        <input type="password" placeholder="Enter Password" class="form-control inputSpacingStyle" id="exampleInputPassword1" name = "passwordInput" value={this.state.passwordInput} onChange = { e => this.handleChange(e)}/>
                    </div>
                    {   
                        this.state.error ? 

                        <p>{this.state.error}</p>

                        :
                         ''
                    }
                    <input className="btn btn-lg neonButtons neonHeader" type="submit" />
                </form>
            </div>
        )
    }

}


export default LoginForm;



