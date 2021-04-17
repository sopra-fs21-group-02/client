import React from 'react';

class StatusIndicator extends React.Component {
  render() {
    if (this.props.status === "ONLINE") {
      return (
        <div className="inline-block">
          <div className="inline-block align-middle">
              <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              </span>
          </div>
          <span className="text-xs font-bold text-green-600 inline-b§lock align-middle">ONLINE</span>
        </div>
      )
    } else if (this.props.status === "OFFLINE") {
      return (
        <div className="inline-block">
          <div className="inline-block align-middle">
              <span className="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="h-2 w-2 bg-red-500 rounded-full"></span>
              </span>
          </div>
          <span className="text-xs font-bold text-red-600 inline-block align-middle">OFFLINE</span>
        </div>
      )
    } else if (this.props.status === "UNREAD") {
      return (
        <div className="inline-block">
          <div className="inline-block align-middle">
              <span className="h-4 w-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
              </span>
          </div>
        </div>
      )
    } else {
      console.warn("Status '" + this.props.status + "' is not supported by this component!");
      return (
        <span>UNSUPPORTED STATUS!!!</span>
      );
    }
  }
}

export default StatusIndicator;