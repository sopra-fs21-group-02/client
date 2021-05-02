import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';
import StatusIndicator from '../../views/design/StatusIndicator';
import InboxConversationItem from '../../views/chat/InboxConversationItem';
import GetApiClient from '../../helpers/ApiClientFactory';
import { ConversationsApi } from 'sopra-fs21-group-02-dogs-api';
import EmojiPicker from 'emoji-picker-react';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };

    this.getConversationsCallback = this.getConversationsCallback.bind(this);
    this.redirectToConversation = this.redirectToConversation.bind(this);
    this.redirectToUserList = this.redirectToUserList.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  componentDidMount() {
    const client = GetApiClient();
    const api = new ConversationsApi(client);
    let userId = localStorage.getItem('loggedInUserId');
    api.getAllConversations(userId, this.getConversationsCallback);
    this.refreshInboxInterval = setInterval(() => this.updateMessages(), 1000);
  }

  componentWillUnmount() {
    if (this.refreshInboxInterval) {
      clearInterval(this.refreshInboxInterval);
    }
  }

  updateMessages() {
    const client = GetApiClient();
    const api = new ConversationsApi(client);
    let userId = localStorage.getItem('loggedInUserId');
    api.getAllConversations(userId, this.getConversationsCallback);
  }

  getConversationsCallback(error, data, response) {
    if (error) {
      console.error(error);
      return;
    }

    let conversations = response.body;
    conversations.sort((a, b) => {
      let aDate = new Date(a.lastMessage.timeStamp);
      let bDate = new Date(b.lastMessage.timeStamp);
      return bDate - aDate;
    })

    this.setState({
      conversations: response.body
    });
  }

  redirectToConversation(participantUserId) {
    this.props.history.push("/chat/" + participantUserId.toString());
  }

  redirectToUserList() {
    this.props.history.push("/chat/new/");
  }

  render() {
    return (
      <div>
        <div className="h-12 bg-gray-300 text-center">
          <h1 className="font-bold text-xl align-middle pt-2.5">Chat</h1>
          <div className="absolute top-3 right-4 cursor-pointer" onClick={() => this.redirectToUserList()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>

        {this.state.conversations.map((conversation) => {
          let lastMessage = conversation.lastMessage;
          let userId = localStorage.getItem('loggedInUserId');
          let otherUser = conversation.lastMessage.sender.id == userId ?
                            conversation.lastMessage.receiver :
                            conversation.lastMessage.sender;
          return (
            <InboxConversationItem 
              key={otherUser ? otherUser.id : Math.random().toString}
              userImageURL={otherUser ? otherUser.profilePicture : ""}
              userName={otherUser ? otherUser.name : "Deleted User"}
              userStatus={otherUser ? otherUser.status : "OFFLINE"}
              lastMessageText={lastMessage.message}
              lastMessageTimestamp={lastMessage.timeStamp}
              unread={lastMessage.unread && (lastMessage.sender && lastMessage.sender.id != userId)}
              onClick={otherUser ? () => this.redirectToConversation(otherUser.id) : () => {alert('Conversation is no longer available')}}
            />
          )
        })}

        <div className="absolute inset-x-0 bottom-0">
          <TabBar active="chat" />
        </div>
      </div>
    );
  }
}

export default withRouter(Inbox);