import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Filters from "../../map/Filters";
import Map from "../../map/Map";
import MapUser from "../../map/MapUser";
import Park from "../../map/Park";
import ReviewPark from "../../map/ReviewPark";
import ReviewWalkingRoute from "../../map/ReviewWalkingRoute";
import WalkingRoute from "../../map/WalkingRoute";

class MapRouter extends React.Component {
  render() {
    return (
      <Switch>
        {/* /map/users/:id shows given user on the map */}
        <Route
          path={`${this.props.base}/users/:id`}
          render={() => <MapUser />}
        />

        {/* /map/parks/:id/review shows given park's new review screen */}
        <Route
          path={`${this.props.base}/parks/:id/review`}
          render={() => <ReviewPark />}
        />

        {/* /map/parks/:id shows given park on the map */}
        <Route
          path={`${this.props.base}/parks/:id`}
          render={() => <Park />}
        />

        {/* /map/routes/:id/review shows given route's new review screen */}
        <Route
          path={`${this.props.base}/routes/:id/review`}
          render={() => <ReviewWalkingRoute />}
        />

        {/* /map/routes/:id shows given route on the map */}
        <Route
          path={`${this.props.base}/routes/:id`}
          render={() => <WalkingRoute />}
        />

        {/* /map/filters shows filter UI */}
        <Route
          path={`${this.props.base}/filters`}
          render={() => <Filters />}
        />

        {/* /map shows map */}
        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Map centerAroundCurrentLocation={true} />}
        />
      </Switch>
    );
  }
}

export default MapRouter;