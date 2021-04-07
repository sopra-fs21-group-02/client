import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';
import {ApiClient, UsersApi, User} from 'sopra-fs21-group-02-dogs-api';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: []
        };

        // this.responseCallback.bind(this);
        // this.initUsers();
    }

    // async initUsers() {
    //     const apiClient = new ApiClient();
    //     const usersApi = new UsersApi(apiClient);
    //     await usersApi.usersGet(this.responseCallback);
    // }

    // responseCallback(error, data, response) {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         console.log(data);
    //         console.log(response);
    //         this.setState({usersList: response});
    //     }
    // }

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