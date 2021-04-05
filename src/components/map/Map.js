import React from 'react';
import { withRouter } from 'react-router';
import { Map as GoogleMap, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ReactDOM from "react-dom";
import styled from "styled-components";

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.saveLatestPosition = this.saveLatestPosition.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.state = {
            currentLocation: {lat: 5, lng: 45},
            activeMarker: {},          // Shows the active marker upon click
        };
    }

    onMarkerClick = (props, marker, e) => {
        //TODO: Link to item
        this.setState({
            activeMarker: marker,
        });
    };

    onClose = props => {
        //
    };

    saveLatestPosition(position) {
        this.setState({currentLocation: {lat : position.coords.latitude, lng : position.coords.longitude},});
    }

    getCurrentLocation(){
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(this.saveLatestPosition);
        }
        else{
            console.log("else ")
            throw "you did not allow your location. Please allow it to use the app"
        }
    }

    componentDidMount() {
            this.getCurrentLocation()
    }

    render() {
        console.log(this.state.currentLocation)
        return (
            <GoogleMap
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                center={this.state.currentLocation}
            >
                <Marker onClick={this.onMarkerClick} name={'Marker place'} />
            </GoogleMap>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA0LrnCgNKy53NOcrnzzUkHJxeD5eyeWT4'
})(Map);

