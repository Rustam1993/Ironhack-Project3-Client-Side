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
            console.log(this.state)
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

            this.props.history.push('/')
        })
    }


    render(){
        // console.log("property details HERE<><><><>", this.state)
        return(

            <div className="editProfDiv editPropertyBackground">
                <form className="editProfileForm" onSubmit={this.handleFormSubmit}>
                    <div class="form-group">
                        <label>Address</label>
                        <input name="theAddress" value={this.state.theAddress} onChange={e => this.handleChange(e)} type="text" placeholder="Full name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                        <label>Features</label>
                        <input name="theFeatures" onChange = {e => this.handleChange(e)} value={this.state.theFeatures} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                    <label>Profile Pic</label>
                        <input type="file" name="theImage" onChange = {e => this.handleFileChange(e)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                    </div>

                    <input className="btn btn-primary extraStylesButton" type="submit" />
                </form>
            </div>
            
        )
    }

}

export default editProperties;