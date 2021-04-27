import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Profile from "../../profile/Profile";
import NewTag from "../../profile/NewTag";
import Dog from "../../profile/Dog";


class ProfileRouter extends React.Component {
    render() {
        return (
            <Switch>

                {/* / */}
                <Route
                    path={`${this.props.base}/dog/:dogId`}
                    render={() => <Dog />}
                />

                {/* / */}
                <Route
                    path={`${this.props.base}/dog/new`}
                    render={() => <Dog />}
                />

                {/* / */}
                <Route
                    exact
                    path={`${this.props.base}/tag/:tagType`}
                    render={() => <NewTag />}
                />

                {/* / */}
                <Route
                    exact
                    path={`${this.props.base}`}
                    render={() => <Profile />}
                />
            </Switch>
        );
    }
}
export default ProfileRouter;