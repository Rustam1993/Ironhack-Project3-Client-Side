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

            
            <div className="editProfDiv createReviewBackground">
                <form className="editProfileForm" onSubmit={this.handleFormSubmit}>
                    <div class="form-group">
                    <label>Please leave a message about your experience at this location:</label>
                        <input name="message" onChange={e => this.handleChange(e)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                    <label>Ranking this property on a scale of 1 through 5::</label>
                        <input name="rating" onChange={e => this.handleChange(e)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <input className="btn btn-primary extraStylesButton" type="submit" />
                </form>
            </div>
        )
    }
}

  
export default createReview;
