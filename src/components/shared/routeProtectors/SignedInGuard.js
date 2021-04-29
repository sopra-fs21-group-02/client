import React from "react";
import { Redirect } from "react-router-dom";
import AuthHelper from "../../../helpers/AuthHelper";

/**
 * Ensures that a user is signed in, otherwise redirects to login page
 */
export const SignedInGuard = props => {
  if (AuthHelper.loggedIn()) {
    return props.children;
  }
  
  
  return <Redirect to={"/sign-in"} />;
};
