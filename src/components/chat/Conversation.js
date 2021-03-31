import React from 'react';
import { withRouter } from 'react-router';

class Conversation extends React.Component {
  render() {
    return (
      <h1>Conversation with User ID {this.props.match.params.userId}</h1>
    );
  }
}

export default withRouter(Conversation);