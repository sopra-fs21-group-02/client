import React from 'react';
import { withRouter } from 'react-router';
import Back from '../../views/design/icons/Back';
import UserListUser from '../../views/chat/UserListUser';
import GetApiClient from '../../helpers/ApiClientFactory';
import { UsersApi } from 'sopra-fs21-group-02-dogs-api';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.redirectBackToChat = this.redirectBackToChat.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.startConversationWithUser = this.startConversationWithUser.bind(this);
    this.getUsersCallback = this.getUsersCallback.bind(this);

    this.state = {
      query: '',
      users: []
    };
  }

  componentDidMount() {
    let client = GetApiClient();
    let usersApi = new UsersApi(client);
    usersApi.getAllUsers(this.getUsersCallback);
  }

  getUsersCallback(error, data, response) {
    if(error) {
      console.error(error);
      return;
    }

    this.setState({
      users: response.body
    });
  }

  redirectBackToChat() {
    this.props.history.push('/chat');
  }

  startConversationWithUser(userId) {
    this.props.history.push('/chat/' + userId.toString());
  }

  onQueryChange(newQuery) {
    this.setState({
      query: newQuery
    });
  }

  getFilteredUsers() {
    let query = this.state.query;
    if (query === undefined || query.trim() === '') { 
      return this.state.users; 
    }

    let resultSet = [];

    this.state.users.forEach(user => {
      if (user.name.indexOf(query) !== -1) { 
        resultSet.push(user); 
      }
    });

    return resultSet;
  }

  render() {
    return (
      <div className="flex flex-col">
        <div className="flex-none bg-gray-300 text-center h-12">
          <h1 className="font-bold text-xl align-middle pt-2.5">Start New Conversation</h1>
          <div className="absolute -top-1 -left-2 cursor-pointer" onClick={() => this.redirectBackToChat()}>
            <Back></Back>
          </div>
        </div>
        <div className="flex-none bg-gray-200 p-2">
          <input 
            type="text"
            className="w-full bg-white p-2 rounded-md"
            value={this.state.query}
            onChange={(e) => this.onQueryChange(e.target.value)}
            placeholder="Search..."></input>
        </div>
        <div className="flex-1">
          {this.getFilteredUsers().map((user) => {
            return (
              <div key={user.id}>
                <UserListUser userImageURL={user.profilePicture} userName={user.name} userStatus={user.status} onClick={() => this.startConversationWithUser(user.id)}></UserListUser>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Contacts);