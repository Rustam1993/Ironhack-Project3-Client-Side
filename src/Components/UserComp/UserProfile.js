import React, { Component } from 'react';
import UserService  from '../../services/UserServices'
import {Link, Switch, Route} from 'react-router-dom';
import PropertyServices from '../../services/PropertyServices';




class UserProfile extends Component{


    state = {
        currentUser: null
    }

    service = new UserService();
    serviceProperty = new PropertyServices();


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

    deleteProperty = (propertyID) => {
        this.serviceProperty.deleteProperty(propertyID)
        .then((deletedProperty)=>{
            let copyOfAllTheProperties = this.state.allTheProperties
    
            copyOfAllTheProperties.splice(copyOfAllTheProperties.indexOf(deletedProperty) , 1)
    
            this.setState({allTheProperties: copyOfAllTheProperties}, ()=>{
                console.log("ALL THE PROPERTIES", this.state.allTheProperties)
                // this.props.history.push('/myprofile')
            }) 
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    showListedProperties = () =>{
        if(this.state.currentUser){
            let array = this.state.currentUser.propertiesCreated.map((element,Index) =>{
            return (
                <div key={Index}>

                    <h1> {element.address} </h1>
                    <h1>{element.zipCode}</h1>
                    <Link to={'/edit-property/'+ element._id}>Edit Property</Link><br></br>
                    <button onClick={()=> this.deleteProperty(element._id)} className="delete">Delete Property</button>
                    

                </div>
            )
        });

        return (
            <div>
            <h1>{this.state.currentUser.fullName}</h1>
            <h1>{this.state.currentUser.email}</h1>
             <Link to = {'/edit-profile/' + this.state.currentUser._id }> Edit profile</Link>
            <h1>Properties created: </h1>
                {array}

            </div>
        )
        }
    }




    render(){

            console.log(this.state.currentUser)

        return(

            <div>
                 
                 
                 {this.showListedProperties()}
             </div>
        )
    }

}


export default UserProfile;