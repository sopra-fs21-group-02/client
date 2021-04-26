import React from 'react';
import { withRouter } from 'react-router';
import Back from '../../views/design/icons/Back';
import UserListUser from '../../views/chat/UserListUser';

// TODO: Remove Mock data with API integration
const ALL_USERS = [
  {
    id: 1,
    name: "Cruella De Vil",
    bio: "I love all dogs, but Dalamtians are my absolute favorite! Totally open to watch your dogs while you are on holiday!",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
    status: "ONLINE",
    latestLocation: undefined, // Not needed here...
    dogs: undefined, // Not needed here...
  },
  {
    id: 2,
    name: "Roger Radcliffe",
    bio: "Lorem ipsum...",
    profilePicture: "https://static.wikia.nocookie.net/disney/images/4/40/Rogerrad.png",
    status: "OFFLINE",
    latestLocation: undefined, // Not needed here...
    dogs: undefined, // Not needed here...
  },
  {
    id: 3,
    name: "Anita Radcliffe",
    bio: "Lorem ipsum...",
    profilePicture: "https://static.wikia.nocookie.net/101dalmatians/images/e/ea/AnitaDifferent.png",
    status: "OFFLINE",
    latestLocation: undefined, // Not needed here...
    dogs: undefined, // Not needed here...
  }
];

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.redirectBackToChat = this.redirectBackToChat.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.startConversationWithUser = this.startConversationWithUser.bind(this);

    this.state = {
      query: '',
      users: []
    };
  }

  componentDidMount() {
    // TODO: Replace w/ API call...
    this.setState({
      users: ALL_USERS
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