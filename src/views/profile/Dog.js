import React from 'react';

class Dog extends React.Component {
  render() {
    let sexIcon = this.props.sex === "MALE" ? "♂︎" : "♁";
    return(
      <div className="flex mb-4">
        <div className="flex-none mr-2">
          <img src={this.props.imageUrl} className="h-16 w-16 rounded-full bg-gray-400"></img>                  
        </div>
        <div className="flex-grow">
          <h3 className="font-bold leading-none">{this.props.name} <span>{sexIcon}</span></h3> 
          <span className="text-sm leading-none">{this.props.breed}</span><br/>
          <span className="text-sm leading-none">{this.props.age}</span>
        </div>
      </div>
    )
  }
}

export default Dog;