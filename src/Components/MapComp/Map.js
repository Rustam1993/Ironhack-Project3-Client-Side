import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PropertyService from '../../services/PropertyServices'


export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentUser: this.props.showUser(),
    arrayOfProperties: [],
   
  };

componentWillMount(){
    this.renderMarkerProperties();
    this.showImage(this.state.selectedPlace.name)
}

  propertyService = new PropertyService()

  onMarkerClicked =(props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };



  renderMarkerProperties = () =>{

    this.propertyService.listAllProperties()
    .then((allProperties) =>{
      this.setState({
        arrayOfProperties : allProperties
      })
    })
    .catch((err) =>{
      console.log(err)
    })
  }


  showMarkers =() =>{
    const {google} = this.props;
      return this.state.arrayOfProperties.map((elementProp, key) =>{
        
        return (
          
            <Marker  icon={{
              url: '/images/marker.png', 
              anchor: new google.maps.Point(16,16),
              scaledSize: new google.maps.Size(24,32)
              }} name ={elementProp.address} key ={key} position={elementProp.latLong} onClick= {this.onMarkerClicked} >
        
            </Marker>

        )
      })
  }

  showImage =(name) =>{
    if(this.state.arrayOfProperties) {
    let property = this.state.arrayOfProperties.find((properties) =>{
      return properties.address == name;
    })
    if(property) return property
    
   }
  }



  findLink = (name) => {
    if(this.state.arrayOfProperties) {
      let property = this.state.arrayOfProperties.find((elementProp) =>{
        return elementProp.address === name
      })
      
      return property !== undefined ? console.log(property._id) : 'h'
    }
  }

  render() {

    const style = {
      
        width: '50%',
        height: '50%'
      
    }

    const imageStyle = {

      height : '10vh'

    }


    console.log(this.state)
    
    this.showImage(this.state.selectedPlace.name)

    return (
      
      
      <div className="styleTheMap">
      <h1 className="mapHeader">Check Out Your Area!</h1>
      <Map   google={this.props.google}
        style={style}
        initialCenter={this.state.currentUser.longLat}
        onClick = {this.onMapClicked} >

        {this.showMarkers()}
 
        <InfoWindow marker = {this.state.activeMarker}
              visible = {this.state.showingInfoWindow}>

              <div>
                  <p>{this.state.selectedPlace.name}</p>
                  
                  {/* <Link to = { '/property/' + this.findLink(this.state.selectedPlace.name)}>{this.state.selectedPlace.name}</Link> */}
                  { this.showImage(this.state.selectedPlace.name) ?  
                  <div>

                    <img style = {imageStyle} src = {this.showImage(this.state.selectedPlace.name).image} alt='map'/>
                  
                  </div>
                  :
                    ''
                
                
                }
                  {/* {this.showImage(this.state.selectedPlace.name)} */}
              </div>
             </InfoWindow> 
 
       
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_W2wcp6V8KA6Mvt77FLOFXauh3gP-Ats'
})(MapContainer)
