import React, { Component } from 'react';

import '../../App.css'

import {Link, Switch, Route} from 'react-router-dom';

import SignupForm  from '../UserComp/SignupForm';

import LoginForm   from '../UserComp/LoginForm'

class HomePage extends Component{




    render(){
        return(
            <div className="home-page">
                <nav>
                    <Link to = '/'>Home</Link>
                </nav>
                <div className = "joinUs-loginDiv">  
                        <p>there would be so,me text</p>
                        <p>there would be so,me text</p>
                        <p>there would be so,me text</p>
                        <p>there would be so,me text</p>
                        <p>there would be so,me text</p>
                        <Link onClick = {this.showSignUpForm}  to ='/signup'>Join Us </Link>
                        <p>Already have and account?</p>
                        <Link onClick = {this.showLoginForm} to ='/login'>Log in</Link>
                        {/* <Switch>
                        <Route path = '/signup' component={SignupForm} /> 

                        <Route path = '/login' component = {LoginForm} />
                        </Switch> */}
                </div>  
            </div>
        )
    }
}

export default HomePage;