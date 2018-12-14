import React, { Component } from 'react';
import UserService from '../../services/UserServices';


class EditProfile extends Component{

    state = {
        currentUser: '',
        emailInput : '',
        passowrdInput : '',
        fullNameInput : '',
        imageInput : ''
    }

    service = new UserService();


  componentWillMount() {

    let userId = this.props.match.params.id;
    this.service.listOneUser(userId)
    .then((userFromDB) =>{
        this.setState({

            currentUser   :  userFromDB,
            emailInput    :  userFromDB.email,
            passowrdInput :  userFromDB.password,
            fullNameInput :  userFromDB.fullName,
            imageInput    :  userFromDB.image

        })
    })
    .catch((err) =>{
        console.log(err)
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value }, () =>{
        // console.log(this.state)
    })
}


handleFileChange(e){
    e.preventDefault()
    this.setState({
        imageInput: e.target.files[0]
    })
}

handleSubmit = (e) =>{

    e.preventDefault();
    this.service.editUser(this.state.emailInput, this.state.passowrdInput, this.state.fullNameInput, this.state.imageInput, this.props.match.params.id)
    .then(() =>{
        this.service.login(this.state.emailInput, this.state.passowrdInput)
        .then(() =>{

            this.props.history.push('/')
        })
    })
}

            
        
    render(){

        console.log(this.state)
       

        return(

            <div>
                <form onSubmit = {this.handleSubmit}>
                <label>Email</label>
                <input  name = "emailInput"  value={this.state.emailInput}       onChange = {e => this.handleChange(e)} />

                <label>passowrd</label>
                <input name = "passowrdInput" type = "password"  placeholder = "********"  onChange = {e => this.handleChange(e)} />

                <label>Full Name</label>
                <input name = "fullNameInput" value={this.state.fullNameInput}  onChange = {e => this.handleChange(e)} />

                <label>Profile Pic</label>
                <input type="file" name = "imageInput"  onChange = {e => { this.handleFileChange(e)}} required />

                <input type = "Submit" />

                </form>
            </div>
        )
    }

}

export default EditProfile;