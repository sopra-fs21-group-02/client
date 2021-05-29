import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';
import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import Dog from '../../views/profile/Dog';
import Button from '../../views/design/Button';
import StatusIndicator from '../../views/design/StatusIndicator';
import moment from 'moment';

import GeoCoordinateHelper from '../../helpers/GeoCoordinateHelper';
import DateHelper from '../../helpers/DateHelper';
import { ApiClient, UsersApi } from 'sopra-fs21-group-02-dogs-api';
import GetApiClient from '../../helpers/ApiClientFactory';
import { getDomain } from '../../helpers/getDomain';
import Back from '../../views/design/icons/Back';

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

class MapUser extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: {
        name: "",
        bio: "",
        id: 0,
        latestLocation: {
          latitude: 0,
          longitude: 0
        },
        status: "",
        dogs: []
      },
      ownLocation: {
        latitude: 0,
        longitude: 0
      }
    };

    this.redirectToChat = this.redirectToChat.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.saveOwnLocation = this.saveOwnLocation.bind(this);
    this.getUserCallback = this.getUserCallback.bind(this);
  }

  getUserCallback(error, data, response) {
    if(error) {
      console.error(error);
      return;
    }

    this.setState({
      user: response.body
    });
  }

  async componentDidMount() {
    const client = GetApiClient();
    const api = new UsersApi(client);
    let userId = this.props.match.params.id;
    api.usersUserIdGet(userId, this.getUserCallback);

    GeoCoordinateHelper.getCurrentLocation(this.saveOwnLocation);
  }

  redirectToProfile() {
    let url = "/users/" + this.state.user.id.toString();
    this.props.history.push(url);
  }

  redirectToChat() {
    let url = "/chat/" + this.state.user.id.toString();
    this.props.history.push(url);
  }

  saveOwnLocation(position) {
    this.setState({
      ownLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
  }

  _mapLoaded(mapProps, map) {
    this.map = map;
    map.setOptions({
      styles: mapStyle
    })
  }

  render() {
    let iconUrl = "";
    if (this.state.user.status === "ONLINE") {
      iconUrl = "/images/map/marker-online.png";
    } else {
      iconUrl = "/images/map/marker-offline.png";
    }

    let ownLocation = this.state.ownLocation || {latitude: undefined, longitude: undefined};
    let userLocation = this.state.user.latestLocation || {latitude: undefined, longitude: undefined};

    let distance = GeoCoordinateHelper.getDistanceFromLatLonInKm(ownLocation.latitude, ownLocation.longitude,
                                                                 userLocation.latitude, userLocation.longitude);
    
    // Cloaks the distance string while own location has not been loaded
    let distanceString = () => {
      if(ownLocation.latitude > 0 && ownLocation.longitude > 0) {
        return Math.round(distance).toString() + "KM AWAY";
      } else {
        return "...";
      }
    }

    let googleMapsPosition = {
      lat: userLocation.latitude, 
      lng: userLocation.longitude
    }

    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
            <div className="flex-none overflow-auto">
              <div className="absolute top-9 -left-4 cursor-pointer" onClick={() => this.props.history.push('/map')}>
                <Back></Back>
              </div>
              <div className="flex-none ml-3 mr-4">
                <img src={this.state.user.profilePicture} className="h-24 w-24 rounded-full bg-gray-400"></img>
              </div>
              <div>
                <div>
                  <h2 className="font-bold text-2xl">{this.state.user.name}</h2>
                </div>
                <div>
                  <StatusIndicator status={this.state.user.status} />
                  <span className="text-xs font-bold text-gray-500 ml-2">{distanceString()}</span>
                </div>
                <div>
                  <p>{this.state.user.bio}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2 mt-4">DOGS</h2>
              <div className="flex flex-wrap">
                {this.state.user.dogs.map(dog => {
                  let ageString = DateHelper.getAgeStringFromDateOfBirth(dog.dateOfBirth);
                  let imageUrl = `${getDomain()}/v1/users/${this.state.user.id}/dogs/${dog.id}/image`;
                  return (
                    <div key={dog.id} className="w-1/2">
                      <Dog name={dog.name} sex={dog.sex} breed={dog.breed} age={ageString} imageUrl={imageUrl}></Dog>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <Button onClick={this.redirectToChat}>💬 Chat</Button>
              <Button onClick={this.redirectToProfile}>View Full Profile</Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
          <GoogleMap
              google={this.props.google}
              zoom={18}
              containerStyle={mapStyles}
              center={googleMapsPosition}
              fullscreenControl={false}
              mapTypeControl={false}
              streetViewControl={false}
              onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          >

            <Marker
              title={this.state.user.name}
              name={this.state.user.name}
              id={this.state.user.id}
              key={this.state.user.id}
              position={googleMapsPosition}
              onClick={this.onMarkerClick}
              icon={iconUrl} />
          </GoogleMap>
        </div>

        <div className="flex-none">
          <TabBar active="map" />
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
  })(MapUser)
);