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

            this.props.history.push('/myprofile') 
        })
    }


    render(){
        
        return(

            <div className="editProfDiv">
            <h1 className="propertyFeed">Review this Property</h1>
                <form className="editProfileForm" onSubmit={this.handleFormSubmit}>
                    <div class="form-group">
                    <label>Leave a message about your experience:</label>
                        <input name="message" value={this.state.message} onChange={e => this.handleChange(e)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                    <label>Rank this property 1-5:</label>
                        <input min='1' max = '5'  name="rating" value={this.state.rating} onChange={e => this.handleChange(e)} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <input className="btn seeDetailsButton" type="submit" />
                </form>
            </div>
            
        )
    }

}

export default editReview;