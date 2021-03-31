import React from 'react';
import { withRouter } from 'react-router';

class ReviewWalkingRoute extends React.Component {
  render() {
    return (
      <h1>New review for Walking Route ID {this.props.match.params.id}</h1>
    );
  }
}

export default withRouter(ReviewWalkingRoute);