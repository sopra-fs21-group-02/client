import React from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../../helpers/auth";

/**
 * Ensures that *no* user is signed in, otherwise redirects to the map (main entrypoint of the app)
 */
export const SignedOutGuard = props => {
  if (Auth.loggedIn()) {
    return <Redirect to={"/map"} />;
  }
  
  return props.children;
};
