import React, { Component } from 'react';

import '../App.css';

import {Link, Switch, Route} from 'react-router-dom';

import SignupForm  from './UserComp/SignupForm';

import SingleUser from './UserComp/SingleUser'

import ListOfAllUsers from './UserComp/ListOfAllUsers'

class Main extends Component{

    state = {
        loggedInUser : null
    }


       logInTheUser = (userToLogIn) => {
     
        this.setState({loggedInUser: userToLogIn})
    }


render(){

    return(
        <div>

            <nav>
            <Link to = '/signup' > Sign up </Link>
            <Link to = '/login'>Login</Link>
            <Link to = '/see-all-users'>Find all users</Link>
            <button>Log out</button>
            </nav>

            <Switch>
                <Route path = '/signup' render = {(props) => <SignupForm {...props} logTheUserIntoAppComponent = {this.logInTheUser}  />  }  />
                <Route path = '/see-all-users' component  = {ListOfAllUsers} />
                <Route path = '/user/:id' component = {SingleUser} />

            </Switch>

        </div>


    )

}

}


export default Main;