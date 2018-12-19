import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';




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
        if(this.state.singleProperty && this.state.singleProperty.review){
            let avRating =  ( this.state.singleProperty.review.reduce((total, review) => total + review.rating, 0) ) / (this.state.singleProperty.review.length)
            
            return avRating.toFixed(2);
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
                            <h4>{element.message}</h4>
                            <h4 className="makeRatingBolder">Rating: {element.rating}</h4>
                            {this.state.currentUser && element.author === this.state.currentUser._id  ?
                            
                                <div>
                                    <Link className="btn seeDetailsButton buttonSpacing" to={'/edit-review/'+ element._id}>Edit Review</Link>
                                    <button className="btn seeDetailsButton" onClick = {() => this.DeleteReview(element._id)}>Delete Review</button>
                                </div>
                                :
                                
                                ''
                        
                            }
                        </div>
                    )
                })

                return(

                    <div>
                        <h1 className="propertyDetailsHeader">Property Details</h1>
                    
                    <div class="card mb-3 propertyDetailStyling">
                        <img class="card-img-top addedImgStyle" src={image} alt="Card image cap"/>
                        <div class="card-body propDetailsCardStyle">
                            <h3 class="card-title goldFontDetails">{address}</h3>
                            <h4 class="card-text propDetailsBolderFont">Features: {features}</h4>
                            <h4 class="card-text propDetailsBolderFont"> Average Rating: {this.showAveragerating()}</h4>
                            <h3 class="card-title goldFontDetails">Reviews:</h3>
                            <p class="card-text propDetailsBolderFont">{copyReviewArrays}</p>
                            
                        </div>
                    </div>
                    </div>

                )
        }
    }


    render(){
        
        return(

            <div className="flexTheProperty propDetailBackground">
            {this.showOneProperty()}

            </div> 
        )
    }
}

export default propertyDetails;