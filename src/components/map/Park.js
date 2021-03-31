import React from 'react';
import { withRouter } from 'react-router';

class Park extends React.Component {
  render() {
    return (
      <h1>Show Park ID {this.props.match.params.id} on the map</h1>
    );
  }
}

export default withRouter(Park);