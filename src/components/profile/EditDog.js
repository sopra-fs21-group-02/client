import React from 'react';
import { withRouter } from 'react-router';

class EditDog extends React.Component {
  render() {
    return (
      <h1>Editing page of Dog with ID {this.props.match.params.dogId}</h1>
    );
  }
}

export default withRouter(EditDog);