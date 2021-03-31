import React from 'react';
import { withRouter } from 'react-router';

class WalkingRoute extends React.Component {
  render() {
    return (
      <h1>Show Walking Route ID {this.props.match.params.id} on the map</h1>
    );
  }
}

export default withRouter(WalkingRoute);