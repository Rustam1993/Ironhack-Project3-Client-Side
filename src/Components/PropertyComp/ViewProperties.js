import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import PropertyService from '../../services/PropertyServices';
import ReviewService from '../../services/ReviewServices';
import UserService from '../../services/UserServices';


class viewProperties extends Component{
    state={
        allTheProperties: [],
        currentUser: this.props.showUser(),
        showForm : true
    }

    serviceProperty = new PropertyService();
    serviceReview = new ReviewService();
    serviceUser  = new UserService()

    componentWillMount(){
        this.fetchProperties()
       
    }

    componentWillReceiveProps(){
        this.setState({
            currentUser : this.props.showUser()
        })

    }
 
    fetchProperties = () =>{
         Axios.get(`${process.env.REACT_APP_API_URL}/all-properties`)
         .then((listOfProperties)=>{
             this.setState({allTheProperties: listOfProperties.data}, ()=>{
                //  console.log("this.state.allTheProperties on VIEW PROPERTIES PAGE", this.state.allTheProperties)
             }) 
         })
         .catch((err)=>{
            //  console.log(err)
         })
    }

    deleteProperty = (propertyID) => {
        this.serviceProperty.deleteProperty(propertyID)
        .then((deletedProperty)=>{
            let copyOfAllTheProperties = this.state.allTheProperties

            copyOfAllTheProperties.splice(copyOfAllTheProperties.indexOf(deletedProperty) , 1)

            this.setState({allTheProperties: copyOfAllTheProperties}, ()=>{
                // console.log("ALL THE PROPERTIES", this.state.allTheProperties)
            }) 
        })
        .catch((err)=>{
            // console.log(err)
        })
    }

    
    showPropertyInUserZipCode = () => {

        if(this.state.currentUser){

             const myProperties = this.state.allTheProperties.filter((eachProperty) => {
                if(eachProperty.zipCode == this.state.currentUser.zipCode){
                    
                    return eachProperty 
                }
            })

            this.setState({
                allTheProperties : myProperties
            })

        
        }
    }
    
    addPropertyToUser(id,e){

        e.preventDefault()
        this.serviceProperty.addPropertyToUser(id)
        .then((response) =>{
            console.log('12345',response)
        })


    }



    showAllProperties = () => {
        if(this.state){

            const myProperties = this.state.allTheProperties.filter((eachProperty)=>{
                return eachProperty
            })

            return myProperties.map((eachProperty)=>{
                return(
                    
                   
                    <div className="card addedStyleCard" key={eachProperty._id}>
                        <div style = {{

                            backgroundImage     : `url('${eachProperty.image}')`,
                            backgroundSize      : 'contain',
                            backgroundRepeat    : 'no-repeat', 
                            height              : '20vh',
                            width               : '20vw',
                            backgroundPosition  : 'center',
                            margin              : '1vh auto',
                            borderRadius        : '4px'


                        }}>
                            {/* <img className="card-img-top addedImagePadding allPropertiesCardText" src={eachProperty.image} alt="Card cap"/> */}
                        </div>    
                        <div className="card-body">
                            <h5 className="card-title allPropertiesCardText">{eachProperty.address}</h5>
                            <p className="card-text allPropertiesCardText">Features: {eachProperty.features}</p>

                            <Link className="btn seeDetailsButton" to={'/property/'+ eachProperty._id}>See Details</Link>
                            {  this.state.currentUser && (this.state.currentUser._id !== eachProperty.creator ) ? 
                            
                            <div>
                                <form onSubmit = {(e) => this.addPropertyToUser(eachProperty._id, e)}>
                                    <label className="haveYouSeenThisProp">Have you seen this property?</label>
                                    <button className="yesButton">Yes</button>
                                </form>    
                            </div>
                                :
                        
                               null 
                        
                            }
                           
                        </div>
                    </div>
            )
        })
        }
    }

    render(){

        console.log(this.state.currentUser)
        
        return(

            <div className="allPropertiesBackground"> 

            <div className="searchButtonDiv"> 
                <h1 className="propertyFeed">Property Feed</h1>
                <button className="btn nearMeButton" onClick={this.showPropertyInUserZipCode}>View Properties Near Me</button>
            </div> 

                <div className="flexTheCards">
                {this.showAllProperties()}
                </div>
        
            </div>
        )
    }
}

  
export default viewProperties;




                   
                    
                    

             