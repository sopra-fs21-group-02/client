import React from 'react';
import { withRouter } from 'react-router';

class MapUser extends React.Component {
  render() {
    return (
      <h1>Show User ID {this.props.match.params.id} on the map</h1>
    );
  }
}

export default withRouter(MapUser);