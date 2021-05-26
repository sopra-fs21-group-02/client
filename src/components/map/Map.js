import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';

import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import ReactDOM from "react-dom";
import styled, {keyframes} from "styled-components";
import {Button} from "../../views/design/Button";
import RecenterMap from "../../views/design/icons/RecenterMap";
import { ApiClient, Coordinate, UsersApi } from 'sopra-fs21-group-02-dogs-api';
import GetApiClient from '../../helpers/ApiClientFactory';
import Users from '../../views/design/icons/Users';


const Dog1 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(45deg) translateX(80px) rotate(-45deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -2s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(-180deg) translateX(80px) rotate(180deg); }
\tto   {  transform: rotate(180deg) translateX(80px) rotate(-180deg); }
`

const Dog2 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(90deg) translateX(80px) rotate(-90deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -1s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(0deg) translateX(80px) rotate(0deg); }
\tto   {  transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`

const Dog3 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(45deg) translateX(80px) rotate(-45deg);
  animation: orbit2 3s linear infinite; 
  @keyframes orbit2 {
\tfrom  {  transform: rotate(-180deg) translateX(80px) rotate(180deg); }
\tto   {  transform: rotate(180deg) translateX(80px) rotate(-180deg); }
`
const Dog4 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(90deg) translateX(80px) rotate(-90deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -3.5s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(0deg) translateX(80px) rotate(0deg); }
\tto   {  transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`
const Dog5 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(90deg) translateX(80px) rotate(-90deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -4.5s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(0deg) translateX(80px) rotate(0deg); }
\tto   {  transform: rotate(360deg) translateX(80px) rotate(-360deg); }
`

const Dog6 = styled.div`
  position: absolute;
  left: center;
  top: center;
  transform: rotate(45deg) translateX(80px) rotate(-45deg);
  animation: orbit2 3s linear infinite; 
  animation-delay: -5.5s;
  @keyframes orbit2 {
\tfrom  {  transform: rotate(-180deg) translateX(80px) rotate(180deg); }
\tto   {  transform: rotate(180deg) translateX(80px) rotate(-180deg); }
`


const style = {
  width: '100%',
  height: '100%'
};

const containerStyle = {
  position: 'relative',  
  width: '100%',
  height: '100%'
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.saveLatestPosition = this.saveLatestPosition.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.redirectToCurrentLocation = this.redirectToCurrentLocation.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
    this._mapLoaded = this._mapLoaded.bind(this);
    this.handlePositionError = this.handlePositionError.bind(this);
    this.getUsersCallback = this.getUsersCallback.bind(this);

    this.updatePosition = undefined;
    
    this.state = {
      mapZoom: 14,
      center: {lat: 47.497215999999995, lng: 8.71956479999999},
      currentLocation: {lat: null, lng: null},
      activeMarker: {},          // Shows the active marker upon click
      users: [],
      centerAroundCurrentLocation: true,
      isMapDragged: false,
      isLocationAvailable: true,
      isLocationDenied: false
    };
  }

  _mapLoaded(mapProps, map) {
    this.map = map;
    map.setOptions({
      styles: mapStyle
    })
  }

  onMarkerClick = (props, marker, e) => {
    let url = "/map/users/" + marker.id.toString();
    this.props.history.push(url);
  };

  saveLatestPosition(position) {
    this.setState({
      currentLocation: {lat: position.coords.latitude, lng: position.coords.longitude},
      isLocationAvailable: true,
      isLocationDenied: false
    });
    
    if (this.state.isMapDragged === false){
      if (this.map) {
        this.map.panTo(this.state.currentLocation);
      }
    }

    let client = GetApiClient();
    let api = new UsersApi(client);
    let loc = {
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude
    };
    let userId = localStorage.getItem('loggedInUserId');
    api.updateLocation(userId, loc, this.locationPutCallback)
  }

  locationPutCallback(error, data, response) {
    if (error) {
      console.error();
    }
  }

  handlePositionError(error) {
    if (error.code == error.PERMISSION_DENIED) {
      this.setState({
        currentLocation: { lat: null, lng: null },
        isLocationDenied: true
      });
    }
  }

  getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.saveLatestPosition, this.handlePositionError);
    } else {
      this.setState({ isLocationAvailable: false });
    }
  }

  centerMoved(mapProps, map) {
    if (this.state.isMapDragged) { return; }
    this.setState({
      isMapDragged: true,
    })
  }

  redirectToCurrentLocation() {
    if (!this.state.isMapDragged) { return; }
    this.map.setZoom(14);
    this.map.panTo(this.state.currentLocation);
    this.setState({
      isMapDragged: false
    })

    // Re-set map dragged state once pan/zoom reset is done animating
    let panFinishCallback = () => {
      this.setState({
        isMapDragged: false
      });
    }
    panFinishCallback = panFinishCallback.bind(this);
    this.props.google.maps.event.addListenerOnce(this.map, 'idle', panFinishCallback);
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      this.getCurrentLocation();

      // Listen for changes to the user's position
      this.updatePosition = navigator.geolocation.watchPosition(this.saveLatestPosition, this.handlePositionError);

      // Listen for permission changes to re-load location
      if (typeof PermissionStatus !== 'undefined') {
        PermissionStatus.onchange = () => { this.getCurrentLocation(); }
      }
    }

    let client = GetApiClient();
    let usersApi = new UsersApi(client);
    usersApi.getAllUsers(this.getUsersCallback);
  }

  getUsersCallback(error, data, response) {
    if(error) {
      console.error(error);
      return;
    }

    this.setState({
      users: response.body
    });
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.updatePosition);
  }

  render() {
    let showOverlay = this.state.currentLocation.lat === null || 
                      this.state.currentLocation.lng === null ||
                      !this.state.isLocationAvailable ||
                      this.state.isLocationDenied;

    let overlayText = "";
    if (showOverlay && this.state.isLocationDenied) {
      overlayText = "Please allow location and reload the page!";
    } else if (showOverlay && this.state.isLocationAvailable) {
      overlayText = "Loading...";
    } else if (showOverlay) {
      overlayText = "Your browser does not support location tracking."
    }
    
    return (
        <div className="flex flex-col h-screen  w-full">
          <div className="flex-1">
            {showOverlay ?
              <div className="space-x-4 z-50 w-screen h-full flex-1 overflow-auto p-4 z-10 bg-gray-100" disabled={true}>
                <div className="flex h-16 mt-20 flex-col items-center flex justify-center  text-4xl" >
                  <Dog1 >🐩</Dog1>
                  <Dog2>🐕‍🦺</Dog2>
                  <Dog3>🐕</Dog3>
                  <Dog4>🦮</Dog4>
                  <Dog5>🐆</Dog5>
                  <Dog6>🐅</Dog6>


                  <span className="flex">🦴 </span>
                </div>
                <h1 className=" p-16 mx-auto text-center font-semibold text-2xl mt-5 text-gray-900 ">{overlayText}</h1>
              </div>
              :
              <div className="z-50 w-screen h-full flex-1">
                <GoogleMap
                  google={this.props.google}
                  style={style}
                  containerStyle={containerStyle}
                  center={this.state.center}
                  initialCenter={{ lat: 47.380391912642196, lng: 8.536707613815768}} // Zurich
                  zoom={this.state.mapZoom}
                  fullscreenControl={false}
                  mapTypeControl={true}
                  onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
                  onDragstart={this.centerMoved}
                  onZoomChanged={this.centerMoved}
                  streetViewControl={false}
                  mapTypeControlOptions={
                    ["styled_map", "satellite", "hybrid", "terrain"]
                  }
                >

                  {/* Other Users */}
                  {this.state.users.map((user, id) => {
                    let iconUrl = "";
                    if (user.status === "ONLINE") {
                      iconUrl = "/images/map/marker-online.png";
                    } else {
                      iconUrl = "/images/map/marker-offline.png";
                    }
                    let userLocation = user.latestLocation || {latitude: undefined, longitude: undefined};
                    return (
                      <Marker
                        title={user.name}
                        name={user.name}
                        id={user.id}
                        key={user.id}
                        // TODO: Handle case where user doesn't have a latestLocation (yet)...
                        position={{lat: userLocation.latitude, lng: userLocation.longitude}}
                        onClick={this.onMarkerClick}
                        icon={iconUrl}/>
                    )
                  })}

                  {/* Users Current Location */}
                  <Marker
                    title={"Your current location"}
                    key={this.id}
                    position={{lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng}}
                    icon={"/images/map/marker-own.png"}/>

                  <div className="bg-gray-300 hover:bg-gray-400 p-2.5 cursor-pointer absolute bottom-28 right-2.5 ">
                    <RecenterMap
                      active={this.state.isMapDragged}
                      onClick={() => this.redirectToCurrentLocation()}
                    />
                  </div>
                </GoogleMap>
              </div>
            }
          </div>
          <div className="flex-none">
            <TabBar active="map"/>
          </div>
        </div>
    )
  }
}

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "labels.icon",
    "stylers": [
      {
        "color": "#0433ff"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

export default withRouter(
  GoogleApiWrapper({
    apiKey: 'AIzaSyA0LrnCgNKy53NOcrnzzUkHJxeD5eyeWT4'
  })(Map)
);

