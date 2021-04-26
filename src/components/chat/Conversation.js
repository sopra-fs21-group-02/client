import React from 'react';
import { withRouter } from 'react-router';
import StatusIndicator from '../../views/design/StatusIndicator';
import Back from '../../views/design/icons/Back';
import RecenterMap from '../../views/design/icons/RecenterMap';

// TODO: Remove mock data once API is integrated
const ME = { id: 999 }; // EMPTY since we don't need the data here...

// TODO: Remove mock data once API is integrated
const CRUELLA = {
  id: 1,
  name: "Cruella De Vil",
  bio: "I love all dogs, but Dalamtians are my absolute favorite! Totally open to watch your dogs while you are on holiday!",
  profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
  status: "ONLINE",
  latestLocation: undefined, // Not needed here...
  dogs: undefined, // Not needed here...
};

// TODO: Remove mock data once API is integrated
const ROGER = {
  id: 2,
  name: "Roger Radcliffe",
  bio: "Lorem ipsum...",
  profilePicture: "https://static.wikia.nocookie.net/disney/images/4/40/Rogerrad.png",
  status: "OFFLINE",
  latestLocation: undefined, // Not needed here...
  dogs: undefined, // Not needed here...
};

// TODO: Remove mock data once API is integrated
const ANITA = {
  id: 3,
  name: "Anita Radcliffe",
  bio: "Lorem ipsum...",
  profilePicture: "https://static.wikia.nocookie.net/101dalmatians/images/e/ea/AnitaDifferent.png",
  status: "OFFLINE",
  latestLocation: undefined, // Not needed here...
  dogs: undefined, // Not needed here...
};

// TODO: Remove mock data once API is integrated
function GET_CONVERSATION(userId) {
  let conversations = [
    {
      id: 1,
      participant: CRUELLA,
      messages: [
        {
          id: 0,
          sender: CRUELLA,
          receiver: ME,
          message: "What's up? 😀",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: false
        },
        {
          id: 0,
          sender: ME,
          receiver: CRUELLA,
          message: "Going on holiday soon. Could you maybe watch our dalmatians? 🥺",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: false
        },
        {
          id: 0,
          sender: CRUELLA,
          receiver: ME,
          message: "Haha yes I can watch them for you! 😉 Can't wait to meet my doggos again, you know how much I love them! 🤗",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: true
        }
      ]
    },
    {
      id: 2,
      participant: ROGER,
      messages: [
        {
          id: 0,
          sender: ROGER,
          receiver: ME,
          message: "How about that dog playdate in the park? 🐶🐾",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: false
        },
        {
          id: 0,
          sender: ME,
          receiver: ROGER,
          message: "Sunday? 🤔",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: false
        },
        {
          id: 0,
          sender: ROGER,
          receiver: ME,
          message: "Sunday sounds good! 👍",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: false
        }
      ]
    },
    {
      id: 3,
      participant: ANITA,
      messages: [
        {
          id: 0,
          sender: ANITA,
          receiver: ME,
          message: "It's on Sunday, right?",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: false
        },
        {
          id: 0,
          sender: ME,
          receiver: ANITA,
          message: "I'll text you later 😊",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: false
        },
        {
          id: 0,
          sender: ME,
          receiver: ANITA,
          message: "Yup, Roger's also coming! Can't wait! 🐾",
          timeStamp: "2021-04-11T16:24:44.036Z",
          unread: false
        }
      ]
    }
  ];

  return conversations[userId - 1];
}

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: {
        participant: {},
        messages: []
      },
      messageDraft: ''
    };

    this.redirectBackToInbox = this.redirectBackToInbox.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onMessageDraftChange = this.onMessageDraftChange.bind(this);
    this.inputKeyPress = this.inputKeyPress.bind(this);
  }

  componentDidMount() {
    let convo = GET_CONVERSATION(this.props.match.params.userId);
    this.setState({
      conversation: convo
    });

    let div = document.getElementById('messagesContainer');
    div.scrollTop = div.scrollHeight;
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

    // Append message to local conversation object
    let conversation = Object.assign({}, this.state.conversation);
    conversation.messages.push({
      id: 0,
      sender: ME,
      receiver: this.state.conversation.participant,
      message: message,
      timeStamp: new Date().toJSON(),
      unread: false
    })
    this.setState({
      conversation: conversation
    });

    // TODO: Send message to API

    // Clear message draft
    this.setState({
      messageDraft: ''
    });
  }

  componentDidUpdate() {
    // Scroll message container to bottom
    let msgContainer = document.getElementById('messagesContainer');
    msgContainer.scrollTop = msgContainer.scrollHeight - msgContainer.clientHeight
  }

  render() {
    if (!this.state.conversation) {
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
              <img src={this.state.conversation.participant.profilePicture} className="h-14 w-14 rounded-full bg-gray-400"></img>
            </div>
            <div className="flex-1 pt-2 pl-4">
              <h2 className="font-semibold text-lg -mt-1">{this.state.conversation.participant.name}</h2>
              <StatusIndicator status={this.state.conversation.participant.status}></StatusIndicator>
            </div>
          </div>
        </div>

        <div className="overflow-auto flex-1 pb-4" id="messagesContainer">
          {this.state.conversation.messages.map(message => {
            let float = message.receiver.id === this.state.conversation.participant.id ? 
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