import React from "react"
import { withRouter } from "react-router";
import TabBar from "../../views/TabBar";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1>User's own profile!</h1>

        <div className="absolute inset-x-0 bottom-0">
          <TabBar active="profile" />
        </div>
      </div>
    );
  }
}

export default withRouter(Profile)