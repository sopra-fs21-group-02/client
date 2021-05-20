import React from "react";


class RecenterMap extends React.Component {

  render() {
    if (this.props.active) {
      return (
        <div  onClick={this.props.onClick} className="hover:bg-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="gray" fillOpacity="0.8" viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </div>
      );

    } else {
      return (
        <div  onClick={this.props.onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </div>
      );

    }
  }
}

export default RecenterMap;