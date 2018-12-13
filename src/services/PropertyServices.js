import axios from 'axios';

class PropertyServices {

    constructor(){
        let service = axios.create({
            baseURL: 'http://localhost:3000/api',
            withCredentials: true
        });

        this.service = service;
    }

    //create new property (have not tested yet)
    createProperty = (image, address, features) => {
        let formData = new FormData();
        formData.append('the-picture', image)
        formData.append('features', features)
        formData.append('address', address)

        return this.service.post('/create-property', formData, { headers : { 'Content-Type' : 'multipart/form-data'}})
            .then((response) => {
            console.log(response)    
            return response.data
            })
    }


    listOneProperty = (propertyID) =>{
        return this.service.get(`/property/${propertyID}`)
        .then(response => response.data)
    }


    editProperty = (image, address, features, id) => {
        let formData = new FormData();
        formData.append('the-picture', image)
        formData.append('features', features)
        formData.append('address', address)
        console.log(this)

        return this.service.post('/edit-property/'+id, formData, {headers : {'Content-Type' : 'multipart/form-data'}})
            .then((response) => {
            console.log(response)    
            return response.data
            })
    }

}

export default PropertyServices;