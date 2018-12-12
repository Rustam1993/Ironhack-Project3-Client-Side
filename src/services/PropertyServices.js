import axios from 'axios';

class PropertyServices {

    constructor(){
        let service = axios.get({
            baseURL: 'http://localhost:3000/api',
            withCredentials: true
        });

        this.service = service;
    }



}

export default PropertyServices;