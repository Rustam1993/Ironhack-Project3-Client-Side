import React, { Component } from 'react';
import '../../App.css';
import PropertyServices from '../../services/PropertyServices';

class createProperty extends Component{
    state={
        theAddress: '',
        theFeatures: [],
        theImage: '',
    }

    serviceProperty = new PropertyServices();

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
        this.serviceProperty.createProperty(this.state.theImage, this.state.theAddress, this.state.theFeatures)
        .then((propertyFromDB) =>{

            console.log(propertyFromDB)
 
            this.setState({
 
                theAddress: '',
                theFeatures: [],
                theImage: '',
    
            })
 
            this.props.history.push('/all-properties')
 
        })
    }

    

    render(){
        return(

            <div className="addPropertyBackgroundImage">
 
                <form className="CreatePropertyForm createNewPropForm" onSubmit={this.handleFormSubmit}>

                <h1>Add New Property</h1>
                    <div class="form-group">
                        <label>Enter property address</label>
                        <input name="theAddress" onChange = {e => this.handleChange(e)} type="text" placeholder="Enter Street Address" class="form-control createPropFormInput" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                        <label>Features</label>
                        <input name="theFeatures" onChange = {e => this.handleChange(e)} type="text" placeholder="lights, decorations, music, carolers, holiday beverages" class="form-control createPropFormInput" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                    <label>Upload an Image</label>
                        <input type="file" name="theImage" onChange = {e => this.handleFileChange(e)} class="form-control createPropFormInput" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                    </div>

                    <input className="btn btn-primary createPropButton" type="submit" />
                </form>
                {/* <img className="blinkingLights" width="500px" src="https://media.giphy.com/media/igDCaeXwOslQk/source.gif"/> */}
            </div>
            
        )
    }
}

  
export default createProperty;

