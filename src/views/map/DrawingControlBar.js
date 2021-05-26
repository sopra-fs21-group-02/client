import React from 'react';
import Cancel from '../design/icons/Cancel';
import Park from '../design/icons/Park';
import Path from '../design/icons/Path';
import Plus from '../design/icons/Plus';

class DrawingControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  render() {
    let containerClassNames = "bg-gray-300 hover:bg-gray-400 p-4 cursor-pointer hover:font-bold rounded-full";
    if (this.state.isActive) {
      return (
        <div className="flex space-x-2">
          <div className={containerClassNames} onClick={this.props.parkClick}>
            <Park></Park>
          </div>
          <div className={containerClassNames} onClick={this.props.pathClick}>
            <Path></Path>
          </div>
          <div className={containerClassNames} onClick={() => { this.setState({ isActive: false }) }}>
            <Cancel></Cancel>
          </div>
        </div>
      )
    } else {
      return (
        <div className={containerClassNames} onClick={() => { this.setState({ isActive: true }) }}>
          <Plus></Plus>
        </div>
      )
    }
  }
}

export default DrawingControlBar;