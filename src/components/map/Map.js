import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';

import { Map as GoogleMap, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Button } from "../../views/design/Button";
import RecenterMap from "../../views/design/icons/RecenterMap";
import { ApiClient, Coordinate, ParksApi, PathsApi, UsersApi } from 'sopra-fs21-group-02-dogs-api';
import GetApiClient from '../../helpers/ApiClientFactory';
import Users from '../../views/design/icons/Users';
import DrawingControlBar from '../../views/map/DrawingControlBar';
import SaveDrawingEntityDialog from './SaveDrawingEntityDialog';
import AuthHelper from '../../helpers/AuthHelper';

const style = {
  width: '100%',
  height: 'calc(100% - 70px)'
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
    this.getUsersCallback = this.getUsersCallback.bind(this);
    this.mapClick = this.mapClick.bind(this);
    this.enterDrawingMode = this.enterDrawingMode.bind(this);
    this.exitDrawingMode = this.exitDrawingMode.bind(this);
    this.saveDrawingEntity = this.saveDrawingEntity.bind(this);
    this.saveDrawingEntityCallback = this.saveDrawingEntityCallback.bind(this);
    this.onParkClick = this.onParkClick.bind(this);
    this.onPathClick = this.onPathClick.bind(this);
    this.getParksCallback = this.getParksCallback.bind(this);
    this.getPathsCallback = this.getPathsCallback.bind(this);

    this.updatePosition = undefined;

    this.state = {
      mapZoom: 14,
      mapCenter: { lat: 47.497215999999995, lng: 8.71956479999999 },
      currentLocation: { lat: null, lng: null },
      activeMarker: {},          // Shows the active marker upon click
      users: [],
      paths: [],
      parks: [],
      centerAroundCurrentLocation: true,
      isMapDragged: false,
      isLocationAvailable: true,
      isLocationDenied: false,
      isInDrawingMode: false,
      drawingModeEntityType: undefined,
      drawnParkLocation: undefined,
      drawnPathPoints: undefined,
      showSaveDialog: false
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

  onPathClick = (props, path, e) => {
    // TODO: Redirect to path detail view...
  }

  onParkClick = (props, park, e) => {
    // TODO: redirect to park detail view...
  }

  saveLatestPosition(position) {
    this.setState({
      currentLocation: { lat: position.coords.latitude, lng: position.coords.longitude },
      isLocationAvailable: true,
      isLocationDenied: false
    });

    if (this.state.isMapDragged === false) {
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
    let pathsApi = new PathsApi(client);
    let parksApi = new ParksApi(client);

    // TODO: Remove area filters?
    let visibleAreaFilter = {
      visibleArea: [
        { latitude: -180, longitude: -90 },
        { latitude: 180, longitude: -90 },
        { latitude: 180, longitude: 90 },
        { latitude: -180, longitude: 90 }
      ]
    };
    
    usersApi.getAllUsers(this.getUsersCallback);
    parksApi.getParks(visibleAreaFilter, this.getParksCallback);
    pathsApi.pathsGet(visibleAreaFilter, this.getPathsCallback);
  }

  getUsersCallback(error, data, response) {
    if (error) {
      console.error(error);
      return;
    }

    this.setState({
      users: response.body
    });
  }

  getParksCallback(error, data, response) {
    if (error) {
      console.error(error);
      return;
    }

    this.setState({
      parks: response.body
    });
  }

  getPathsCallback(error, data, response) {
    if (error) {
      console.error(error);
      return;
    }

    this.setState({
      paths: response.body
    });
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.updatePosition);
  }

  enterDrawingMode(entity) {
    this.setState({
      isInDrawingMode: true,
      drawingModeEntityType: entity,
      drawnParkLocation: undefined,
      drawnPathPoints: []
    });
    this.map.setOptions({
      draggableCursor: 'crosshair'
    });
  }

  exitDrawingMode() {
    this.setState({
      isInDrawingMode: false,
      drawingModeEntityType: undefined,
      drawnParkLocation: undefined,
      drawnPathPoints: undefined,
      showSaveDialog: false
    });
    this.map.setOptions({
      draggableCursor: 'grab'
    });
    setTimeout(this.redirectToCurrentLocation, 250);
  }

  mapClick(e, map) {
    let location = {
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    }

    if (this.state.drawingModeEntityType === "PARK") {
      this.setState({ drawnParkLocation: location });
    } else if (this.state.drawingModeEntityType === "PATH") {
      let newPathPoints = [...this.state.drawnPathPoints];
      newPathPoints.push(location);
      this.setState({ drawnPathPoints: newPathPoints });
    }
  }

  saveDrawingEntity(description) {
    if (this.state.drawingModeEntityType === "PARK") {
      let client = GetApiClient();
      let parksApi = new ParksApi(client);
      
      let newPark = {
        creatorId: parseInt(localStorage.getItem('loggedInUserId')),
        coordinate: this.state.drawnParkLocation,
        description: description
      }

      parksApi.parksPost(newPark, this.saveDrawingEntityCallback);
    } else if (this.state.drawingModeEntityType === "PATH") {
      let client = GetApiClient();
      let pathsApi = new PathsApi(client);

      let newPath = {
        creator: {
          id: localStorage.getItem('loggedInUserId') // Let's see if this is enough...
        },
        listOfCoordinates: [...this.state.drawnPathPoints],
        description: description
      }

      pathsApi.pathsPost(newPath, this.saveDrawingEntityCallback);
    } else {
      throw ("Can't save drawn entity of type " + this.state.drawingModeEntityType);
    }
  }

  saveDrawingEntityCallback(error, data, response) {
    if (error) {
      console.error(error);
      return;
    }

    // TODO: re-load corresponding entities? 
    // -> Add entity to state is probably the cleaner solution
    if (this.state.drawingModeEntityType === "PARK") {
      let parks = [...this.state.parks];
      parks.push(response.body);
      this.setState({
        parks: parks
      });
    } else if (this.state.drawingModeEntityType === "PATH") {
      let paths = [...this.state.paths];
      paths.push(response.body);
      this.setState({
        paths: paths
      });
    } else {
      throw ("Can't process drawn entity of type " + this.state.drawingModeEntityType);
    }

    this.exitDrawingMode();
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

    if (this.state.isInDrawingMode) {
      style.height = 'calc(100% - 48px)';
    }

    let drawnPathCoords = undefined;
    if (this.state.drawnPathPoints !== undefined) {
      drawnPathCoords = this.state.drawnPathPoints.map((p) => {
        return { lat: p.latitude, lng: p.longitude };
      })
    }

    return (
      <div>
      {!this.state.showSaveDialog &&   
        <div>
        {showOverlay ?
          <div className="bg-yellow-400 w-screen p-4 z-10 absolute top-0 inset-x-0 text-center font-semibold text-gray-900">
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
          onClick={(t, map, e) => this.mapClick(e, map)}
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
            let userLocation = user.latestLocation || { latitude: undefined, longitude: undefined };
            return (
              <Marker
                title={user.name}
                name={user.name}
                id={user.id}
                key={user.id}
                // TODO: Handle case where user doesn't have a latestLocation (yet)...
                position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
                onClick={this.onMarkerClick}
                icon={iconUrl} />
            )
          })}

          {/* Show parks */}
          {this.state.parks.map((park, id) => {
            let iconUrl = '/images/map/park.png';
            return (
              <Marker 
                id={park.id}
                key={park.id}
                position={park.coordinate}
                onClick={this.onParkClick}
                icon={iconUrl}/>
            )
          })}

          {/* Show paths */}
          {this.state.paths.map((path, id) => {
            <Polyline
              id={path.id}
              key={path.id}
              path={path.listOfCoordinates}
              strokeColor="#27AE60"
              strokeOpacity={0.8}
              strokeWeight={3}
              onClick={this.onPathClick}/>
          })}

          {/* Users Current Location */}
          <Marker
            title={"Your current location"}
            key={this.id}
            position={{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}
            icon={"/images/map/marker-own.png"} />

          {this.state.isInDrawingMode && this.state.drawingModeEntityType === "PARK" && this.state.drawnParkLocation !== undefined &&
            <Marker
              title={"New Park"}
              position={{ lat: this.state.drawnParkLocation.latitude, lng: this.state.drawnParkLocation.longitude }}
              icon={"/images/map/park.png"} />
          }

          {this.state.isInDrawingMode && this.state.drawingModeEntityType === "PATH" && this.state.drawnPathPoints !== undefined && this.state.drawnPathPoints.length > 0 &&
            <Polyline
              path={drawnPathCoords}
              strokeColor="#27AE60"
              strokeOpacity={0.8}
              strokeWeight={3}
            />
          }

          {!this.state.isInDrawingMode &&
            <div>
              <div className="absolute inset-x-0 bottom-15 right-0  w-12 max-w-1/4 paddingBottom: 20">
                <RecenterMap
                  active={this.state.isMapDragged}
                  onClick={() => this.redirectToCurrentLocation()}
                />
              </div>

              <div className="absolute top-4 right-4">
                <DrawingControlBar
                  parkClick={() => this.enterDrawingMode("PARK")}
                  pathClick={() => this.enterDrawingMode("PATH")}></DrawingControlBar>
              </div>
            </div>
          }
        </GoogleMap>

        {!this.state.isInDrawingMode &&
          <div className="absolute inset-x-0 bottom-0">
            <TabBar active="map" />
          </div>
        }

        {this.state.isInDrawingMode &&
          <div className="h-12 bg-gray-300 absolute inset-x-0 bottom-0 text-center flex">
            <h1
              className="cursor-pointer hover:font-bold text-xl align-middle pt-2.5 w-1/2"
              onClick={() => this.exitDrawingMode()}>
              Cancel
              </h1>
            <h1
              className="cursor-pointer hover:font-bold text-xl align-middle pt-2.5 w-1/2 font-semibold"
              onClick={() => this.setState({ showSaveDialog: true })}>
              Save
              </h1>
          </div>
        }
      </div>
      }

      {this.state.showSaveDialog && 
        <SaveDrawingEntityDialog
          entityType={this.state.drawingModeEntityType}
          cancelCallback={() => this.exitDrawingMode()}
          saveCallback={() => this.saveDrawingEntity()}/>
      }
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

