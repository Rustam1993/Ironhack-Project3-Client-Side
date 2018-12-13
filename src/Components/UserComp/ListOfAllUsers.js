import React, { Component } from 'react';

import UserService from '../../services/UserServices';

import {Link, Switch, Route} from 'react-router-dom';




class ListOfAllUsers extends Component{

    state = {
        arrayOfUsers : []
    }

componentDidMount(){

    this.getUsers()
}  

service = new UserService();

getUsers  = () =>{
    
    this.service.listAllUsers()
    .then((AllUsers) =>{
        this.setState({arrayOfUsers : AllUsers})

    })


}

listUsers = () =>{
    
    let copy = this.state.arrayOfUsers;
    return copy.map((eachUser, Index) =>{
        return (
            <div key ={Index}>
                <h4>{eachUser.fullName}</h4>
                <h4>{eachUser.email}</h4>
                <img src ={eachUser.image} alt="Profile pic" />
                
                <Link to = {'user/'+eachUser._id} > Details </Link>

             </div>
        )
    })



}



render(){
    console.log(this.state)
return (
    <div>
        {this.listUsers()}


    </div>
 )
 }
}


export default ListOfAllUsers;