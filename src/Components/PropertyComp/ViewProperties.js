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

    updateInput = (e) => {
        this.setState({[e.target.id]: e.target.value })
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

    showAllProperties = () => {
        if(this.state.allTheProperties){ //&& this.props.currentUser

            const myProperties = this.state.allTheProperties.filter((eachProperty)=>{
                return eachProperty // === this.props.currentUser._id
            })

            return myProperties.map((eachProperty)=>{
                return(
                    <div className="propertyCard" key={eachProperty._id}>
                    <img className="propertyImage" src={eachProperty.image} alt ="Image"></img>
                    <h3>Address: {eachProperty.address}</h3>
                    <h4>Features: {eachProperty.features}</h4>
                    <Link to={'/property/'+ eachProperty._id}>See Details</Link>
                    <Link to={'/create-review/'+ eachProperty._id}>Create Property Review</Link>
                    <Link to={'/edit-property/'+ eachProperty._id}>Edit Property</Link>
                    <button onClick={()=> this.deleteProperty(eachProperty._id)} className="delete">Delete This Project</button>
                </div>
            )
        })
        }
    }

    render(){
        return(

            <div className="list-of-properties-container allPropertyView">
                {this.showAllProperties()}

            </div>
            
        )
    }
}

  
export default viewProperties;