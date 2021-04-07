import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';

class UserList extends React.Component {
  render() {
    return (
      <div>
        <h1>Show list of all users.</h1>

        <div className="absolute inset-x-0 bottom-0">
          <TabBar active="users" />
        </div>
      </div>
    );
  }
}

export default withRouter(UserList);