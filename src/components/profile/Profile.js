import React from "react"
import { withRouter } from "react-router";

class Profile extends React.Component {
    render() {
        return (
            <h1>User's own profile!</h1>
        );
    }
}

export default withRouter(Profile)