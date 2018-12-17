import React, { Component } from 'react';




import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {

      state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        currentUser: this.props.showUser()
      };
    
      onMarkerClick = (props, marker, e)  =>{
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

  render() {

    const style = {
      
        width: '50%',
        height: '50%'
      
    }
    console.log(this.state.currentUser)


    return (
      <Map   google={this.props.google}
      style={style}
      initialCenter={{
        lat: 37.778519,
        lng: -122.405640
      }}
      >
 
      <Marker onClick={this.onMarkerClick}
                name={this.state.selectedPlace.name} />
 
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
 
       
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_W2wcp6V8KA6Mvt77FLOFXauh3gP-Ats'
})(MapContainer)
