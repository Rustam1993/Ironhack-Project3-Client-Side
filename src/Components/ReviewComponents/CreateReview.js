import React, { Component } from 'react';
import '../../App.css';
import PropertyServices from '../../services/PropertyServices';
import ReviewServices from '../../services/ReviewServices';

class createReview extends Component{
    state={
        message: '',
        ranting: 1,
    }

    serviceProperty = new PropertyServices();
    serviceReview = new ReviewServices();

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value }, () =>{
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.serviceReview.createReview(this.state.message, this.state.rating, this.props.match.params.id)
        .then((reviewFromDB) =>{

            console.log("REVIEW FROM THE DB=========", reviewFromDB)
 
            this.setState({
 
                message: '',
                rating: 0,
    
            })
 
            this.props.history.push('/property/'+this.props.match.params.id)
 
        })
    }

 

    render(){
        console.log(this.props)
        return(
        <div className="createPropertyView">


            <div className="createPropertyForm">
            <form onSubmit={this.handleFormSubmit}>
                
                <div className="formLine">
                    <label>Please leave a message about your experience at this location:</label>
                    <input name="message" onChange = {e => this.handleChange(e)} className="searchInput"></input>
                </div>

                <div className="formLine">
                    <label>Ranking this property on a scale of 1 through 5::</label><br></br>
                    <input name="rating" onChange = {e => this.handleChange(e)} className="formInput"></input><br></br>
                </div>

                <input className="formButton" type="submit"/>
            </form>
            </div>

        </div>
            
        )
    }
}

  
export default createReview;
