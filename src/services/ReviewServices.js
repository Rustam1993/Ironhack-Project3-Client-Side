import axios from 'axios';

class ReviewServices {

    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        });

        this.serviceReview = service;
    }

    listOneReview = (reviewID) =>{
        return this.serviceReview.get(`/review/${reviewID}`)
        .then(response => response.data)
    }


    createReview = (message, rating, id) => {
         
        return this.serviceReview.post('/create-review/'+id,  {message: message, rating: rating},
        {withCredentials: true})
            .then((response) => {
            console.log("the response from this.serviceReview.create/review", response)    
            return response.data
            })
    }



    editReview = (message, rating, id) => {
 
        return this.serviceReview.post('/edit-review/'+id, {message: message, rating: rating},
        {withCredentials: true})
            .then((response) => {
            console.log("RESPONSE FROM POST EDIT REVIEW<><><><><><><>", response)    
            return response.data
            })
    }



    deleteReview = (reviewId) =>{
        return this.serviceReview.post(`/delete-review/${reviewId}`)
        .then(()=>{
            console.log("This review has been deleted successfully")

            
        })
    }

}

export default ReviewServices;