import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';

import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import ReactDOM from "react-dom";
import styled from "styled-components";
import GeoCoordinateHelper from '../../helpers/GeoCoordinateHelper';


const mapStyles = {
  width: '100%',
  height: '100%'
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.saveLatestPosition = this.saveLatestPosition.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);

    this.state = {
      currentLocation: {lat: 5, lng: 45},
      activeMarker: {},          // Shows the active marker upon click
      users: []
    };
  }

  onMarkerClick = (props, marker, e) => {
    let url = "/map/users/" + marker.id.toString();
    this.props.history.push(url);
  };

  saveLatestPosition(position) {
    this.setState({currentLocation: {lat : position.coords.latitude, lng : position.coords.longitude}});
  }

  componentDidMount() {
    GeoCoordinateHelper.getCurrentLocation(this.saveLatestPosition);

    // TODO: Fetch users from API
    this.setState({
      users: [
        {
          id: 1,
          name: "User One",
          status: "ONLINE",
          location: {
            latitude: 47.38507005180391,
            longitude: 7.944326876563231
          }
        },
        {
          id: 2,
          name: "User Two",
          status: "ONLINE",
          location: {
            latitude: 47.381019226154905, 
            longitude: 7.951315032221059
          }
        },
        {
          id: 3,
          name: "User Three",
          status: "OFFLINE",
          location: {
            latitude: 47.38275533240448,
            longitude: 7.931205231766877
          }
        }
      ]
    });
  }
  
  render() {
    console.log(this.state.currentLocation)
    return (
      <div>
        <GoogleMap
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            center={this.state.currentLocation}
            fullscreenControl={false}
            mapTypeControl={false}
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
                  position={{lat: user.location.latitude, lng: user.location.longitude}}
                  onClick={this.onMarkerClick}
                  icon={iconUrl} />
              )
            })}
        </GoogleMap>

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
  })(Map)
);

