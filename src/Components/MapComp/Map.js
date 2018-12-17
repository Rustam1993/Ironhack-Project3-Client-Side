import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';






 class GoogleMapsContainer extends Component{

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      }

    render(){

        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
          }

          return(
            <Map
            item
            xs = { 12 }
            style = { style }
            google = { this.props.google }
            
            zoom = { 14 }
            initialCenter = {{ lat: 39.648209, lng: -75.711185 }}
          />
          )
         
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB_W2wcp6V8KA6Mvt77FLOFXauh3gP-Ats'
})(GoogleMapsContainer)