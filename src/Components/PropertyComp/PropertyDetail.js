import React, { Component } from 'react';
import '../../App.css';

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
                review        : singlePropertyFromDB.review
            })
        })
    }


    DeleteReview = (reviewID) => {
        this.serviceReview.deleteReview(reviewID)
        .then((deleteReview) =>{
            // let newArray = this.state.singleProperty.review;
            // let newSingleProperty = this.state.singleProperty.review.splice(newArray.indexOf(deleteReview), 1  )

           this.getTheProperty();

        })
        .catch((err) =>[
            console.log(err)
        ])
    }





    showOneProperty(){
            if(this.state.singleProperty){


                let copyReviewArrays = this.state.singleProperty.review;
                    console.log('<><><>><><><>', copyReviewArrays)
                    console.log('<><><>THISSSSSSS<><><>', this.state.singleProperty)

                copyReviewArrays = copyReviewArrays.map((element, index)=>{
                    return(
                        <div key={index}>
                            

                         

                            <h4>Message:{element.message}</h4>
                            <h4>Rating:{element.rating}</h4>
                            <button onClick = {() => this.DeleteReview(element._id)}>Delete Review</button>

                        </div>
                    )

                })

                return(
                    <div>
                        <img className="propertyImage" src={this.state.singleProperty.image}></img>
                        <h3> {this.state.singleProperty.address}</h3>
                        <h4>{this.state.singleProperty.features}</h4>
                        
                        <h4>Reviews:</h4>
                        {copyReviewArrays}
                        
                        
                    </div>
                )
    }
}


    render(){

        console.log("testing review render here", this.state.singleProperty)
        return(

            <div className="propertyDetailVIew">
            <p>PROPERTY DETAIL PAGE IS WORKING!</p>
            {this.showOneProperty()}
            </div> 
        )
    }
}

export default propertyDetails;