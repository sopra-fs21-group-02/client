import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import GoogleLogin from 'react-google-login';
import { getClientId } from '../../helpers/getClientId';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

class Login extends React.Component {

  async onLogin(response){
    const tokenId = response.tokenId;
    console.log(tokenId)
    const url = "/login/"+tokenId;
    //const res = await api.post(url);
  }


  render() {
    const clientId = "1057742566572-4ufig26uc1s8tiggp6ja3tf13s4iuo87.apps.googleusercontent.com";
    const responseGoogle = (response) => {
      console.log(response);
      this.onLogin(response);
    }
    return (
        <BaseContainer>
          <FormContainer>
            <GoogleLogin
                clientId={getClientId()}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
          </FormContainer>
        </BaseContainer>

    );
  }
}

export default withRouter(Login);
