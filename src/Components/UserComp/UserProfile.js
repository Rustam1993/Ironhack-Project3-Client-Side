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

    showProfile = () => {
        if(this.state.currentUser){
            return(
            <div class="card addedProfileStyle">
            <h4 className="propertiesCreated">Profile</h4>
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
                        <Link class="btn btn-primary extraStylesButton" to = {'/edit-profile/' + this.state.currentUser._id }> Edit profile</Link>
                    </div>
                </div>
            )
        }
    }

    showListedProperties = () =>{
        if(this.state.currentUser){
            let array = this.state.currentUser.propertiesCreated.map((element,Index) =>{
            return (

                <div id="carouselExampleControls" class="carousel slide masterCarouselStyle" data-ride="carousel" key={Index}>
                        <h4 className="propertiesCreated">Created Properties</h4>
                    <div class="carousel-inner">

                        <div class="carousel-item active">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link className="btn btn-primary extraStylesButton" to={'/edit-property/'+ element._id}>Edit Property</Link><br></br>
                                    <button className="btn btn-primary extraStylesButton" onClick={()=> this.deleteProperty(element._id)}>Delete Property</button>
                                </div>
                        </div>

                        <div class="carousel-item">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link className="btn btn-primary extraStylesButton" to={'/edit-property/'+ element._id}>Edit Property</Link><br></br>
                                    <button className="btn btn-primary extraStylesButton" onClick={()=> this.deleteProperty(element._id)}>Delete Property</button>
                                </div>
                        </div>

                        <div class="carousel-item">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link className="btn btn-primary extraStylesButton" to={'/edit-property/'+ element._id}>Edit Property</Link><br></br>
                                    <button className="btn btn-primary extraStylesButton" onClick={()=> this.deleteProperty(element._id)}>Delete Property</button>
                                </div>
                        </div>

                    </div>

                        <a id="right_button" class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a id="left_button" class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>       
                </div> 

            )
        });

        return (

            <div>
                {array}
            </div> 
        )
    }
    }

    showViewedProperties = () =>{
        if(this.state.currentUser){
            let array = this.state.currentUser.propertiesCreated.map((element,Index) =>{
            return (

                <div id="carouselExampleControls" class="carousel slide masterCarouselStyle" data-ride="carousel" key={Index}>
                        <h4 className="propertiesCreated">Viewed Properties</h4>
                    <div class="carousel-inner">

                        <div class="carousel-item active">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link className="btn btn-primary extraStylesButton" to={'/create-review/'+ element._id}>Add Review</Link>
                                   
                                </div>
                        </div>

                        <div class="carousel-item">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link className="btn btn-primary extraStylesButton" to={'/create-review/'+ element._id}>Add Review</Link>
               
                                </div>
                        </div>

                        <div class="carousel-item">
                            <img class="d-block w-100 carouselImageStyle" src={element.image} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>{element.address}</h5>
                                    <p>{element.features}</p>
                                    <Link className="btn btn-primary extraStylesButton" to={'/create-review/'+ element._id}>Add Review</Link>
                     
                                </div>
                        </div>

                    </div>

                        <a id="right_button" class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a id="left_button" class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>       
                </div> 

            )
        });

        return (

            <div>
                {array}
            </div> 
        )
    }
    }

    render(){
            console.log(this.state.currentUser)
        return(

           
            <div className="profilePageDiv">

                <div className="profile">
                    {this.showProfile()}
                </div>

                 <div className="listedProps">
                    {this.showListedProperties()}
                 </div>

                 <div className="viewedProps">
                    {this.showViewedProperties()}
                 </div>

             </div>

        )
    }

}

export default UserProfile;