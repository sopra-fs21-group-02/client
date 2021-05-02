import React from 'react';
import { withRouter } from 'react-router';
import StatusIndicator from '../../views/design/StatusIndicator';
import Back from '../../views/design/icons/Back';
import RecenterMap from '../../views/design/icons/RecenterMap';
import GetApiClient from '../../helpers/ApiClientFactory';
import { ConversationsApi, UsersApi } from 'sopra-fs21-group-02-dogs-api';
import Users from '../../views/design/icons/Users';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      participant: {},
      messages: [],
      messageDraft: '',
      isLoaded: false
    };

    this.redirectBackToInbox = this.redirectBackToInbox.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onMessageDraftChange = this.onMessageDraftChange.bind(this);
    this.inputKeyPress = this.inputKeyPress.bind(this);
    this.handleError = this.handleError.bind(this);
    this.setStateFromResponse = this.setStateFromResponse.bind(this);
  }

  componentDidMount() {
    const client = GetApiClient();
    const usersApi = new UsersApi(client);
    const conversationsApi = new ConversationsApi(client);

    let userId = localStorage.getItem('loggedInUserId');
    let participantId = this.props.match.params.userId;
    usersApi.usersUserIdGet(userId, (error, data, response) => {
      this.handleError(error);
      if (error == null) this.setStateFromResponse(response, 'user');
      usersApi.usersUserIdGet(participantId, (error, data, response) => {
        this.handleError(error);
        if (error == null) this.setStateFromResponse(response, 'participant');
        conversationsApi.getAllMessages(userId, participantId, (error, data, response) => {
          this.handleError(error);
          if (error == null) {
            response.body.reverse();
            this.setStateFromResponse(response, 'messages');
          }
          this.setState({
            isLoaded: true
          });
        });
      });
    });
  }

  handleError(error) {
    if (error) {
      console.error(error);
    }
  }

  setStateFromResponse(response, stateKey) {
    this.setState({
      [stateKey]: response.body
    });
  } 

  redirectBackToInbox() {
    this.props.history.push('/chat/')
  }

  onMessageDraftChange(newValue) {
    this.setState({
      messageDraft: newValue
    });
  }

  inputKeyPress(keyEvent) {
    if(keyEvent.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    let message = this.state.messageDraft.trim();

    // Don't send empty messages
    if (message.length === 0) { return; }

    // TODO: Append message to local conversation object

    // TODO: Send message to API

    let messageObj = {
      senderId: this.state.user.id,
      receiverId: this.state.participant.id,
      message: message
    };

    const client = GetApiClient();
    const conversationsApi = new ConversationsApi(client);
    conversationsApi.sendMessage(messageObj, (error, data, response) => {
      if (error) {
        this.handleError(error);
        return;
      }

      let messages = [...this.state.messages];
      delete messageObj.receiverId;
      delete messageObj.senderId;
      messageObj.sender = this.state.user;
      messageObj.receiver = this.state.participant;
      messages.push(messageObj);
      this.setState({
        messages: messages
      });
    })

    // Clear message draft
    this.setState({
      messageDraft: ''
    });
  }

  componentDidUpdate() {
    if (this.state.isLoaded) {
      // Scroll message container to bottom
      let msgContainer = document.getElementById('messagesContainer');
      msgContainer.scrollTop = msgContainer.scrollHeight - msgContainer.clientHeight
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (<div>Not loaded!</div>);
    }

    return (
      <div className="flex flex-col h-screen">
        <div className="bg-gray-200 flex-none">
          <div className="flex p-2">
            <div className="-ml-4 -mr-2 cursor-pointer" onClick={this.redirectBackToInbox}>
              <Back></Back>
            </div>
            <div className="flex-none">
              <img src={this.state.participant.profilePicture} className="h-14 w-14 rounded-full bg-gray-400"></img>
            </div>
            <div className="flex-1 pt-2 pl-4">
              <h2 className="font-semibold text-lg -mt-1">{this.state.participant.name}</h2>
              <StatusIndicator status={this.state.participant.status}></StatusIndicator>
            </div>
          </div>
        </div>

        <div className="overflow-auto flex-1 pb-4" id="messagesContainer">
          {this.state.messages.map(message => {
            let float = message.receiver.id === this.state.participant.id ? 
                        'float-right' : 
                        'float-left';
            let msgClass = "p-2 m-2 mb-0 bg-gray-200 rounded-lg w-5/6 " + float;
            return (
              <div className={msgClass} key={message.id}>
                <p>{message.message}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-gray-200 p-2 flex flex-none">
          <div className="flex-grow">
            <input className="p-2 w-full rounded-md"
                    maxLength="255"
                    onChange={(e) => this.onMessageDraftChange(e.target.value)}
                    onKeyPress={this.inputKeyPress}
                    value={this.state.messageDraft}></input>
          </div>
          <div className="p-2 pl-4 cursor-pointer" onClick={this.sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" transform="rotate(90)">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Conversation);