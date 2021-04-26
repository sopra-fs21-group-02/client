import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GoogleLogin from 'react-google-login';
import { getClientId } from '../../helpers/getClientId';
import { ApiClient, UsersApi } from 'sopra-fs21-group-02-dogs-api';
import GetApiClient from '../../helpers/ApiClientFactory';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  color: orangered;
`;

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      errorMessage: null,
    };

    const client = GetApiClient();
    this.UsersApi = new UsersApi(client);

    this.onApiResponse = this.onApiResponse.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  async onLogin(response) {
    const requestBody = JSON.stringify({
      tokenId: response.tokenId,
      emailId: response.profileObj.email
    });

    this.UsersApi.usersLoginPost(requestBody, this.onApiResponse);
  }

  onApiResponse(error, data, response) {
    if(error) {
      const errMessage = "Error logging in: " + error.message;
      this.setState({ errorMessage: errMessage });
      return;
    }

    // Store token in localStorage
    localStorage.setItem('accessToken', response.body.accessToken);
    localStorage.setItem('accessTokenExpiry', response.body.accessTokenExpiry);

    // TODO start silent refresh timeout here?

    // Redirect logged-in user
    if (response.body.isNewUser) {
      this.props.history.push('/profile');
    } else {
      this.props.history.push('/map');
    }
  }

  render() {
    const clientId = "1057742566572-4ufig26uc1s8tiggp6ja3tf13s4iuo87.apps.googleusercontent.com";
    return (
      <BaseContainer>
        <FormContainer>
          <GoogleLogin
            clientId={getClientId()}
            buttonText="Login with Google"
            onSuccess={this.onLogin}
            onFailure={this.onLogin}
            cookiePolicy={'single_host_origin'}
          />
          <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(Login);
