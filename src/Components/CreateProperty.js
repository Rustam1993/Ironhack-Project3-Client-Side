import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';
import PropertyServices from '../services/PropertyServices';

class createProperty extends Component{
    state={
        theAddress: '',
        theFeatures: [],
        theImage: '',
    }

    service = new PropertyServices();

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    handleFileChange(e){
        e.preventDefault()
        this.setState({
            fileInput: e.target.files[0]
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.service.createProperty(this.state.theImage, this.state.theAddress, this.state.theFeatures)
        .then((propertyFromDB) =>{
            // this.props.logTheUserIntoAppComponent(userFromDB);
 
            this.setState({
 
                theAddress: '',
                theFeatures: [],
                theImage: '',
    
            })
 
            this.props.history.push('/')
 
        })
    }

    createANewProject = (e) => {
        e.preventDefault();
        const newFeatures = this.state.theFeatures;
        const newImage = this.state.theImage;
        const newAddress = this.state.theAddress;

        Axios.post('http://localhost:3000/api/create-property',
        {   theAddress: newAddress, 
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


            <div className="createPropertyForm">
            <form onSubmit={this.handleFormSubmit}>
                {/* <div class="mapDiv"> */}
                    <h2 className="propertyPageMapTitle">Enter property address</h2>
                    <input name="theAddress" onChange = {e => this.handleChange(e)} value={this.state.theAddress} className="searchInput"></input>
                {/* </div> */}

                <div className="formLine">
                <label>Features:</label><br></br>
                <input name="theFeatures" onChange = {e => this.handleChange(e)} value={this.state.theFeatures} className="formInput"></input><br></br>
                </div>

                <div className="formLine">
                <label>Upload an Image:</label><br></br>
                <input type="file" name="theAddress" onChange = {e => this.handleFileChange(e)} className="formInput"></input><br></br>
                </div>

                <input className="formButton" type="submit"/>
            </form>
            </div>

        </div>
            
        )
    }
}

  
export default createProperty;

