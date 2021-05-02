import React from 'react';
import { withRouter } from 'react-router';
import GeoCoordinateHelper from "../../helpers/GeoCoordinateHelper";
import StatusIndicator from "../../views/design/StatusIndicator";
import DateHelper from "../../helpers/DateHelper";
import Dog from "../../views/profile/Dog";
import Button from "../../views/design/Button";
import TabBar from "../../views/TabBar";
import Tag from "../../views/profile/Tag";
import Back from "../../views/design/icons/Back";
import ApiClientFactory from "../../helpers/ApiClientFactory";
import {UsersApi} from "sopra-fs21-group-02-dogs-api";
import { getDomain } from '../../helpers/getDomain';


const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        bio: "",
        id: 0,
        latestLocation: {
          latitude: 0,
          longitude: 0
        },
        status: "",
        dogs: [],
        tags: []
      },
      ownLocation: {
        latitude: 0,
        longitude: 0
      }
    };

    this.redirectToChat = this.redirectToChat.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.saveOwnLocation = this.saveOwnLocation.bind(this);
    this.apiCallback = this.apiCallback.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const client = ApiClientFactory();
    const api = new UsersApi(client);

    const userId = this.props.match.params.id;
    api.usersUserIdGet(userId, this.apiCallback);

    GeoCoordinateHelper.getCurrentLocation(this.saveOwnLocation);
  }

  apiCallback(error, data, response){
    if(error){
      console.error(error);
      return;
    }

    this.setState({
      user: response.body
    })
  }

  redirectToProfile() {
    let url = "/users/" + this.state.user.id.toString();
    this.props.history.push(url);
  }

  redirectToChat() {
    let url = "/chat/" + this.state.user.id.toString();
    this.props.history.push(url);
  }

  saveOwnLocation(position) {
    this.setState({
      ownLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
  }

  redirectBackToMapUser() {
    this.props.history.push("/map/users/" + this.state.user.id.toString());
  }

  render() {
    let distance = ""
    if (this.state.ownLocation.latitude > 0 && this.state.ownLocation.longitude > 0 && this.state.latestLocation > 0 && this.state.latestLocation.longitude > 0) {
      distance = GeoCoordinateHelper.getDistanceFromLatLonInKm(this.state.ownLocation.latitude, this.state.ownLocation.longitude,
        this.state.user.latestLocation.latitude, this.state.user.latestLocation.longitude);
    }

    // Cloaks the distance string while own location has not been loaded
    let distanceString = () => {
      if (this.state.ownLocation.latitude > 0 && this.state.ownLocation.longitude > 0 && this.state.user.latestLocation > 0 && this.state.user.latestLocation.longitude > 0) {
        return Math.round(distance).toString() + "KM AWAY";
      }
      else {
        return "No distance to user available...";
      }
    }

    return (
      <div className="h-screen w-full flex flex-col">
        <div className="flex-1 overflow-auto p-4">
          <div className="flex">

            <div className="absolute top-9 -left-4 cursor-pointer" onClick={() => this.redirectBackToMapUser()}>
              <Back></Back>
            </div>

            <div className="flex-none mr-3 ml-3">
              <img src={this.state.user.profilePicture} className="h-24 w-24 rounded-full bg-gray-400"></img>
            </div>

            <div className="ml-3">
              <div>
                <h2 className="font-bold text-2xl">{this.state.user.name}</h2>
              </div>
              <div>
                <StatusIndicator status={this.state.user.status} />
                <span className="text-xs font-bold text-gray-500 ml-2">{distanceString()}</span>
              </div>
              <div>
                <p>{this.state.user.bio}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-2 mt-4">DOGS</h2>
            <div className="flex flex-wrap">
              {this.state.user.dogs.map(dog => {
                let ageString = DateHelper.getAgeStringFromDateOfBirth(dog.dateOfBirth);
                let imageUrl = `${getDomain()}/v1/users/${this.state.user.id}/dogs/${dog.id}/image`;
                return (
                  <div key={dog.id} className="w-1/2">
                    <Dog name={dog.name} sex={dog.sex} breed={dog.breed} age={ageString} imageUrl={imageUrl}></Dog>
                  </div>
                )
              })}
            </div>
          </div>

          {/* //TODO comment in as soon as API is ready
          <div>
            <h2 className="font-bold text-lg mt-2">OFFERING</h2>
            <div className="flex flex-wrap">
              {this.state.user.tags.map(tag => {
                if (tag.tagType === "OFFERING") {
                  return (
                    <div key={tag.id} className="w-flex mt-2">
                      <Tag name={tag.name}></Tag>
                    </div>
                  )
                }
              })}
            </div>
          </div>
          <div>
            <h2 className="ml-0 font-bold text-lg mt-4">LOOKING FOR</h2>
            <div className="flex flex-wrap">
              {this.state.user.tags.map(tag => {
                if (tag.tagType === "LOOKING") {
                  return (
                    <div key={tag.id} className="w-flex mt-2 ">
                      <Tag name={tag.name}></Tag>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        */}
        </div>
        <div className="flex-none mt-14">
          <div className="absolute inset-x-0 bottom-20 p-4" >
            <button className=" w-full text-center p-2 mr-2 bg-gray-600 text-white font-semibold rounded-md cursor-pointer"
              onClick={this.redirectToChat}>💬 Chat</button>
          </div>
          <TabBar active="map" />
        </div>
      </div>
    )
  }
}

export default withRouter(User);