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

  static setRefreshInterval() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    let interval = 1800000 / 2; // Refresh after half the access token expiry time on the server
    this.refreshInterval = setInterval(() => {this.refreshAccessToken()}, interval);
  }

  static refreshAccessToken() {
    let client = GetApiClient();
    let api = new UsersApi(client);
    let token = this.getCookie('refresh_token');

    api.usersRefreshTokenPut(token, (e, d, r) => {this.refreshTokenCallback(e, d, r)});
  }

  static refreshTokenCallback(error, data, response) {
    if (error) {
      // If we couldn't refresh the token, sign out the user
      this.clearLoggedInUser();
      this.afterLogout();
      console.error(error);
      return;
    }

    localStorage.setItem('accessToken', response.body.accessToken);
    localStorage.setItem('accessTokenExpiry', response.body.accessTokenExpiry);
  }

  static getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

export default AuthHelper;