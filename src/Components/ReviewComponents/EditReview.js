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
                <form className="editProfileForm" onSubmit={this.handleFormSubmit}>
                    <div class="form-group">
                    <label>Please leave a message about your experience at this location:</label>
                        <input name="message" value={this.state.message} onChange={e => this.handleChange(e)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group">
                    <label>Ranking this property on a scale of 1 through 5::</label>
                        <input min='1' max = '5'  name="rating" value={this.state.rating} onChange={e => this.handleChange(e)} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <input className="btn btn-primary extraStylesButton" type="submit" />
                </form>
            </div>
            
        )
    }

}

export default editReview;