import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';

import PropertyService from '../../services/PropertyServices';
import ReviewServices from '../../services/ReviewServices';

class propertyDetails extends Component{
    state={
        link: this.props.match.params.id,
        singleProperty: null,
        review: []
    }
    serviceReview = new ReviewServices()
    serviceProperty = new PropertyService();

    componentWillMount(){
        this.getTheProperty();

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
                            <Link className="btn btn-primary extraStylesButton" to={'/edit-review/'+ element._id}>Edit Review</Link>
                            <button className="btn btn-primary extraStylesButton" onClick = {() => this.DeleteReview(element._id)}>Delete Review</button>
                        </div>
                    )
                })

                return(
                    <div>   
                        <img src={image}/>
                        <h4>{address}</h4>
                        <h4>Features: {features}</h4>
                        
                        <h4>Reviews:</h4>
                        {copyReviewArrays}

                    <Link className="btn btn-primary extraStylesButton" to={'/create-review/'+ id}>Create New Review</Link>
                    
                    </div>
                )
        }
    }


    render(){
        console.log("testing review render here", this.state.singleProperty)
        return(

            <div className="propertyDetailVIew">
            
            {this.showOneProperty()}
            </div> 
        )
    }
}

export default propertyDetails;