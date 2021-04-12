import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';
import StatusIndicator from '../../views/design/StatusIndicator';
import InboxConversationItem from '../../views/chat/InboxConversationItem';


// TODO: Remove mock data once API is integrated
const ME = {}; // EMPTY since we don't need the data here...

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
function GET_CONVERSATIONS() {
  return [
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
}

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }

  componentDidMount() {
    let convos = GET_CONVERSATIONS();
    this.setState({
      conversations: convos
    })
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
          let lastMessage = conversation.messages[conversation.messages.length - 1];
          return (
            <InboxConversationItem 
              key={conversation.participant.id}
              userImageURL={conversation.participant.profilePicture}
              userName={conversation.participant.name}
              userStatus={conversation.participant.status}
              lastMessageText={lastMessage.message}
              lastMessageTimestamp={lastMessage.timeStamp}
              unread={lastMessage.unread}
              onClick={() => this.redirectToConversation(conversation.participant.id)}
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