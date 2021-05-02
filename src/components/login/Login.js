import React from 'react';
import styled from 'styled-components';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GoogleLogin from 'react-google-login';
import { getClientId } from '../../helpers/getClientId';
import { ApiClient, UsersApi } from 'sopra-fs21-group-02-dogs-api';
import GetApiClient from '../../helpers/ApiClientFactory';
import AuthHelper from '../../helpers/AuthHelper';

const FormContainer = styled.div`
  margin-top: 2em;
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

  onLogin(response) {
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

    AuthHelper.afterLogin(response.body.userId, response.body.accessToken, response.body.accessTokenExpiry);
    
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
      <div className="flex flex-col h-screen w-full">

        <div className="flex-1 mt-10 z-50">
          <div>
            <h1 className="font-bold text-4xl text-center mt-10">🐕 </h1>
            <h2 className="font-bold text-2xl text-center mt-3">Friendly Fetch</h2>
            <h3 className=" text-l text-center mt-3">Welcome! Please sign in below to use the app.</h3>
          </div>
          <div className="flex-1 ml-auto mr-auto mt-10">
            <div className="flex-col items-center flex justify-center">
              <GoogleLogin
                clientId={getClientId()}
                buttonText="Sign in with Google"
                onSuccess={this.onLogin}
                onFailure={this.onLogin}
                cookiePolicy={'single_host_origin'}
              />
              <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
            </div>
          </div>
          <div>
            <p className="text-sm mt-8 text-gray-500 w-2/3 mx-auto">
              Please note that this application is optimized for smartphone screen sizes and requires location permissions as well as third-party cookies to be enabled.
              </p>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(Login);
