import React from 'react';
import { withRouter } from 'react-router';
import { Map as GoogleMap, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ReactDOM from "react-dom";


const mapStyles = {
  width: '100%',
  height: '100%'
};

class Map extends React.Component {
    //TODO states if user click on another user, Park or WalkingRoute
    constructor(props) {
        super(props);
        this.saveLatestPosition = this.saveLatestPosition.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);

        this.state = {
            currentLocation: {lat: 5,
            lng: 45},
            showingInfoWindow: false,  // Hides or shows the InfoWindow
            activeMarker: {},          // Shows the active marker upon click
            selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
        };
    }
    //TODO adapt InfoWindow = other users, park or walking routes
    /*  InfoWindow, which is a component in the google-maps-react library
    which gives you the ability for a pop-up window showing details of the clicked Marker*/
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    saveLatestPosition(position) {
        this.setState({currentLocation: {lat : position.coords.latitude, lng : position.coords.longitude},});
    }
    getCurrentLocation(){
        if ("geolocation" in navigator) {
            //state die aktuelle Coordinate und denn ahpasse
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
                //centerAroundCurrentLocation
            >
                <Marker onClick={this.onMarkerClick} name={'Marker place'} />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </GoogleMap>
            )
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA0LrnCgNKy53NOcrnzzUkHJxeD5eyeWT4'
})(Map);

