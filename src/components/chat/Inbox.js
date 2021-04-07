import React from 'react';
import { withRouter } from 'react-router';
import TabBar from '../../views/TabBar';

class Inbox extends React.Component {
  render() {
    return (
      <div>
        <h1>Show chat inbox here</h1>

        <div className="absolute inset-x-0 bottom-0">
          <TabBar active="chat" />
        </div>
      </div>
    );
  }
}

export default withRouter(Inbox);