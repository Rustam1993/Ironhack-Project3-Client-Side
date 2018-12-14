import React, { Component } from 'react';
import '../../App.css';
import PropertyService from '../../services/PropertyServices';

class editProperties extends Component{
    state={
        theActualProperty: '',
        propertyID: '',
        theAddress: '',
        theFeatures: [],
        editing: false
        
    }

    serviceProperty = new PropertyService();


    componentWillMount(){
        let theID = this.props.match.params.id;
        this.serviceProperty.listOneProperty(theID)
        .then((theThingIGetBackFromApi)=>{
            console.log("API.DATA______________", theThingIGetBackFromApi)
            this.setState({
                theActualProperty: theThingIGetBackFromApi,
                propertyID: theThingIGetBackFromApi._id,
                theAddress: theThingIGetBackFromApi.address,
                theFeatures: theThingIGetBackFromApi.features
            })
        }).catch(()=>{

        })
    }


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


    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this)
        this.serviceProperty.editProperty(this.state.theImage, this.state.theAddress, this.state.theFeatures, this.props.match.params.id)
        .then((propertyFromDB) =>{
            // console.log("PROPERTY from DB", propertyFromDB)
 
            // this.setState({
            //     theAddress: '',
            //     theFeatures: [],
            //     theImage: '',
            // })
 
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