import React, { Component } from 'react';
import '../App.css';
import {Link, Switch, Route} from 'react-router-dom';

import SignupForm       from    './UserComp/SignupForm';
import SingleUser       from    './UserComp/SingleUser'
import ListOfAllUsers   from    './UserComp/ListOfAllUsers'
import LoginForm        from    './UserComp/LoginForm'
import UserService      from    '../services/UserServices'
import CreateProperty   from    './PropertyComp/CreateProperty';
import ViewProperties   from    './PropertyComp/ViewProperties';
import EditProfile      from    './UserComp/EditProfile'
import UserProfile      from    './UserComp/UserProfile'
import PropertyDetail   from    './PropertyComp/PropertyDetail';
import EditProperty     from    './PropertyComp/EditProperty';
import CreateReview     from    './ReviewComponents/CreateReview';
import EditReview       from    './ReviewComponents/EditReview';
import MyGoogleMap              from    './MapComp/Map';


class Main extends Component{
    state = {
        loggedInUser : null,
        signUpForm : false,
        loginForm  : false,
        
       
    }

    service = new UserService();


    logInTheUser = (userToLogIn) => {
        this.setState({loggedInUser: userToLogIn})
    }

    componentDidMount =() =>{
        this.fetchUser()
        
    }

    logout = () =>{
        this.service.logout().then(()=>{
          this.setState({loggedInUser: null});
        })
        this.props.history.push('/')
    }

    fetchUser =() =>{
        this.service.loggedin()
        .then((userFromDB) =>{
            this.setState({
                loggedInUser : userFromDB
            })
        })
        .catch((err) =>{
            console.log('Getting error', err)
            this.setState({
                loggedInUser : false
            })
        })
    }  


    showSignUpForm = () =>{

        this.setState({
            loginForm : false,
            signUpForm : !this.state.signUpForm

        })
    }


    showLoginForm = () =>{

        this.setState({
            signUpForm: false,
            loginForm : !this.state.loginForm

        })
    }


    showUser = () =>{

        return this.state.loggedInUser;

    }




render(){


    return(
        <div className='lightBackground'>
            

            {this.state.loggedInUser ?   

                <div>
                <nav class="navbar navbar-expand-lg redNavBar">
                    <Link class="navbar-brand whiteFont neonHeaderGreen" to = '/myprofile'>My Profile</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link class="navbar-brand whiteFont neonHeaderGreen" to = '/all-properties'>Property Feed</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link class="navbar-brand whiteFont neonHeaderGreen" to = '/create-property'>Add Property</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#"><span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"></a>
                        </li>
                        </ul>
                        <span class="navbar-text">
                            <Link className="mapExtraStyle neonHeaderGreen" to="/google-map">Map</Link>
                        </span>
                        <span class="navbar-text">
                            <Link className="whiteFont neonHeaderGreen" onClick={this.logout} to="/">Log out</Link>
                        </span>
                    </div>
                </nav>                
                </div>

                 :    
                
                <div className="backgroundImageOnHome">     
                    <div class="snowflakes" aria-hidden="true">
                        <div class="snowflake">
                        ❅
                        </div>
                        <div class="snowflakeTwo">
                        ❅
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❅
                        </div>
                        <div class="snowflakeTwo">
                        ❆
                        </div>
                        <div class="snowflake">
                        ❄
                        </div>
                        <div class="snowflakeTwo">
                        ❅
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❅
                        </div>
                        <div class="snowflakeTwo">
                        ❅
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❅
                        </div>
                        <div class="snowflakeTwo">
                        ❆
                        </div>
                        <div class="snowflake">
                        ❄
                        </div>
                        <div class="snowflakeTwo">
                        ❅
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                        <div class="snowflake">
                        ❆
                        </div>
                        <div class="snowflakeTwo">
                        ❄
                        </div>
                    </div>

                <div className="makeFlex">
                <div className="jumbotron extraStylesJumbo">

                    <h1 className="display-4"><a className="neonHeader" href="">Merry & Bright</a></h1>
                    <p className="lead"><a className="whiteLettersHome" href="">You should join our app because it is amazing and fun and 
                    will help you enjoy the Christmas holidays, and be more efficient with your Christmas light viewings. 
                    You will also help others see the best lights in the area! How amazing is that!</a></p>
                    <hr className="my-4 extraStyleHR"/>
                    <h4 className="display-6 neonHeader">How it Works</h4>
                    <p className="lead"><a className="whiteLettersHome" href="">You should join our app because it is amazing and fun and 
                    will help you enjoy the Christmas holidays, and be more efficient with your Christmas light viewings. 
                    You will also help others see the best lights in the area! How amazing is that!</a></p>
                    <hr className="my-4 extraStyleHR"/>
                    <p className="homePageStyleP">Get started here!</p>
                    <Link className="btn btn-lg neonButtons" onClick = {this.showSignUpForm} to ='/'>Join Us </Link>
                    <p className="homePageStyleP">Already have and account? <Link className="linkClass neonHeader" onClick = {this.showLoginForm} to ='/'>Login Here</Link></p>
                    

                </div>
                
            
                <div>
                    {
                        this.state.signUpForm === false && this.state.loginForm === false
                        ?
                        <div className="jumbotron extraStylesJumbo hideThisForm">
                        <Route path = '/'   render = {(props) => <SignupForm  {...props}  logTheUserIntoAppComponent = {this.logInTheUser} />    } />
                        </div>
                        :
                        <div className="jumbotron extraStylesJumbo hideThisForm">
                        <Route path = '/'   render = {(props) => <SignupForm  {...props}  logTheUserIntoAppComponent = {this.logInTheUser} />    } />
                        </div>  

                    }
                    {
                        this.state.signUpForm === true && this.state.loginForm === false
                            ?
                            <div className="jumbotron extraStylesJumbo signUpForm">
                            <Route path = '/'   render = {(props) => <SignupForm  {...props}  logTheUserIntoAppComponent = {this.logInTheUser} />    } />
                            </div>
                            :
                            <div className="jumbotron extraStylesJumbo hideThisForm">
                            <Route path = '/'   render = {(props) => <SignupForm  {...props}  logTheUserIntoAppComponent = {this.logInTheUser} />    } />
                            </div>  

                    }
                    {
                        this.state.loginForm === true && this.state.signUpForm === false
                            ?
                            <div className="jumbotron extraStylesJumbo loginForm">
                            <Route path = '/'   render = {(props) => <LoginForm  {...props}  logTheUserIntoAppComponent = {this.logInTheUser} />    } />
                            </div>
                            :
                            <div className="jumbotron extraStylesJumbo hideThisForm">
                            <Route path = '/'   render = {(props) => <LoginForm  {...props}  logTheUserIntoAppComponent = {this.logInTheUser} />    } />
                            </div>

                    }

                </div>
            </div>
            
            </div>
            }

            <Switch>
                <Route path = '/myprofile'        component = {UserProfile}/>
                <Route path = '/edit-profile/:id' component = {EditProfile}/>
                <Route path='/create-property'    component = {CreateProperty}/>
                <Route path='/all-properties'     render = {(props) => <ViewProperties {...props}   showUser = {this.showUser} /> } />
                <Route path='/property/:id'       render = {(props) => <PropertyDetail {...props}   showUser = {this.showUser} /> } />
                <Route path='/edit-property/:id'  component = {EditProperty}/>
                <Route path='/create-review/:id'  component = {CreateReview}/>
                <Route path='/edit-review/:id'    component = {EditReview}/>

                {/* <Route path='/google-map'         component = {GoogleApiWrapper}/> */}

                <Route path='/google-map'         render = {(props) => <MyGoogleMap {...props}   showUser = {this.showUser} /> } />
                <Route path = '/see-all-users'    component  = {ListOfAllUsers} />
                <Route path = '/user/:id'         component = {SingleUser} />
            </Switch>


          
</div>
    )
}

}


export default Main;