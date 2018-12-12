import React, { Component } from 'react';

import '../App.css';

import {Link} from 'react-router-dom';

class Main extends Component{



render(){

    return(
        <div>
            <Link to = '/signup-user' > Sign up </Link>
        </div>
    )

}

}


export default Main;