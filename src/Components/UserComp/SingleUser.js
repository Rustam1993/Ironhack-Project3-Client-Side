import React, { Component } from 'react';

import UserService from '../../services/UserServices';




class SingleUser extends Component{


state = {

    link : this.props.match.params.id,
    singleUser : null 
}

service = new UserService();

// componentWillReceiveProps(props){
//     this.setState({
//         link: props.match.params.id,

//     })
// }


componentDidMount(){
    this.getTheUser();

    this.setState({
        link: this.props.match.params.id,

    })
}




 


getTheUser = () => {

    

    this.service.listOneUser(this.state.link)
    .then((singleUserFromDB) =>{
        this.setState({

            singleUser : singleUserFromDB

        })

    })
    // Axios

    // setState
}

showOneUser(){

    let user = this.state.singleUser
if(user){

    return (
        <div>
            <h3> {user.fullName }</h3>
            <h4>{user.email}</h4>
        </div>
    )
}


}


render(){
    console.log(this.state)
    // console.log(this.state)
    // console.log(this.props)
    // console.log(this.props.match.params.id)

    return(
        <div>
            {/* {this.getTheUser()} */}
           {this.showOneUser()} 
        </div>
    )
}

}



export default SingleUser;