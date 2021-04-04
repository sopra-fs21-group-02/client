import React from 'react';
import Users from '../icons/Users';
import Map from '../icons/Map';
import Chat from '../icons/Chat';
import Profile from '../icons/Profile';

class NavigationTab extends React.Component {
  render() {
    let icon = undefined;
    let text = "";
    if(this.props.type === 'users') {
      icon = <Users filled={this.props.active}></Users>;
      text = "Users";
    } else if (this.props.type === 'map') {
      icon = <Map filled={this.props.active}></Map>;
      text = "Map";
    } else if (this.props.type === 'chat') {
      icon = <Chat filled={this.props.active}></Chat>;
      text = "Chat";
    } else if (this.props.type === 'profile') {
      icon = <Profile filled={this.props.active}></Profile>;
      text = "Profile";
    } else {
      throw "Type '" + this.props.type + "' is not supported in NavigationTab!";
    }

    let containerClasses = "flex-1 hover:bg-gray-400 p-3 cursor-pointer hover:font-bold";
    if(this.props.active) { 
      containerClasses += " bg-gray-400";
    } else {
      containerClasses += " bg-gray-300";
    }
    
    let textClasses = "flex-initial text-xs mt-1.5 text-center";
    if(this.props.active) {
      textClasses += " font-semibold";
    }

    return (
      <div className={containerClasses} onClick={this.props.onClick}>
        <div className="flex flex-col">
          <div className="flex-initial mx-auto">
            {icon}
          </div>
          <span className={textClasses}>{text}</span>
        </div>
      </div>
    );
  } 
}

export default NavigationTab;