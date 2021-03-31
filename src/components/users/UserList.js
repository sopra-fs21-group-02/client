import React from 'react';
import { withRouter } from 'react-router';

class UserList extends React.Component {
  render() {
    return (
      <h1>Show list of all users.</h1>
    );
  }
}

export default withRouter(UserList);