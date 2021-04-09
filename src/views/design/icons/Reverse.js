import React from "react";

class Reverse extends React.Component {
  render() {
    return (
        <div onClick={this.props.onClick}>
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/*<circle cx="29" cy="29" r="29" fill="#ABABAB"/>*/}
            <path d="M32 20L25 29L32 38" stroke="#484848" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
    );
  }
}


export default Reverse;