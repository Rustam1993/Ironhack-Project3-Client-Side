import React, { Component } from 'react';

import UserService  from '../../services/UserServices'

import {Link, Switch, Route} from 'react-router-dom';





class UserProfile extends Component{


    state = {
        currentUser: null
    }

    service = new UserService();


    componentDidMount(){
        this.getCurrentUserProfile();
    }


    getCurrentUserProfile = () =>{

        this.service.loggedin()
        .then((userFromDb) =>{
            this.setState({
                currentUser : userFromDb
            })
        })

    }

    showListeproperties = () =>{


        if(this.state.currentUser){



        let array = this.state.currentUser.propertiesCreated.map((element,Index) =>{


            return (
                <div key={Index}>

                    <h1> {element.address} </h1>
                    <h1>{element.zipCode}</h1>
                    

                </div>
            )


        });
        return (
            <div>
            <h1>{this.state.currentUser.fullName}</h1>
            <h1>{this.state.currentUser.email}</h1>
             <Link to = {'/edit-profile/' + this.state.currentUser._id } > Edit profile  </Link>
            <h1>Preperties created: </h1>
                {array}

            </div>
        )
        }
    }




    render(){

            console.log(this.state.currentUser)

        return(

            <div>
                 
                 
                 {this.showListeproperties()}
             </div>
        )
    }

}


export default UserProfile;