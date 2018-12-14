import axios from 'axios';

class ReviewServices {

    constructor(){
        let service = axios.create({
            baseURL: 'http://localhost:3000/api',
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


//     deleteProperty = (propertyID) =>{
//         return this.serviceReview.post(`/delete-property/${propertyID}`)
//         .then((propertyDeleted)=>{
//             console.log("This property has been deleted successfully")
            
//         })
//     }

}

export default ReviewServices;