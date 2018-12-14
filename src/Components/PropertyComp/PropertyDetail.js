import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';

import PropertyService from '../../services/PropertyServices';

class propertyDetails extends Component{
    state={
        link: this.props.match.params.id,
        singleProperty: null,
    }

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
                singleProperty: singlePropertyFromDB
            })
        })
    }


    showOneProperty(){
            if(this.state.singleProperty){

                let copyReviewArrays = this.state.singleProperty.review;
                    console.log('<><><>><><><>', copyReviewArrays)
                    console.log('<><><>THISSSSSSS<><><>', this.state.singleProperty)
                copyReviewArrays = copyReviewArrays.map((element, index)=>{
                    return(
                        <div key={index}>
                            
                            <p>Message:{element.message}</p>
                            <p>Rating:{element.rating}</p>
                            <Link to={'/edit-review/'+ element._id}>Edit Review</Link><br></br>
                            <br></br>
                            <br></br>
                            <br></br>
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