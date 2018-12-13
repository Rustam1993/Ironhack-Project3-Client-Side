import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';

class createProperty extends Component{
    state={
        theAddress: '',
        theZipCode: '',
        theFeatures: [],
        theImage: '',
        allTheProperties: [],
    }

    updateInput = (e) => {
        this.setState({[e.target.id]: e.target.value })
    }

    createANewProject = (e) => {
        e.preventDefault();
        const newZip = this.state.theZipCode;
        const newFeatures = this.state.theFeatures;
        const newImage = this.state.theImage;
        const newAddress = this.state.theAddress;

        Axios.post('http://localhost:3000/api/create-property',
        {   theAddress: newAddress, 
            theZipCode: newZip, 
            theFeatures: newFeatures,
            theImage: newImage
        },
        {   withCredentials: true
        })
         .then((responseFromAPI)=>{
            console.log('success', responseFromAPI)
            this.fetchProperties();
         })
         .catch((err)=>{
            console.log('error creating task', err)
         })
    }

    render(){
        return(
        <div className="createPropertyView">
        <div class="mapDiv">
                <h2 class="propertyPageMapTitle">Enter property address</h2>
                <input class="searchInput"></input>
            </div>

            <div class="createPropertyForm">
            <form>
                <div class="formLine">
                <label>Zip Code:</label><br></br>
                <input class="formInput"></input><br></br>
                </div>

                <div class="formLine">
                <label>Features:</label><br></br>
                <input class="formInput"></input><br></br>
                </div>

                <div class="formLine">
                <label>Upload an Image:</label><br></br>
                <input class="formInput"></input><br></br>
                </div>
                <button class="formButton" type="submit">Create</button>
            </form>
            </div>

        </div>
            
        )
    }
}

  
export default createProperty;

