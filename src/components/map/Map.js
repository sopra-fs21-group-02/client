import React from 'react';
import { withRouter } from 'react-router';
import NavigationTab from '../../views/design/navigation/NavigationTab';
import TabBar from '../../views/TabBar';
import Users from '../../views/design/icons/Users';

class Map extends React.Component {
  render() {
    return (
      <div>
        <h1>Show the map</h1>

        <div className="absolute inset-x-0 bottom-0">
          <TabBar active="map" />
        </div>
      </div>
    );
  }
}

export default withRouter(Map);