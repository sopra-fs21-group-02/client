import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { SignedInGuard } from "../routeProtectors/SignedInGuard";
import { SignedOutGuard } from "../routeProtectors/SignedOutGuard";

import UsersRouter from "./UsersRouter";
import ChatRouter from "./ChatRouter";
import MapRouter from "./MapRouter";
import ProfileRouter from "./ProfileRouter";

import Login from "../../login/Login";
import Profile from "../../profile/Profile";

/**
 * Main router of the application.
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* sign-in / sign-out routes */}
          <Route
            path="/sign-in"
            render={() => (
              <SignedOutGuard>
                <Login />
              </SignedOutGuard>
            )}
          />
          <Route
            path="/sign-out"
            render={() => (
              <SignedInGuard>
                {/* TODO: Log out the user here! */}
                {alert("Logged out!")}
                <Redirect to={"/"}></Redirect>
              </SignedInGuard>
            )}
          />

          {/* Subrouter for Users area */}
          <Route
            path="/users"
            render={() => (
              <SignedInGuard>
                <UsersRouter base={"/users"}></UsersRouter>
              </SignedInGuard>
            )}
          />

          {/* Subrouter for Chat area */}
          <Route
            path="/chat"
            render={() => (
              <SignedInGuard>
                <ChatRouter base={"/chat"}></ChatRouter>
              </SignedInGuard>
            )}
          />

          {/* Subrouter for Map area */}
          <Route
            path="/map"
            render={() => (
              <SignedInGuard>
                <MapRouter base={"/map"}></MapRouter>
              </SignedInGuard>
            )}
          />

          {/* Edit user's own profile */}
          <Route
            path="/profile"
            render={() => (
              <SignedInGuard>
                <ProfileRouter base={"/profile"}></ProfileRouter>
              </SignedInGuard>
            )}
          />

          {/* Fallback: Root path redirects to the map (main entrypoint) */}
          <Route path="/" exact render={() => <Redirect to={"/map"} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
