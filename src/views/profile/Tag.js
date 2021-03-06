import React from 'react';

class Tag extends React.Component {
  render() {
    return (
      <div className="flex-grow inline-block p-3 mr-2 bg-gray-300 font-semibold rounded-md">
        <h3 className="font-bold leading-none">
          {this.props.name}
          {this.props.removable ?
            <span className="cursor-pointer text-gray-700 ml-1"
              onClick={this.props.onRemoveClick}> x
                        </span>
            : null}
            {this.props.addable ?
                <span className="cursor-pointer text-gray-700 ml-1"
                      onClick={this.props.onClick}> +
                        </span>
                : null}
        </h3>
      </div>
    )
  }
}

export default Tag;