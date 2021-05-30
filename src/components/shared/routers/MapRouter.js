import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Map from "../../map/Map";
import MapUser from "../../map/MapUser";

class MapRouter extends React.Component {
  render() {
    return (
      <Switch>
        {/* /map/users/:id shows given user on the map */}
        <Route
          path={`${this.props.base}/users/:id`}
          render={() => <MapUser />}
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