import React, { Component } from 'react';

import UserService from '../../services/UserServices';


class SignupForm extends Component{
    
    state = {
        fullnameInput : '',
        emailInput : '',
        passwordInput: '',
        zipcodeInput: '',
        fileInput: ''
    }

    service = new UserService();

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFormSubmit = (e) => {

        e.preventDefault();
        this.service.signup(this.state.fullnameInput, this.state.emailInput, this.state.passwordInput, this.state.zipcodeInput, this.state.fileInput)
        .then((userFromDB) =>{
            this.props.logTheUserIntoAppComponent(userFromDB);

            this.setState({

                fullnameInput : '',
                emailInput : '',
                passwordInput: '',
                zipcodeInput: '',
                fileInput: null
            })

            this.props.history.push('/all-properties')

        })
    }

    handleFileChange(e){
        e.preventDefault()
        this.setState({
            fileInput: e.target.files[0]
        })
    }

    render(){
        
        return(

        <div className ="login-signup-form">
            <form onSubmit={this.handleFormSubmit}> 
              <input name = "fullnameInput" onChange = {e => this.handleChange(e)} value = {this.state.fullnameInput} type="text"         placeholder="Full name" />
              <input name = "emailInput"    onChange = {e => this.handleChange(e)} value = {this.state.emailInput} type="email"           placeholder="email" />
              <input name = "passwordInput" onChange = {e => this.handleChange(e)} value = {this.state.passwordInput} type="password"     placeholder="password" />
              <input name = "zipcodeInput"  onChange = {e => this.handleChange(e)} value = {this.state.zipcodeInput} type="text"          placeholder="Your zipcode" />
              <input name = "fileInput"     onChange = {e => this.handleFileChange(e)}  type ="file" />
              <input type = "submit" />
            </form>
        </div>

        )
    }

}


 export default SignupForm;