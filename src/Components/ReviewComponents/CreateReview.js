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

            
            <div className="createReviewBackground">
             <div class="snowflakes" aria-hidden="true">
                        <div class="snowflake">
                        ❅
                        </div>
                        <div class="snowflakeTwo">
                        ❅
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❅
                        </div>
                        <div class="snowflakeTwo">
                        ❆
                        </div>
                        <div class="snowflake">
                        ❄
                        </div>
                        <div class="snowflakeTwo">
                        ❅
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❅
                        </div>
                        <div class="snowflakeTwo">
                        ❅
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❅
                        </div>
                        <div class="snowflakeTwo">
                        ❆
                        </div>
                        <div class="snowflake">
                        ❄
                        </div>
                        <div class="snowflakeTwo">
                        ❅
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                    </div>
            <h1 className="addReviewHeader">Create a Review</h1>
                <form className="createReviewForm" onSubmit={this.handleFormSubmit}>
                    <div class="form-group createReview">
                    <label className="addReviewLabelFont">Leave a message about your experience at this location:</label>
                        <input name="message" onChange={e => this.handleChange(e)} type="text" class="form-control reviewInputs" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <div class="form-group createReview">
                    <label className="addReviewLabelFont">Rank this property, 1 - 5:</label>
                        <input name="rating" onChange={e => this.handleChange(e)} type="text" class="form-control reviewInputs" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>

                    <input className="btn seeDetailsButton" type="submit" />
                </form>
            </div>
        )
    }
}

  
export default createReview;
