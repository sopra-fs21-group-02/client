import React from "react";
import { Redirect } from "react-router-dom";
import AuthHelper from "../../../helpers/AuthHelper";

/**
 * Ensures that *no* user is signed in, otherwise redirects to the map (main entrypoint of the app)
 */
export const SignedOutGuard = props => {
  if (AuthHelper.loggedIn()) {
    return <Redirect to={"/map"} />;
  }
  
  return props.children;
};
