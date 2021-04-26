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

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

class MapUser extends React.Component {
  constructor(props) {
    super(props);

    // TODO: This might keep an old, expired token around, do this on ever request instead...
    const client = GetApiClient();
    this.UsersApi = new UsersApi(client);
    
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
    let userId = this.props.match.params.id;
    this.UsersApi.usersUserIdGet(userId, this.getUserCallback);
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

    // TODO: Fix map alignment (oversheets screen bottom atm.)
    return (
      <div className="h-screen flex flex-col">
        <div className="p-4 bg-gray-100">
          <div className="flex">
            <div className="flex-none mr-4">
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
                return (
                  <div key={dog.id} className="w-1/2">
                    <Dog name={dog.name} sex={dog.sex} breed={dog.breed} age={ageString} imageUrl={dog.imageUrl}></Dog>
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
      
        <div className="flex-grow">
          <GoogleMap
              google={this.props.google}
              zoom={18}
              containerStyle={mapStyles}
              center={googleMapsPosition}
              fullscreenControl={false}
              mapTypeControl={false}
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

        <div className="absolute inset-x-0 bottom-0">
          <TabBar active="map" />
        </div>
      </div>
    )
  }
}

export default withRouter(
  GoogleApiWrapper({
    apiKey: 'AIzaSyA0LrnCgNKy53NOcrnzzUkHJxeD5eyeWT4'
  })(MapUser)
);