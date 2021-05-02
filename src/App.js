import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import AuthHelper from "./helpers/AuthHelper";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  constructor(props) {
    super(props);

    // After a reload, we need to re-set the auth refresh interval
    AuthHelper.setRefreshInterval(true);
  }

  render() {
    return (
      <div>
        <AppRouter />
      </div>
    );
  }
}

export default App;
