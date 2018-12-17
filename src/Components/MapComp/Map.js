import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';






 class GoogleMapsContainer extends Component{

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        currentUser: this.props.showUser()
      }

    render(){

        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
          }

          console.log(this.state.currentUser)

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
    api: (process.env.googleMapsAPIe)
})(GoogleMapsContainer)