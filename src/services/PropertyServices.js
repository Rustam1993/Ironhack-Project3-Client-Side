import axios from 'axios';

class PropertyServices {

    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        });

        this.serviceProperty = service;
    }

    listAllProperties = () =>{

        return this.serviceProperty.get('/all-properties')
        .then(response => response.data)

    }

    createProperty = (image, address, features) => {
        let formData = new FormData();
        formData.append('the-picture', image)
        formData.append('features', features)
        formData.append('address', address)

        return this.serviceProperty.post('/create-property', formData, { headers : { 'Content-Type' : 'multipart/form-data'}})
            .then((response) => {
            console.log(response)    
            return response.data
            })
    }


    listOneProperty = (propertyID) =>{
        return this.serviceProperty.get(`/property/${propertyID}`)
        .then(response => response.data)
    }


    editProperty = (image, address, features, id) => {
        let formData = new FormData();
        formData.append('the-picture', image)
        formData.append('address', address)
        formData.append('features', features)
        console.log("formData<><><><><><><><><><>", formData)

        return this.serviceProperty.post('/edit-property/'+id, formData, {headers : {'Content-Type' : 'multipart/form-data'}})
            .then((response) => {
            console.log("RESPONSE FROM POST EDIT PROPERTY<><><><><><><>", response)    
            return response.data
            })
    }

    addPropertyToUser = (propertyID) =>{

        return this.serviceProperty.post(`/add-property-to-user/${propertyID}`)
        .then(response => response.data)
    }

    deleteProperty = (propertyID) =>{
        return this.serviceProperty.post(`/delete-property/${propertyID}`)
        .then((propertyDeleted)=>{
            console.log("This property has been deleted successfully")
            
        })
    }

}

export default PropertyServices;