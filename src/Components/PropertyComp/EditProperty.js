import React, { Component } from 'react';
import '../../App.css';
import Axios from 'axios';
import {Link, Switch, Route} from 'react-router-dom';
import PropertyService from '../../services/PropertyServices';

class editProperties extends Component{
    state={
        theActualProperty: '',
        propertyID: '',
        theAddress: '',
        theFeatures: [],
        editing: false
        
    }


    service = new PropertyService();


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value }, () =>{
            // console.log(this.state)
        })
    }


    handleFileChange(e){
        e.preventDefault()
        this.setState({
            theImage: e.target.files[0]
        }, () =>{
        // console.log(this.state)
     })
    }

    componentWillMount(){
        console.log(this.props)

        //console.log(this.props.match.params.id)
        let theID = this.props.match.params.id;
        Axios.get('http://localhost:3000/api/property/')
        .then((theThingIGetBackFromApi)=>{

            this.setState({
                theActualProperty: theThingIGetBackFromApi.data,
                propertyID: theThingIGetBackFromApi.data._id,
                theAddress: theThingIGetBackFromApi.data.address,
                theFeatures: theThingIGetBackFromApi.data.features
            })

        }).catch(()=>{

        })
    }


    toggleForm = () =>{
        this.setState({editing: true})
    }


    handleFormSubmit = (e) => {
        e.preventDefault();
        this.service.editProperty(this.state.theImage, this.state.theAddress, this.state.theFeatures, this.props.match.params.id)
        .then(() =>{
            this.props.history.push('/')
        })
    }


    render(){
        // console.log("property details HERE<><><><>", this.state)
        return(

    <div className="createPropertyForm">

        <form onSubmit={this.handleFormSubmit}>

            <div className="formLine">
                <label>Address:</label><br></br>
                <input name="theAddress" onChange = {e => this.handleChange(e)} value={this.state.theAddress} className="formInput"></input><br></br>
            </div>

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
            
        )
    }

}

export default editProperties;