import React from "react";
import { Redirect, Route } from "react-router-dom";

import Contacts from "../../chat/Contacts";
import Conversation from "../../chat/Conversation";
import Inbox from "../../chat/Inbox";

class ChatRouter extends React.Component {
    render() {
      return (
        <div>
          {/* /chat/new shows list of users to start convo with */} 
          <Route
            path={`${this.props.base}/new`}
            render={() => <Contacts />}
          />

          {/* /chat/:userId shows/starts convo with other user by ID */} 
          <Route
            path={`${this.props.base}/:userId`}
            render={() => <Conversation />}
          />

          {/* /chat shows conversation list */} 
          <Route
            exact
            path={`${this.props.base}`}
            render={() => <Inbox />}
          />
        </div>
      );
    }
}

export default ChatRouter;