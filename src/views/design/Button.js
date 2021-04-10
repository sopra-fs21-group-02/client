import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <button className="inline-block p-2 mr-2 bg-gray-600 text-white font-semibold rounded-md cursor-pointer" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
}

export default Button;