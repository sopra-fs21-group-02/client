import React from 'react';

class SaveDrawingEntityDialog extends React.Component {
  constructor(props) {
    super(props);
    this.updateDescription = this.updateDescription.bind(this);
    this.state = { description: undefined };
  }

  updateDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    let friendlyDescription = '';
    if (this.props.entityType === "PARK") {
      friendlyDescription = "Park";
    } else if (this.props.entityType === "PATH") {
      friendlyDescription = "Walking Route";
    } else {
      throw("Unsupported entity type " + this.props.entityType)
    }

    return (
      <div className="h-screen w-full flex-col flex">
        <div className="flex-none z-50">
          <div className=" h-12 bg-gray-300 text-center">
            <h1 className="font-bold text-xl align-middle pt-2.5">Save New {friendlyDescription}</h1>
          </div>
        </div>

        <div className="overflow-auto p-4 flex flex-col">
          <textarea
            className="w-full placeholder-grey roudned border p-2"
            placeholder="Enter description..."
            value={this.state.description}
            onChange={this.updateDescription} />
        </div>

        <div className="h-12 bg-gray-300 absolute inset-x-0 bottom-0 text-center flex">
          <h1
            className="cursor-pointer hover:font-bold text-xl align-middle pt-2.5 w-1/2"
            onClick={() => this.props.cancelCallback()}>
            Cancel
          </h1>
          <h1
            className="cursor-pointer hover:font-bold text-xl align-middle pt-2.5 w-1/2 font-semibold"
            onClick={() => this.props.saveCallback(this.state.description)}>
            Save
          </h1>
        </div>

        <div className="flex-none h-12">
          <div className="flex bg-gray-300 text-center absolute inset-x-0 bottom-0">
            <h2
              onClick={() => this.props.cancelCallback()}
              className="hover:bg-gray-400 cursor-pointer hover:font-bold h-12 text-xl align-middle pt-2.5 w-1/2">
              Cancel
            </h2>
            <h2
              className="hover:bg-gray-400 cursor-pointer font-bold h-12 text-xl align-middle pt-2.5 w-1/2"
              onClick={() => this.props.saveCallback(this.state.description)}>
              Save
            </h2>
          </div>
        </div>
      </div>
    )
  }
}

export default SaveDrawingEntityDialog;