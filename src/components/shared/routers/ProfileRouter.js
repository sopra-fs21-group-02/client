import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Profile from "../../profile/Profile";
import NewDog from "../../profile/NewDog";
import EditDog from "../../profile/EditDog";
import NewTag from "../../profile/NewTag";
import DogImage from "../../profile/DogImage";


class ProfileRouter extends React.Component {
    render() {
        return (
            <Switch>

                <Route
                    exact
                    path={`${this.props.base}/dog/new/image`}
                    render={() => <DogImage />}
                />

                {/* / */}
                <Route
                    path={`${this.props.base}/dog/new`}
                    render={() => <NewDog />}
                />

                {/* / */}
                <Route
                    path={`${this.props.base}/dog/:dogId`}
                    render={() => <EditDog />}
                />

                {/* / */}
                <Route
                    exact
                    path={`${this.props.base}/tag/new`}
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