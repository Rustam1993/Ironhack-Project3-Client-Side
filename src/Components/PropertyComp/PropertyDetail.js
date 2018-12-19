import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import PropertyService from '../../services/PropertyServices';
import ReviewServices from '../../services/ReviewServices';

class propertyDetails extends Component{
    state={
        link: this.props.match.params.id,
        singleProperty: null,
        review: [],
        currentUser: this.props.showUser()
    }
    serviceReview = new ReviewServices()
    serviceProperty = new PropertyService();

    componentWillMount(){
        this.getTheProperty();
        this.props.showUser()
        this.setState({
            link: this.props.match.params.id,

    })
    }
 

    getTheProperty = () => {
        this.serviceProperty.listOneProperty(this.state.link)
        .then((singlePropertyFromDB)=>{
            this.setState({
                singleProperty: singlePropertyFromDB,
                review        : singlePropertyFromDB.review,
   
            })
        })
    }


    DeleteReview = (reviewID) => {
        this.serviceReview.deleteReview(reviewID)
        .then((deleteReview) =>{
           this.getTheProperty();
        })
        .catch((err) =>[
            console.log(err)
        ])
    }

    showAveragerating = () =>{
        if(this.state.singleProperty){
            let avRating = this.state.singleProperty
        }
    }

    showOneProperty(){
        if(this.state.singleProperty){
                var address = this.state.singleProperty.address;
                var features = this.state.singleProperty.features;
                var image = this.state.singleProperty.image;
                var id = this.state.singleProperty._id;
                var copyReviewArrays = this.state.singleProperty.review;
                
                copyReviewArrays = copyReviewArrays.map((element, index)=>{
                    return(
                        <div key={index}>
                            <h4>Message:{element.message}</h4>
                            <h4>Rating:{element.rating}</h4>
                            {this.state.currentUser && element.author === this.state.currentUser._id  ?
                            
                                <div>
                                    <Link className="btn btn-primary extraStylesButton" to={'/edit-review/'+ element._id}>Edit Review</Link>
                                    <button className="btn btn-primary extraStylesButton" onClick = {() => this.DeleteReview(element._id)}>Delete Review</button>
                                </div>
                                :
                                
                                console.log('1234', element)
                        
                            }
                        </div>
                    )
                })

                return(

                    <div class="card mb-3 propertyDetailStyling">
                        <img class="card-img-top addedImgStyle" src={image} alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">{address}</h5>
                            <p class="card-text">Features: {features}</p>
                            <p class="card-text"> Average rating: {(this.state.singleProperty.review.reduce((total, el) => total + el ,0))/this.s}</p>
                            <h3 class="card-title">Reviews:</h3>
                            <p class="card-text">{copyReviewArrays}</p>
                            
                        </div>
                    </div>

                )
        }
    }


    render(){
        console.log("testing review render here", this.state)
        return(

            <div className="flexTheCards addedStylingCard propDetailBackground">
            {this.showOneProperty()}

            </div> 
        )
    }
}

export default propertyDetails;