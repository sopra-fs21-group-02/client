import {Map} from './components/map/Map';

export default GoogleApiWrapper(
    (props) => ({
            apiKey: props.apiKey
        })
)(Map)
