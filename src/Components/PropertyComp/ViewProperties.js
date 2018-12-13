import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';

class viewProperties extends Component{
    state={
        theZipCode: '',
        theFeatures: [],
        theImage: '',
        allTheProperties: [],
    }

    componentWillMount(){
        this.fetchProperties()
    }
 
    fetchProperties = () =>{
         Axios.get('http://localhost:3000/api/all-properties')
         .then((listOfProperties)=>{
             this.setState({allTheProperties: listOfProperties.data}, ()=>{
                 console.log(this.state.allTheProperties)
             }) 
         })
         .catch((err)=>{
             console.log(err)
         })
    }

    updateInput = (e) => {
        this.setState({[e.target.id]: e.target.value })
    }

    showAllProperties = () => {
        if(this.state.allTheProperties){ //&& this.props.currentUser

            const myProperties = this.state.allTheProperties.filter((eachProperty)=>{
                return eachProperty  // === this.props.currentUser._id
            })

            return myProperties.map((eachProperty)=>{
                return(
                    <div className="propertyCard" key={eachProperty._id}>
                    <img className="propertyImage" src={eachProperty.image} alt ="Image"></img>
                    <h3>Address: {eachProperty.address}</h3>
                    <h4>Features: {eachProperty.features}</h4>
                    <Link to={'/property/'+ eachProperty._id}>See Details</Link>
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