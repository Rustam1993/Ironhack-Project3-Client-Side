import axios from 'axios';

class UserService {

    constructor(){
        let service = axios.get({
            baseURL: 'http://localhost:3000/api',
            withCredentials: true
        });

        this.service = service;
    }
    //   /signup-user
    signup = (email, password) =>{
        return this.service.post('/signup-user', {email, password})
        .then(response => response.data)
    }

    //  /login
    login = (email, password) =>{
        return this.service.post('/login', {email, password})
        .then(response => response.data)
    }


    logout = () =>{
        return this.service.post('/logout', {})
        .then(response => response.data)
    }



    loggedin = () =>{
        return this.service.get('/loggedin')
        .then(response => response.data)
    }


}

export default UserService;