import React from 'react';
import { withRouter } from 'react-router';
import { ParksApi } from 'sopra-fs21-group-02-dogs-api';
import GetApiClient from '../../helpers/ApiClientFactory';

class Park extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      park: {
        coordinate: {
          lat: 0,
          lng: 0
        },
        description: "Foopark!"
      },
      ownLocation: {
        latitude: 0,
        longitude: 0
      }
    }

    this.redirectToMap = this.redirectToMap.bind(this);
    this.getParkCallback = this.getParkCallback.bind(this);
    this.saveOwnLocation = this.saveOwnLocation.bind(this);
  }

  redirectToMap() {
    this.props.history.push('/map');
  }

  getParkCallback(error, data, response) {
    if (error) {
      console.error(error);
      return;
    }

    this.setState({
      park: response.body
    });
  }

  saveOwnLocation(position) {
    this.setState({
      ownLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
  }

  componentDidMount() {
    const client = GetApiClient();
    const api = new ParksApi(client);
    let parkId = this.props.match.params.id;

    // TODO: Get Park
  }

  render() {
    return (
      <h1>Show Park ID {this.props.match.params.id} on the map</h1>
    );
  }
}

export default withRouter(Park);