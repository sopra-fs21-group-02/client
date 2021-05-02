import { UsersApi } from "sopra-fs21-group-02-dogs-api";
import GetApiClient from "./ApiClientFactory";

class AuthHelper {
  static refreshInterval = undefined;

  static loggedIn() {
    let token = localStorage.getItem('accessToken');
    let expiry = new Date(localStorage.getItem('accessTokenExpiry'));

    if (token && token.length > 0 && new Date() < expiry) {
      // If a token is present and not expired, the user is logged in.
      return true;
    }

    return false;
  }

  static afterLogin(userId, accessToken, accessTokenExpiry) {
    this.storeLoggedInUser(userId, accessToken, accessTokenExpiry);
    this.setRefreshInterval();
  }

  static afterLogout() {
    clearInterval(this.refreshInterval);
    this.clearLoggedInUser();
  }

  static storeLoggedInUser(userId, accessToken, accessTokenExpiry) {
    localStorage.setItem('loggedInUserId', userId);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessTokenExpiry', accessTokenExpiry);
  }

  static clearLoggedInUser() {
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiry');
  }

  static setRefreshInterval(triggerImmediateRefresh) {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    let interval = 1800000 / 2; // Refresh after half the access token expiry time on the server
    this.refreshInterval = setInterval(() => {this.refreshAccessToken()}, interval);

    if (triggerImmediateRefresh) {
      this.refreshAccessToken();
    }
  }

  static refreshAccessToken() {
    let client = GetApiClient();
    let api = new UsersApi(client);

    api.usersRefreshTokenPut('', (e, d, r) => {this.refreshTokenCallback(e, d, r)});
  }

  static refreshTokenCallback(error, data, response) {
    if (error) {
      // If we couldn't refresh the token, sign out the user
      this.clearLoggedInUser();
      this.afterLogout();
      console.error(error);

      if (window.location.href.indexOf('/sign-in') === -1) {
        window.location.href = '/sign-in';
      }
      
      return;
    }

    localStorage.setItem('accessToken', response.body.accessToken);
    localStorage.setItem('accessTokenExpiry', response.body.accessTokenExpiry);
  }
}

export default AuthHelper;