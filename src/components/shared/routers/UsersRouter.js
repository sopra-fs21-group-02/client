import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import User from "../../users/User";
import UserList from "../../users/UserList";

class UsersRouter extends React.Component {
  render() {
    return (
      <Switch>
        {/* /users/:id shows user's full profile by ID */}
        <Route
          path={`${this.props.base}/:id`}
          render={() => <User />}
        />

        {/* /users shows user list component */}
        <Route
          exact
          path={`${this.props.base}`}
          render={() => <UserList />}
        />
      </Switch>
    );
  }
}

export default UsersRouter;