import axios from 'axios';

class UserService {

    constructor(){
        let service = axios.create({
            baseURL: 'http://localhost:3000/api',
            withCredentials: true
        });

        this.service = service;
    }
    //   /signup-user
    
    signup = ( fullName,  email, password, zipCode, profilePic ) =>{

    let formData = new FormData();
    formData.append('theFullName', fullName)
    formData.append('theEmail', email)
    
    formData.append('thePassword', password)
    formData.append('zipCode', zipCode)
    formData.append('the-user-picture', profilePic)

     return this.service.post('/signup-user', formData, { headers : { 'Content-Type' : 'multipart/form-data'}})
     .then(response => response.data)
    }
    //  /login
    login = (email, password) =>{
        return this.service.post('/login', {email, password})
        .then(response => response.data)
        .catch((err) =>{
            console.log(err)
        })
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