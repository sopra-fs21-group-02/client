import React from 'react';
import { withRouter } from 'react-router';

class Contacts extends React.Component {
  render() {
    return (
      <h1>Show all chat contacts (i.e. users) here</h1>
    );
  }
}

export default withRouter(Contacts);