import React, { Component } from 'react';
import UserService  from '../../services/UserServices'
import {Link} from 'react-router-dom';
import PropertyServices from '../../services/PropertyServices';


class UserProfile extends Component{


    state = {
        currentUser: null,
        currentPictureCreated: null,
        currentPictureViewed: null,
        currentPictureIndex: 0,
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
                currentUser : userFromDb,
                currentPictureCreated: userFromDb.propertiesCreated[this.state.currentPictureIndex],
                currentPictureViewed: userFromDb.propertiesViewed[this.state.currentPictureIndex]
            })
        })

    }

    deleteProperty = (propertyID) => {
        this.serviceProperty.deleteProperty(propertyID)
        .then((deletedProperty)=>{
            this.showListedProperties();
            this.props.history.push('/myprofile')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    showProfile = () => {
        if(this.state.currentUser){
            return(
            <div class="card addedProfileStyle">
            <h4 className="propertiesCreated">Profile</h4>
                <img class="card-img-top" src={this.state.currentUser.image} alt="Card  cap"/>
                
                    <div class="card-body">
                        <h5 class="card-title">{this.state.currentUser.fullName}</h5>
                        <p class="card-text">Ask Rustam if we want to add a BIO in the edit Profile view</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Zip Code: {this.state.currentUser.zipCode}</li>
                        <li class="list-group-item">E-mail: {this.state.currentUser.email}</li>
                    </ul>
                    <div class="card-body">
                        <Link class="btn btn-primary extraStylesButton" to = {'/edit-profile/' + this.state.currentUser._id }> Edit profile</Link>
                    </div>
                </div>
            )
        }
    }


    rotatePictureCreatedRight = (plus) => {
        
        if(this.state.currentPictureIndex !== this.state.currentUser.propertiesCreated.length-1){
               this.setState({
                    currentPictureCreated : this.state.currentUser.propertiesCreated[this.state.currentPictureIndex+1],
                    currentPictureIndex : this.state.currentPictureIndex + 1
                })
        } else {
            this.setState({
                currentPictureCreated : this.state.currentUser.propertiesCreated[0],
                currentPictureIndex : 0
            })
        }
    }

    rotatePictureCreatedLeft = (minus) => {

        if(this.state.currentPictureIndex !== 0){
            this.setState({
                currentPictureCreated : this.state.currentUser.propertiesCreated[this.state.currentPictureIndex-1],
                currentPictureIndex : this.state.currentPictureIndex - 1
        })
        } else {
            this.setState({
                currentPictureCreated : this.state.currentUser.propertiesCreated[this.state.currentUser.propertiesCreated.length-1], 
                currentPictureIndex : this.state.currentUser.propertiesCreated.length-1 
            })
            
        }
    }

    rotatePictureViewedRight = (plus) => {
        
        if(this.state.currentPictureIndex !== this.state.currentUser.propertiesViewed.length-1){
               this.setState({
                    currentPictureViewed : this.state.currentUser.propertiesViewed[this.state.currentPictureIndex+1],
                    currentPictureIndex : this.state.currentPictureIndex + 1
                })
        } 
        else {
            this.setState({
                currentPictureViewed : this.state.currentUser.propertiesViewed[0], 
                currentPictureIndex : 0
            })
        }
    }

    rotatePictureViewedLeft = (minus) => {

        if(this.state.currentPictureIndex !== 0){
            this.setState({
                currentPictureViewed : this.state.currentUser.propertiesViewed[this.state.currentPictureIndex-1],
                currentPictureIndex : this.state.currentPictureIndex - 1
        })
        } 
        else {
            this.setState({
                currentPictureViewed : this.state.currentUser.propertiesViewed[this.state.currentUser.propertiesViewed.length-1], 
                currentPictureIndex : this.state.currentUser.propertiesViewed.length-1
            })
            
        }
    }



    showCreatedProperties = () =>{
        if(this.state.currentUser){
            let element = this.state.currentPictureCreated;
            console.log("CURRENT PICTURE<><><><><><>", this.state.currentPicture)
            console.log("CURRENT USER<><><><><><>", this.state.currentUser)
            return (

                <div id="carouselExampleControls" class="carousel slide masterCarouselStyle" data-ride="carousel">
                        <h4 className="propertiesCreated">Created Properties</h4>
                    <div class="carousel-inner">

                        <div class="carousel-item active">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link className="btn btn-primary extraStylesButton" to={'/edit-property/'+ element._id}>Edit Property</Link><br></br>
                                    {/* <button className="btn btn-primary extraStylesButton" onClick={()=>this.deleteProperty(element._id)}>Delete Property</button> */}
                                </div>
                        </div>

                    </div>

                        <a onClick={(e)=>this.rotatePictureCreatedLeft('minus')} class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        
                        <a onClick={(e)=>this.rotatePictureCreatedRight('plus')} class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>       
                </div> 
            )
        }
    }


    showViewedProperties = () =>{
        if(this.state.currentUser){
            let element = this.state.currentPictureViewed;
            console.log(element)
            return (

                <div id="carouselExampleControls" class="carousel slide masterCarouselStyle" data-ride="carousel">
                        <h4 className="propertiesCreated">Viewed Properties</h4>
                    <div class="carousel-inner">

                        <div class="carousel-item active">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link className="btn btn-primary extraStylesButton" to={'/edit-property/'+ element._id}>Edit Property</Link><br></br>
                                    {/* <button className="btn btn-primary extraStylesButton" onClick={()=>this.deleteProperty(element._id)}>Delete Property</button> */}
                                </div>
                        </div>

                    </div>

                        <a id="right_button" onClick={(e)=>this.rotatePictureViewedLeft('minus')} class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        
                        <a id="left_button" onClick={(e)=>this.rotatePictureViewedRight('plus')} class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>       
                </div> 
            )
        }
    }

    render(){
            console.log(this.state.currentUser)
        return(

           
            <div className="profilePageDiv userProfileBackground">

                <div className="profile">
                    {this.showProfile()}
                </div>

                <div className="bothCarousels">

                    <div className="listedProps">
                        {this.showCreatedProperties()}
                    </div>

                    <div className="viewedProps">
                        {this.showViewedProperties()}
                    </div>

                 </div>

             </div>

        )
    }

}

export default UserProfile;