import React, { Component } from 'react';

import UserService from '../../services/UserServices';


class SignupForm extends Component{
    
    state = {
        fullnameInput : '',
        emailInput : '',
        passwordInput: '',
        addressInput: '',
        fileInput: ''
    }

    service = new UserService();

    handleChange = (e) => { 
        this.setState({[e.target.name]: e.target.value})
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        console.log('=-=-=--=-=--=-=-=-=-=-=-=-=-=-=-=-=-=',this.state)

        
        this.service.signup(this.state.emailInput, this.state.passwordInput, this.state.fullnameInput, this.state.fileInput, this.state.addressInput)
        .then((userFromDB) =>{
            this.props.logTheUserIntoAppComponent(userFromDB);

            this.setState({

                fullnameInput : '',
                emailInput : '',
                passwordInput: '',
                fileInput: '',
                addressInput: ''

            })

            this.props.history.push('/all-properties')

        })
    }

    handleFileChange = (e) => {
        
        e.preventDefault()
        this.setState({
            fileInput: e.target.files[0]
        })
    }

    render(){
        console.log(this.state)
        
        return(


            <div>
                <form className="signUpFormDiv" onSubmit={this.handleFormSubmit}>
                <h1><a className="neonHeader" href="">Sign-Up</a></h1>
                    <div class="form-group">
                        <input name="fullnameInput" onChange={this.handleChange} value = {this.state.fullnameInput} type="text" placeholder="Enter Name" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <input name = "emailInput" onChange = {this.handleChange} value = {this.state.emailInput} type="email" placeholder="Enter E-mail Address" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <input name = "passwordInput" onChange = {this.handleChange} value = {this.state.passwordInput} type="password" placeholder="Create a Password" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <input name = "addressInput" onChange = {this.handleChange} value = {this.state.addressInput} type="text" placeholder="Enter your Home Address" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group uploadPicChanges">
                    <label for="file-upload2" class="custom-file-upload">
                    Upload Image
                    </label>
                        <input id="file-upload" class="inputSpacingStyle" name="fileInput" onChange={this.handleFileChange} type ="file" />
                    </div>
                    <input className="btn btn-lg signUpButtonNeon" type="submit" />
                </form>
            </div>


        )
    }

}


 export default SignupForm;