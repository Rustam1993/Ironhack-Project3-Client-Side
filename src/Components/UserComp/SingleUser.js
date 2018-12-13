import React, { Component } from 'react';

import UserService from '../../services/UserServices';




class SingleUser extends Component{


state = {

    link : this.props.match.params.id

}

service = new UserService;

componentWillReceiveProps(props){
    this.setState({
        link: props.match.params.id
    }, ()=>{

        this.getTheUser()

    })
}

 theId = this.props.match.params.id


getTheUser = () => {



    this.service.listOneUser(this.state.link)
    // Axios

    // setState
}

showOneUser(theUserId){



}


render(){

    // console.log(this.state)
    // console.log(this.props)
    // console.log(this.props.match.params.id)

    return(
        <div>
            haha
        </div>
    )
}

}



export default SingleUser;