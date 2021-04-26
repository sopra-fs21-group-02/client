import React from 'react';
import StatusIndicator from '../design/StatusIndicator';

class UserListUser extends React.Component {
  render() {
    return (
      <div className="hover:bg-gray-100 cursor-pointer" onClick={this.props.onClick}>
        <div className="flex border-b border-gray-400 p-2">
          <div className="flex-none">
            <img src={this.props.userImageURL} className="h-12 w-12 rounded-full bg-gray-400"></img>
          </div>
          <div className="flex-1 pt-2 pl-4">
            <h2 className="font-semibold text-lg -mt-0.25">{this.props.userName}</h2>
          </div>
          <div className="flex-none pt-2.5">
            <div className="float-right">
              <StatusIndicator status={this.props.userStatus}></StatusIndicator>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserListUser;