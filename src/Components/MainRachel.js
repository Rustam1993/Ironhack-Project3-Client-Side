import React, { Component } from 'react';
import '../App.css';
import CreateProperty from './CreateProperty';
import ViewProperties from './ViewProperties';

import {Switch, Route, Link} from 'react-router-dom';


class Main_rachel extends Component{

    render(){

        return(
            <div>
                <div className="createPropLink">
                    <Link to = '/create-property'>Create Property</Link><br></br>
                    <Link to = '/api/all-properties'>View ALL Properties</Link>
                </div>

                <Switch>
                    <Route exact path='/create-property' component = {CreateProperty}/>
                    <Route exact path='/api/all-properties' component = {ViewProperties}/>
                </Switch>

            </div>
        )
    }
}


export default Main_rachel;