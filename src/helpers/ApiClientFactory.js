import { ApiClient } from 'sopra-fs21-group-02-dogs-api';
import AuthHelper from './AuthHelper';
import { getDomain } from './getDomain';

const GetApiClient = () => {
  // If we are not logged-in or the token is expired, 
  // clear the credentials & redirect to sign-in
  if (!AuthHelper.loggedIn() && window.location.href.indexOf('/sign-in') === -1) {
    AuthHelper.clearLoggedInUser();
    window.location.href = "/sign-in";
  }

  // Re-start the silent refresh if it has been killed, e.g. by a page reload
  AuthHelper.setRefreshInterval();

  let client = new ApiClient();
  let token = localStorage.getItem('accessToken');
  let basePath = getDomain() + '/v1';
  
  client.basePath = basePath;
  client.enableCookies = true;
  if (token !== null && token !== undefined && token.length > 0) {
    client.defaultHeaders['Authorization'] = 'Bearer ' + token;
  }

  // Remove user agent header (can't be set!)
  delete client.defaultHeaders['User-Agent'];

  return client;
}

export default GetApiClient;