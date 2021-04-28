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

const ALL_USERS = [
  {
    id: 1,
    name: "User One",
    bio: "I love all dogs, but Dalamtians are my absolute favorite! Totally open to watch your dogs while you are on holiday!",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
    status: "ONLINE",
    latestLocation: {
      latitude: 47.38507005180391,
      longitude: 7.944326876563231
    },
    dogs: [
      {
        id: 1,
        name: "Bello",
        sex: "MALE",
        breed: "Dalmatian",
        dateOfBirth: "2020-10-01",
        imageUrl: "https://www.pdsa.org.uk/media/7888/dalmatian-gallery-outdoors-8-min.jpg"
      },
      {
        id: 2,
        name: "Winston",
        sex: "MALE",
        breed: "Dalmatian",
        dateOfBirth: "2018-04-01",
        imageUrl: "https://vetstreet-brightspot.s3.amazonaws.com/ee/140380a73111e0a0d50050568d634f/file/Dalmatian-2-645mk062311.jpg"
      },
      {
        id: 3,
        name: "Fifi",
        sex: "FEMALE",
        breed: "Dalmatian",
        dateOfBirth: "2017-04-01",
        imageUrl: "http://azure.wgp-cdn.co.uk/app-yourdog/posts/dalmatian.jpg"
      },
      {
        id: 4,
        name: "Jumper",
        sex: "MALE",
        breed: "Dalmatian",
        dateOfBirth: "2020-03-01",
        imageUrl: "https://dogtime.com/assets/uploads/gallery/dalmatian-dog-breed-pictures/10-water.jpg"
      }
    ],
    tags: [
      {
        id: 1,
        name: "💬 Chat",
        tagType: "LOOKING"
      },
      {
        id: 2,
        name: "🏇🏻 Training",
        tagType: "OFFERING"
      },
      {
        id: 3,
        name: "👀 Petsitting",
        tagType: "LOOKING"
      }
    ]
  },
  {
    id: 2,
    name: "User Two",
    bio: "I'm a user and I like dogs!!!",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
    status: "ONLINE",
    latestLocation: {
      latitude: 47.381019226154905,
      longitude: 7.951315032221059
    },
    dogs: [
      {
        id: 3,
        name: "Fifi",
        sex: "FEMALE",
        breed: "Dalmatian",
        dateOfBirth: "2017-04-01",
        imageUrl: "http://azure.wgp-cdn.co.uk/app-yourdog/posts/dalmatian.jpg"
      }
    ],
    tags: [
      {
        id: 1,
        name: "💬 Chat",
        tagType: "OFFERING"
      },
      {
        id: 2,
        name: "🏇🏻 Training",
        tagType: "LOOKING"
      },
      {
        id: 3,
        name: "👀 Petsitting",
        tagType: "OFFERING"
      }
    ]
  },
  {
    id: 3,
    name: "User Three",
    bio: "Lorem ipsum dolor sit amet",
    profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
    status: "OFFLINE",
    latestLocation: {
      latitude: 47.38275533240448,
      longitude: 7.931205231766877
    },
    dogs: [
      {
        id: 2,
        name: "Winston",
        sex: "MALE",
        breed: "Dalmatian",
        dateOfBirth: "2018-04-01",
        imageUrl: "https://vetstreet-brightspot.s3.amazonaws.com/ee/140380a73111e0a0d50050568d634f/file/Dalmatian-2-645mk062311.jpg"
      }
    ],
    tags: [
      {
        id: 1,
        name: "💬 Chat",
        tagType: "OFFERING"
      },
      {
        id: 2,
        name: "🏇🏻 Training",
        tagType: "LOOKING"
      },
      {
        id: 3,
        name: "👀 Petsitting",
        tagType: "OFFERING"
      },
      {
        id: 4,
        name: "💬 Chat",
        tagType: "LOOKING"
      },
      {
        id: 5,
        name: "🍽️ Shared Food Orders",
        tagType: "OFFERING"
      },
      {
        id: 6,
        name: "🐾 Walking Buddies",
        tagType: "LOOKING"
      },
    ],
  }
];

const FAKE_FETCH_USER = (id) => {
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (ALL_USERS[i].id === id) {
      return ALL_USERS[i];
    }
  }
}

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
  }

  componentDidMount() {
    // TODO: Fetch correct user from API
    let user = FAKE_FETCH_USER(parseInt(this.props.match.params.id));
    this.setState({
      user: user
    });
    GeoCoordinateHelper.getCurrentLocation(this.saveOwnLocation);
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


  render() {
    let distance = GeoCoordinateHelper.getDistanceFromLatLonInKm(this.state.ownLocation.latitude, this.state.ownLocation.longitude,
      this.state.user.latestLocation.latitude, this.state.user.latestLocation.longitude);

    // Cloaks the distance string while own location has not been loaded
    let distanceString = () => {
      if (this.state.ownLocation.latitude > 0 && this.state.ownLocation.longitude > 0) {
        return Math.round(distance).toString() + "KM AWAY";
      } else {
        return "...";
      }
    }

    let googleMapsPosition = {
      lat: this.state.user.latestLocation.latitude,
      lng: this.state.user.latestLocation.longitude
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
                return (
                  <div key={dog.id} className="w-1/2">
                    <Dog name={dog.name} sex={dog.sex} breed={dog.breed} age={ageString} imageUrl={dog.imageUrl}></Dog>
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
            <div className=" w-full text-center p-2 mr-2 bg-gray-600 text-white font-semibold rounded-md cursor-pointer"
              onClick={this.redirectToChat}>💬 Chat</div>
          </div>
          <TabBar active="map" />
        </div>
      </div>
    )
  }

  redirectBackToMapUser() {
    this.props.history.push("/map/users/" + this.state.user.id.toString());
  }
}

export default withRouter(User);