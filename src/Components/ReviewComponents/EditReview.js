import React, { Component } from 'react';
import '../../App.css';
import ReviewServices from '../../services/ReviewServices';
import PropertyServices from '../../services/PropertyServices';

class editReview extends Component{
    state={
        message: '',
        rating: 1,
        
    }

    serviceReview = new ReviewServices();
    serviceProperty = new PropertyServices();

    componentWillMount(){
        let theID = this.props.match.params.id;
        this.serviceReview.listOneReview(theID)

        .then((theThingIGetBackFromApi)=>{
            console.log("API.DATA______________", theThingIGetBackFromApi)
            this.setState({
                message: theThingIGetBackFromApi.message,
                rating: theThingIGetBackFromApi.rating
            })
        }).catch(()=>{

        })
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value }, () =>{
            console.log('REVIEW STATE<><><><><><><><>', this.state)
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        this.serviceReview.editReview(this.state.message, this.state.rating, this.props.match.params.id)
        .then((reviewFromDB) =>{

            this.props.history.push('/') //property/'+this.props.match.params.id
        })
    }


    render(){
        
        return(

            <div className="createPropertyView">

            <div className="createPropertyForm">
            <form onSubmit={this.handleFormSubmit}>
                
                <div className="formLine">
                    <label>Please leave a message about your experience at this location:</label>
                    <input name="message" value={this.state.message} onChange = {e => this.handleChange(e)} className="searchInput"></input>
                </div>

                <div className="formLine">
                    <label>Ranking this property on a scale of 1 through 5::</label><br></br>
                    <input name="rating" value={this.state.rating} onChange = {e => this.handleChange(e)} className="formInput"></input><br></br>
                </div>

                <input className="formButton" type="submit"/>
            </form>
            </div>

        </div>
            
        )
    }

}

export default editReview;