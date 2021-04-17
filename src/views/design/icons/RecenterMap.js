import React from "react";
import {withRouter} from "react-router";


class CurrentLocation extends React.Component {

    render() {
        let containerClasses = "flex-1 bg-gray-300 hover:bg-gray-400 p-4 cursor-pointer hover:font-bold rounded-full absolute top-4 left-4";

        if (this.props.active) {
            return (
                <div className={containerClasses} onClick={this.props.onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="gray" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                </div>
            );

        } else {
            return (
                <div className={containerClasses} onClick={this.props.onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                </div>
            );

        }
    }
}

export default CurrentLocation;