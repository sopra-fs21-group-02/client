import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';

import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import ReactDOM from "react-dom";
import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Reverse from "../../views/design/icons/Reverse";
import CurrentLocation from "../../views/design/icons/CurrentLocation";

const style = {
  width: '100%',
  height: '92%'
};

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

    this.updatePosition = undefined;
    
    this.state = {
      mapZoom: 14,
      mapCenter: {lat: 47.497215999999995, lng: 8.71956479999999},
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
      this.map.panTo(this.state.currentLocation);
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
      PermissionStatus.onchange = () => { this.getCurrentLocation(); }
    }

    // TODO: Fetch users from API
    this.setState({
      users: [
        {
          id: 1,
          name: "User One",
          status: "ONLINE",
          location: {
            lat: 47.38507005180391,
            lng: 7.944326876563231
          }
        },
        {
          id: 2,
          name: "User Two",
          status: "ONLINE",
          location: {
            lat: 47.381019226154905,
            lng: 7.951315032221059
          }
        },
        {
          id: 3,
          name: "User Three",
          status: "OFFLINE",
          location: {
            lat: 47.38275533240448,
            lng: 7.931205231766877
          }
        }
      ]
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
      overlayText = "Please allow location & reload the page!";
    } else if (showOverlay && this.state.isLocationAvailable) {
      overlayText = "Loading...";
    } else if (showOverlay) {
      overlayText = "Your browser does not support location tracking."
    }
    
    return (
        <div>
          
          {showOverlay ?
            <div className="bg-yellow-400 w-screen p-4 z-10 text-center font-semibold text-gray-900">
              <p>{overlayText}</p>
            </div>
          : null}

          <GoogleMap
          google={this.props.google}
          style={style}
          center={this.state.mapCenter}
          zoom={this.state.mapZoom}
          fullscreenControl={false}
          mapTypeControl={false}
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          onDragstart={this.centerMoved}
          onZoomChanged={this.centerMoved}
          streetViewControl={false}
          >

            {/* Other Users */}
            {this.state.users.map((user, id) => {
              let iconUrl = "";
              if (user.status === "ONLINE") {
                iconUrl = "/images/map/marker-online.png";
              } else {
                iconUrl = "/images/map/marker-offline.png";
              }
              return (
                <Marker
                  title={user.name}
                  name={user.name}
                  id={user.id}
                  key={user.id}
                  position={{lat: user.location.lat, lng: user.location.lng}}
                  onClick={this.onMarkerClick}
                  icon={iconUrl} />
              )
            })}

            {/* Users Current Location */}
            <Marker
                title={"Your current location"}
                key={this.id}
                position={{lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng}}
                icon={"/images/map/marker-own.png"}/>

            <div className="absolute inset-x-0 bottom-15 right-0  w-12 max-w-1/4 paddingBottom: 20">
              <CurrentLocation
                  active={this.state.isMapDragged}
                  onClick={() => this.redirectToCurrentLocation()}
              />
            </div>
          </GoogleMap>
          
          <div className="absolute inset-x-0 bottom-0">
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

