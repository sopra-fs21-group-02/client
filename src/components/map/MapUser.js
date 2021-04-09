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

const ALL_USERS = [
  {
    id: 1,
    name: "User One",
    bio: "I love all dogs, but Dalamtians are my absolute favorite! Totally open to watch your dogs while you are on holiday!",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
    status: "ONLINE",
    latestLocation: {
      latitude: 47.38507005180391,
      longitude: 7.944326876563231
    },
    dogs: [
      {
        id: 1,
        name: "Bello",
        sex: "MALE",
        breed: "Dalmatian",
        dateOfBirth: "2020-10-01",
        imageUrl: "https://www.pdsa.org.uk/media/7888/dalmatian-gallery-outdoors-8-min.jpg"
      },
      {
        id: 2,
        name: "Winston",
        sex: "MALE",
        breed: "Dalmatian",
        dateOfBirth: "2018-04-01",
        imageUrl: "https://vetstreet-brightspot.s3.amazonaws.com/ee/140380a73111e0a0d50050568d634f/file/Dalmatian-2-645mk062311.jpg"
      },
      {
        id: 3,
        name: "Fifi",
        sex: "FEMALE",
        breed: "Dalmatian",
        dateOfBirth: "2017-04-01",
        imageUrl: "http://azure.wgp-cdn.co.uk/app-yourdog/posts/dalmatian.jpg"
      },
      {
        id: 4,
        name: "Jumper",
        sex: "MALE",
        breed: "Dalmatian",
        dateOfBirth: "2020-03-01",
        imageUrl: "https://dogtime.com/assets/uploads/gallery/dalmatian-dog-breed-pictures/10-water.jpg"
      }
    ]
  },
  {
    id: 2,
    name: "User Two",
    bio: "I'm a user and I like dogs!!!",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
    status: "ONLINE",
    latestLocation: {
      latitude: 47.381019226154905, 
      longitude: 7.951315032221059
    },
    dogs: [
      {
        id: 3,
        name: "Fifi",
        sex: "FEMALE",
        breed: "Dalmatian",
        dateOfBirth: "2017-04-01",
        imageUrl: "http://azure.wgp-cdn.co.uk/app-yourdog/posts/dalmatian.jpg"
      }
    ]
  },
  {
    id: 3,
    name: "User Three",
    bio: "Lorem ipsum dolor sit amet",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
    status: "OFFLINE",
    latestLocation: {
      latitude: 47.38275533240448,
      longitude: 7.931205231766877
    },
    dogs: [
      {
        id: 2,
        name: "Winston",
        sex: "MALE",
        breed: "Dalmatian",
        dateOfBirth: "2018-04-01",
        imageUrl: "https://vetstreet-brightspot.s3.amazonaws.com/ee/140380a73111e0a0d50050568d634f/file/Dalmatian-2-645mk062311.jpg"
      }
    ]
  }
];

const FAKE_FETCH_USER = (id) => {
  for (let i = 0; i < ALL_USERS.length; i++) {
    if(ALL_USERS[i].id === id) {
      return ALL_USERS[i];
    }
  }
}

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
  }

  componentDidMount() {
    // TODO: Fetch correct user from API
    let user = FAKE_FETCH_USER(parseInt(this.props.match.params.id));
    this.setState({
      user: user
    });

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

    let distance = GeoCoordinateHelper.getDistanceFromLatLonInKm(this.state.ownLocation.latitude, this.state.ownLocation.longitude,
                                                                 this.state.user.latestLocation.latitude, this.state.user.latestLocation.longitude);
    
    // Cloaks the distance string while own location has not been loaded
    let distanceString = () => {
      if(this.state.ownLocation.latitude > 0 && this.state.ownLocation.longitude > 0) {
        return Math.round(distance).toString() + "KM AWAY";
      } else {
        return "...";
      }
    }

    let googleMapsPosition = {
      lat: this.state.user.latestLocation.latitude, 
      lng: this.state.user.latestLocation.longitude
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