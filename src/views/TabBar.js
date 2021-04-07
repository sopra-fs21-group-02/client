import React, { Component } from "react";
import { withRouter } from "react-router";
import NavigationTab from './design/navigation/NavigationTab'

class TabBar extends React.Component {
  constructor(props) {
    super(props);

    this.onTabClick = this.onTabClick.bind(this);
  }
  
  onTabClick(navTarget) {
    this.props.history.push(navTarget);
  }

  render() {
    return (
      <div className="flex">
        <NavigationTab onClick={() => this.onTabClick('/users')} type="users" active={this.props.active === 'users'} />
        <NavigationTab onClick={() => this.onTabClick('/map')} type="map" active={this.props.active === 'map'} />
        <NavigationTab onClick={() => this.onTabClick('/chat')} type="chat" active={this.props.active === 'chat'} />
        <NavigationTab onClick={() => this.onTabClick('/profile')} type="profile" active={this.props.active === 'profile'} />
      </div>
    )
  }
}

export default withRouter(TabBar);