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

            this.props.history.push('/all-properties')
        })
    })
}

            
        
    render(){

        console.log(this.state)
       

        return(

           
            <div className="editProfDiv">
                    <h1 className="editProfileHeader">Edit My Profile</h1>
                <div className="profilePicDiv">
                    {this.state.currentUser ? 

                        <img className="editProfilePageProfPic" src = {this.state.currentUser.image} alt = "user pic"  />  

                        :

                        ''
                    }
                </div>

                <form className="editProfileForm" onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label>Email</label>
                        <input name="emailInput" value={this.state.emailInput} onChange={e => this.handleChange(e)} type="text" placeholder="Full name" class="form-control addedInputClassProfile"  aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input name = "passowrdInput" placeholder="********" onChange = {e => this.handleChange(e)}  type="password" class="form-control addedInputClassProfile"  aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                    <label>Name</label>
                        <input name = "fullNameInput" value={this.state.fullNameInput}  onChange = {e => this.handleChange(e)}  type="text" placeholder="password" class="form-control addedInputClassProfile" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                    <label>Profile Pic</label>
                        <input type="file" name = "fileInput" onChange = {e => this.handleFileChange(e)} class="form-control addedInputClassProfile" aria-describedby="emailHelp" />
                    </div>

                    <input className="btn seeDetailsButton" type="submit" />
                </form>

                
            </div>

        )
    }

}

export default EditProfile;