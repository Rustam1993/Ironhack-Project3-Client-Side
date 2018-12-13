import React, { Component } from 'react';
import '../../App.css';
import Axios from 'axios';

class viewProperties extends Component{
    state={
        theZipCode: '',
        theFeatures: [],
        theImage: '',
        allTheProperties: [],
    }


    componentWillMount(){
        this.fetchProperties()
    }
 

    fetchProperties = () =>{
         Axios.get('http://localhost:3000/api/property/:id')
         .then((theProperty)=>{
             this.setState({allTheProperties: theProperty.data}, ()=>{
                 console.log(this.state.allTheProperties)
             }) 
         })
         .catch((err)=>{
             console.log(err)
         })
    }


    showPropertyDetails = () => {
        if(this.state.allTheProperties && this.props.currentUser){
            return this.state.allTheProperties
        }
    }


    render(){
        console.log("property details HERE<><><><>", this.showPropertyDetails)
        return(

            <div className="propertyDetailVIew">
                {this.showPropertyDetails()}
            </div>
            
        )
    }

}

export default viewProperties;