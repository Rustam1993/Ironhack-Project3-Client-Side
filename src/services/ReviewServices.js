import axios from 'axios';

class ReviewServices {

    constructor(){
        let service = axios.create({
            baseURL: 'http://localhost:3000/api',
            withCredentials: true
        });

        this.serviceReview = service;
    }


    createReview = (message, rating, id) => {
         
        return this.serviceReview.post('/create-review/'+id,  {message: message, rating: rating},
        {withCredentials: true})
            .then((response) => {
            console.log("the response from this.serviceReview.create/review", response)    
            return response.data
            })
    }


//     listOneProperty = (propertyID) =>{
//         return this.serviceReview.get(`/property/${propertyID}`)
//         .then(response => response.data)
//     }


//     editProperty = (image, address, features, id) => {
//         let formData = new FormData();
//         formData.append('the-picture', image)
//         formData.append('address', address)
//         formData.append('features', features)
//         console.log("formData<><><><><><><><><><>", formData)

//         return this.serviceReview.post('/edit-property/'+id, formData, {headers : {'Content-Type' : 'multipart/form-data'}})
//             .then((response) => {
//             console.log("RESPONSE FROM POST EDIT PROPERTY<><><><><><><>", response)    
//             return response.data
//             })
//     }

//     deleteProperty = (propertyID) =>{
//         return this.serviceReview.post(`/delete-property/${propertyID}`)
//         .then((propertyDeleted)=>{
//             console.log("This property has been deleted successfully")
            
//         })
//     }

}

export default ReviewServices;