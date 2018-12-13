import React, { Component } from 'react';
import '../../App.css';
<<<<<<< HEAD
=======
import Axios from 'axios';
>>>>>>> master
import PropertyServices from '../../services/PropertyServices';

class createProperty extends Component{
    state={
        theAddress: '',
        theFeatures: [],
        theImage: '',
    }

    service = new PropertyServices();

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value }, () =>{
            console.log(this.state)
        })
    }

    handleFileChange(e){
        e.preventDefault()
        this.setState({
            theImage: e.target.files[0]
        }, () =>{
        console.log(this.state)
     })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.service.createProperty(this.state.theImage, this.state.theAddress, this.state.theFeatures)
        .then((propertyFromDB) =>{

            console.log(propertyFromDB)
            // this.props.logTheUserIntoAppComponent(userFromDB);
 
            this.setState({
 
                theAddress: '',
                theFeatures: [],
                theImage: '',
    
            })
 
            this.props.history.push('/')
 
        })
    }

 

    render(){
        return(
        <div className="createPropertyView">


            <div className="createPropertyForm">
            <form onSubmit={this.handleFormSubmit}>
                
                <h2 className="propertyPageMapTitle">Enter property address</h2>

                <input name="theAddress" onChange = {e => this.handleChange(e)} value={this.state.theAddress} className="searchInput"></input>
                

                <div className="formLine">
                <label>Features:</label><br></br>

                <input name="theFeatures" onChange = {e => this.handleChange(e)} value={this.state.theFeatures} className="formInput"></input><br></br>

                </div>

                <div className="formLine">
                <label>Upload an Image:</label><br></br>

                <input type="file" name="theImage" onChange = {e => this.handleFileChange(e)} className="formInput"></input><br></br>

                </div>

                <input className="formButton" type="submit"/>
            </form>
            </div>

        </div>
            
        )
    }
}

  
export default createProperty;

