import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';
import { ApiClient, UsersApi, User } from 'sopra-fs21-group-02-dogs-api';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: []
    };
  }

  render() {
    return (
      <div>
        <div className="h-full w-full">
          <div className="mt-12">
            <img src="/images/stophammerdog.png" className="w-2/3 mx-auto"></img>
          </div>
          <div className="w-2/3 mx-auto mt-4">
            <h2 className="text-xl font-bold text-center">Under Construction</h2>
            <p>This section of our app will appear in a next version.</p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <TabBar active="users" />
        </div>
      </div>
    );
  }
}

export default withRouter(UserList);