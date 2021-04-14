import React from 'react';
import { withRouter } from 'react-router';

class NewDog extends React.Component {
    render() {
        return (
            <h1>Adding new Dog</h1>
        );
    }
}

export default withRouter(NewDog);