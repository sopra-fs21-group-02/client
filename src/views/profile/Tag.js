import React from 'react';

class Tag extends React.Component {
    render() {
        let tagIcon = this.props.name === "Chat" ? "💬" :
            this.props.name === "Petsitting" ?"👀" :
            this.props.name === "Training" ? "🏇🏻" :
            this.props.name === "Walking Buddies" ? "🐾" :
            this.props.name === "Shared Food Orders" ? "🍽️" : "";
        return (
            <div className="flex-grow inline-block p-3 mr-2 bg-gray-300 font-semibold rounded-md">
                <h3 className="font-bold leading-none"><span>{tagIcon}</span> {this.props.name}</h3>
            </div>
        )
    }
}

export default Tag;