import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';

import { Map as GoogleMap, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
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

  saveLatestPosition(position) {
    this.setState({currentLocation: {lat : position.coords.latitude, lng : position.coords.longitude}});
  }

  componentDidMount() {
    GeoCoordinateHelper.getCurrentLocation(this.saveLatestPosition);
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
        >
            <Marker onClick={this.onMarkerClick} name={'Marker place'} />
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

