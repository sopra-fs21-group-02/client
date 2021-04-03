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
    const requestBody =JSON.stringify({
      tokenId: response.tokenId,
      emailId: response.profileObj.email
    });

    console.log(requestBody);

    const res = await api.post("v1/users/login", requestBody);

    if(res.data){
      this.props.history.push('/profile');
    }else{
      this.props.history.push('/map');
    }
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
