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
    createProperty = (  image, address, features) => {
        let formData = new FormData();
        formData.append('the-picture', image)
        formData.append('features', features)
        formData.append('address', address)

        return this.service.post('/create-property', formData, { headers : { 'Content-Type' : 'multipart/form-data'}})
            .then(response => response.data)
    }



}

export default PropertyServices;