import React from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../../helpers/auth";

/**
 * Ensures that a user is signed in, otherwise redirects to login page
 */
export const SignedInGuard = props => {
  if (Auth.loggedIn()) {
    return props.children;
  }
  
  
  return <Redirect to={"/sign-in"} />;
};
