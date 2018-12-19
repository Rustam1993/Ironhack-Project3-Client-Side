import axios from 'axios';
import PropertyServices from './PropertyServices';

class UserService {

    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        });

        this.service = service;
    }
    //   /signup-user
    
    signup = (email,  password, fullName, profilePic, address ) =>{

        console.log(email,  password, fullName, profilePic, address)

    let formData = new FormData();
    formData.append('theEmail', email)
    formData.append('thePassword', password)
    formData.append('theFullName', fullName)
    formData.append('the-user-picture', profilePic)
    formData.append('address', address)
    

     return this.service.post('/signup-user', formData, { headers : { 'Content-Type' : 'multipart/form-data'}})
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

    // Show all user list

    listAllUsers = () =>{

        return this.service.get('/all-users')
        .then(response => response.data)

    }

    listOneUser = (userID) =>{
        return this.service.get(`/user/${userID}`)
        .then(response => response.data)
    }

    editUser = (email, password, fullName, image , userID) =>{
        
        let formData = new FormData()

        formData.append('theEmail', email)
        formData.append('thePassword', password)
        formData.append('theFullName', fullName)
        formData.append('the-picture', image)
    
        return this.service.post(`/edit-user/${userID}` , formData, {headers : {'Content-Type' : 'multipart/form-data'}})
        .then(response => response.data)

     

    }
}

export default UserService;