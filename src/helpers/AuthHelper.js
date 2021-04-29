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
        this.refreshInterval = setInterval(this.refreshAccessToken, interval);
    }

    static refreshAccessToken() {
        // TODO: get new access token from server...
        // TODO: Store new access token & expiry in localstorage...
        alert("TODO: Refresh access token!");
    }
}

export default AuthHelper;