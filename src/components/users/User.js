import React from 'react';
import { withRouter } from 'react-router';

class User extends React.Component {
  render() {
    return (
      <h1>Show full profile of User ID {this.props.match.params.id}</h1>
    );
  }
}

export default withRouter(User);