import React, { Component } from 'react';
import '../../App.css';
import Axios from 'axios';
import {Link, Switch, Route} from 'react-router-dom';
import PropertyService from '../../services/PropertyServices';

class propertyDetails extends Component{
    state={
        link: this.props.match.params.id,
        singleProperty: null,
    }

    service = new PropertyService();

    componentWillMount(){
        this.getTheProperty();

        this.setState({
            link: this.props.match.params.id,

    })
    }
 

    getTheProperty = () => {
        this.service.listOneProperty(this.state.link)
        .then((singlePropertyFromDB)=>{
            this.setState({
                singleProperty: singlePropertyFromDB
            })
        })
    }


    showOneProperty(){
            if(this.state.singleProperty){
                return(
                    <div>
                        <img className="propertyImage" src={this.state.singleProperty.image}></img>
                        <h3> {this.state.singleProperty.address}</h3>
                        <h4>{this.state.singleProperty.features}</h4>
                    </div>
                )
    }
}


    render(){
        console.log("property details HERE<><><><>", this.state)
        return(

            <div className="propertyDetailVIew">
            <p>PROPERTY DETAIL PAGE IS WORKING!</p>
            {this.showOneProperty()}
            </div> 
        )
    }
}

export default propertyDetails;