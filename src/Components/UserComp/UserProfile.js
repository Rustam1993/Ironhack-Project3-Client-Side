import React, { Component } from 'react';

import UserService  from '../../services/UserServices'


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


        let array = this.state.currentUser.propertiesCreated;
        return array.map((element, Index) =>{

                return (
                    <div key = {Index}>
                        <h1>{this.state.currentUser.fullName}</h1>
                        <h2>{}</h2>
                        <div>
                            <p>{element.address}</p>
                        </div>
                    </div>    
                )
            })
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