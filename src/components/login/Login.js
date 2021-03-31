import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

class Login extends React.Component {
  render() {
    return (
      <h1>Login page!</h1>
    );
  }
}

export default withRouter(Login);
