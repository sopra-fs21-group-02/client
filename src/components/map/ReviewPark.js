import React from 'react';
import { withRouter } from 'react-router';

class ReviewPark extends React.Component {
  render() {
    return (
      <h1>New review for park ID {this.props.match.params.id}</h1>
    );
  }
}

export default withRouter(ReviewPark);