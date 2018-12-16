import React, { Component } from 'react';
import UserService  from '../../services/UserServices'
import {Link} from 'react-router-dom';
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
            console.log(userFromDb)
            this.setState({
                currentUser : userFromDb
            })
            // this.showAllUserInfo();
            // console.log("CURRENT", this.state.currentUser)
        })

    }

    // showAllUserInfo = () => {
    //     if(this.state.currentUser){
    //         return(
    //             <div class="card" style="width: 18rem;">
    //                 <img class="card-img-top" src={this.state.currentUser.profilePic} alt="Card image cap"/>
    //                 <div class="card-body">
    //                     <h5 class="card-title">{this.state.currentUser.fullName}</h5>
    //                     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                 </div>
    //                 <ul class="list-group list-group-flush">
    //                     <li class="list-group-item">{this.state.currentUser.zipCode}</li>
    //                     <li class="list-group-item">{this.state.currentUser.email}</li>
    //                 </ul>
    //                 <div class="card-body">
    //                     <a href="#" class="card-link">Card link</a>
    //                     <a href="#" class="card-link">Another link</a>
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

    
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

                <div id="carouselExampleControls" class="carousel slide masterCarouselStyle" data-ride="carousel" key={Index}>
                        
                    <div class="carousel-inner">

                        <div class="carousel-item active">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link to={'/edit-property/'+ element._id}>Edit Property</Link><br></br>
                                    <button onClick={()=> this.deleteProperty(element._id)} className="delete">Delete Property</button>
                                </div>
                        </div>

                    </div>

                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>       
                </div> 

            )
        });

        return (

            <div>
            <div class="card addedProfileStyle">
                <img class="card-img-top" src={this.state.currentUser.image} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">{this.state.currentUser.fullName}</h5>
                    <p class="card-text">Ask Rustam if we want to add a BIO in the edit Profile view</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Zip Code: {this.state.currentUser.zipCode}</li>
                    <li class="list-group-item">E-mail: {this.state.currentUser.email}</li>
                </ul>
                <div class="card-body">
                    <Link class="card-link" to = {'/edit-profile/' + this.state.currentUser._id }> Edit profile</Link>
                </div>
                </div>
                <h3>Properties created: </h3>
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