import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import PropertyService from '../../services/PropertyServices';
import ReviewService from '../../services/ReviewServices';

class viewProperties extends Component{
    state={
        allTheProperties: [],
    }

    serviceProperty = new PropertyService();
    serviceReview = new ReviewService();

    componentWillMount(){
        this.fetchProperties()
    }
 
    fetchProperties = () =>{
         Axios.get('http://localhost:3000/api/all-properties')
         .then((listOfProperties)=>{
             this.setState({allTheProperties: listOfProperties.data}, ()=>{
                 console.log("this.state.allTheProperties on VIEW PROPERTIES PAGE", this.state.allTheProperties)
             }) 
         })
         .catch((err)=>{
             console.log(err)
         })
    }

    deleteProperty = (propertyID) => {
        this.serviceProperty.deleteProperty(propertyID)
        .then((deletedProperty)=>{
            let copyOfAllTheProperties = this.state.allTheProperties

            copyOfAllTheProperties.splice(copyOfAllTheProperties.indexOf(deletedProperty) , 1)

            this.setState({allTheProperties: copyOfAllTheProperties}, ()=>{
                console.log("ALL THE PROPERTIES", this.state.allTheProperties)
            }) 
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    
    showPropertyInUserZipCode = () => {
        if(this.state.allTheProperties && this.props.currentUser){ 

            const myProperties = this.state.allTheProperties.filter((eachProperty)=>{
                if(eachProperty.zipCode === this.props.currentUser.zipCode){
                    console.log("EACH PROPERTY", eachProperty)
                    return eachProperty 
                }
            })
                    
                return myProperties.map((eachProperty)=>{
                    return(
                        <div className="propertyCard" key={eachProperty._id}>
                    
                            <div className="propertyImageDiv">
                                <img className="propertyImage" src={eachProperty.image} alt ="Image"></img>
                            </div>
                    
                            <div class="propertyDetails">
                                <h3 className="feedView propAddress">{eachProperty.address}</h3>
                                <h4 className="feedView propFeatures">Features: {eachProperty.features}</h4>
                                <Link className="feedView propButton"to={'/property/'+ eachProperty._id}>See Details</Link><br></br>
                            </div>
                    
                        </div>
                    )
            })
        }
    }



    showAllProperties = () => {
        if(this.state.allTheProperties){

            const myProperties = this.state.allTheProperties.filter((eachProperty)=>{
                return eachProperty
            })

            return myProperties.map((eachProperty)=>{
                return(
                    
                    <div class="card addedStyleCard" key={eachProperty._id}>
                        <img class="card-img-top" src={eachProperty.image} alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">{eachProperty.address}</h5>
                            <p class="card-text">Features: {eachProperty.features}</p>
                            <Link className="btn btn-primary extraStylesButton" to={'/property/'+ eachProperty._id}>See Details</Link><br></br>
                        </div>
                    </div>
            )
        })
        }
    }

    render(){
        
        return(

            <div> 

            <div className="searchButtonDiv addedStylingCard"> 
                <button className="btn btn-primary extraStylesButton" onClick={this.showPropertyInUserZipCode}>View Properties Near Me</button>
            </div> 

                <div className="flexTheCards">
                {this.showAllProperties()}
                </div>
        
            </div>
        )
    }
}

  
export default viewProperties;




                   
                    
                    

             