import React from "react"
import { withRouter } from "react-router";
import TabBar from "../../views/TabBar";
import StatusIndicator from "../../views/design/StatusIndicator";
import DateHelper from "../../helpers/DateHelper";
import Dog from "../../views/profile/Dog";
import Tag from "../../views/profile/Tag";
import GetApiClient from "../../helpers/ApiClientFactory";
import {DogsApi, UsersApi, TagsApi} from "sopra-fs21-group-02-dogs-api";
import { getDomain } from "../../helpers/getDomain";
import LoadingContainer from "../../views/design/LoadingContainer";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.getProfileCallback = this.getProfileCallback.bind(this);
    this.putProfileCallback = this.putProfileCallback.bind(this);
    this.putLogoutCallback = this.putLogoutCallback.bind(this);
    this.deleteTagCallback = this.deleteTagCallback.bind(this);
    this.saveBio = this.saveBio.bind(this);
    this.deleteAccountCallback = this.deleteAccountCallback.bind(this);

    this.state = {
      user: undefined,
      bioChanged: false,
      tagToDelete : null
    }
  }

  componentDidMount(){ //request profile data from server
    const client = GetApiClient();
    const api = new UsersApi(client);
    const userId = localStorage.getItem('loggedInUserId');
    api.usersUserIdGet(userId, this.getProfileCallback);
  }

  getProfileCallback(error, data, response){ //info us response im state  andere funktion ruft callback auf sobald etwas erhalten wird
    if(error){
      console.error(error);
      return;
    }
    this.setState({
      user : response.body
    })
  }

  logout(){
    const client = GetApiClient();
    const api = new UsersApi(client);
    api.usersUserIdLogoutPut(this.state.user.id, this.putLogoutCallback)
  }

  putLogoutCallback(error, data, response){
    if(error){
      console.error(error);
      return;
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiry');

    this.props.history.push("/sign-in");
  }

  deleteAccount(){
    const client = GetApiClient();
    const api = new UsersApi(client);
    api.usersUserIdDelete(this.state.user.id, this.deleteAccountCallback);
  }

  deleteAccountCallback(error, data, response){
    if(error){
      console.error(error);
      return;
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiry');
    this.props.history.push("/sign-in");
  }

  redirectToAddDog() {
    this.props.history.push("/profile/dog/new");
  }

  redirectToEditDog(dogId) {
    this.props.history.push("/profile/dog/" + dogId.toString());
  }

  redirectToAddTag(tagType) {
    this.props.history.push("/profile/tag/" + tagType.toString());
  }

  handleBioChange(event) {
    let newUser = Object.assign({}, this.state.user);
    newUser.bio = event.target.value;
    this.setState({
      user: newUser,
      bioChanged: true
    });
  }

  saveBio(){
    const client = GetApiClient();
    const api = new UsersApi(client);
    api.usersUserIdPut(this.state.user.id, this.state.user, this.putProfileCallback)
  }

  putProfileCallback(error, data, response){
    if(error){
      console.error(error);
      return;
    }
    this.setState({
      bioChanged: false
    })
  }

  deleteTag(tag, tagId) {
    this.setState({tagToDelete : tag})
    const userId = localStorage.getItem('loggedInUserId');
    const client = GetApiClient();
    const api = new TagsApi(client);

    api.deleteTag(userId, tagId, this.deleteTagCallback);
  }

  deleteTagCallback(error, data, response){
    if(error){
      console.error(error);
      return;
    }
    let newUser = Object.assign({}, this.state.user);
    let tags = [...this.state.user.tags];
    let index = tags.indexOf(this.state.tagToDelete);
    tags.splice(index,1)
    newUser.tags = tags;
    this.setState({
      user: newUser,
    });
    this.setState({tagToDelete : null})
  }

  render() {
    if (this.state.user === undefined){
      return(
        <LoadingContainer loadingtext={"Loading ..."}/>      )
    }
    return (
      <div className="h-screen w-full flex flex-col">
        <div className="flex-none z-50">
          <div className=" h-12 bg-gray-300 text-center">
            <h1 className="font-bold text-xl align-middle pt-2.5">Edit Profile</h1>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="flex w-full">
            <div className="flex-none mr-4">
              <img src={this.state.user.profilePicture} className="h-24 w-24 rounded-full bg-gray-400"></img>
            </div>
            <div className="flex-1">
              <div>
                <h2 className="font-bold text-black text-2xl overflow-ellipsis">{this.state.user.name}</h2>
              </div>
              <div className="mt-1">
                <StatusIndicator status={this.state.user.status} />
              </div>
              <div className="w-full select-text text-black mr-0">
                <textarea
                  value={this.state.user.bio}
                  placeholder="Enter a bio about you here"
                  onChange={this.handleBioChange}
                  className="w-full p-2 bg-white" />
                {this.state.bioChanged &&
                  <button
                    className="w-full text-center p-2 mr-2 bg-gray-600 text-white font-semibold rounded-md cursor-pointer"
                    onClick={this.saveBio}>Save Bio</button>
                }
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg mr-5 mb-2 mt-4">DOGS</h2>
            <div className="flex flex-wrap">
              {this.state.user.dogs.map(dog => {
                let ageString = DateHelper.getAgeStringFromDateOfBirth(dog.dateOfBirth);
                let imageUrl = `${getDomain()}/v1/users/${this.state.user.id}/dogs/${dog.id}/image`;
                return (
                  <div key={dog.id} className="w-1/2 truncate" dog={dog}>
                    <Dog name={dog.name} sex={dog.sex} breed={dog.breed} age={ageString} imageUrl={imageUrl} editable={true} click={() => this.redirectToEditDog(dog.id)}></Dog>
                  </div>
                )
              })}
              <button className="bg-gray-300 cursor-pointer h-16 w-16 rounded-full flex flex-col"
                onClick={() => this.redirectToAddDog()}>
                <div className="flex-initial mx-auto mt-0">
                  {<svg width="18" height="60" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.373 7.67383H17.7188V12.2617H11.373V19.4336H6.53906V12.2617H0.175781V7.67383H6.53906V0.800781H11.373V7.67383Z" fill="black" />
                  </svg>}
                </div>
              </button>
              <div className="flex-grow mt-5 ml-3">
                <span className="font-bold text-m leading-none">Add Dog???</span>
              </div>
            </div>
          </div>


          <div>
            <h2 className="font-bold text-lg mt-4">OFFERING</h2>
            <div className="flex flex-wrap">
              {this.state.user.tags.map(tag => {
                if (tag.tagType === "OFFERING") {
                  return (
                    <div key={tag.id} tag={tag} className="w-flex mt-1">
                      <Tag name={tag.name} onRemoveClick={() => this.deleteTag(tag, tag.id)} removable={true}></Tag>
                    </div>
                  )
                }
              })}
              <button className="flex mb-4 cursor-pointer w-18 h-10 mt-1 place-items-center inline-block p-2 bg-gray-300 rounded-md"
                   onClick={() => this.redirectToAddTag("offering")}>
                <div className="flex-none mr-2">
                  <svg width="12" height="28" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.373 7.67383H17.7188V12.2617H11.373V19.4336H6.53906V12.2617H0.175781V7.67383H6.53906V0.800781H11.373V7.67383Z" fill="black" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold leading-none">Add</h3>
                </div>
              </button>
            </div>

          <h2 className="ml-0 font-bold text-lg mt-2">LOOKING FOR</h2>
          <div className="flex flex-wrap">
            {this.state.user.tags.map(tag => {
              if (tag.tagType === "LOOKINGFOR") {
                return (
                  <div key={tag.id} tag={tag} className="w-flex mt-1">
                    <Tag name={tag.name} onRemoveClick={() => this.deleteTag(tag, tag.id)} removable={true}></Tag>
                  </div>
                )
              }
            })}
            <div className="flex mb-4 cursor-pointer w-18 h-10 mt-1 place-items-center inline-block p-2 bg-gray-300 rounded-md"
                 onClick={() => this.redirectToAddTag("looking")}>
              <div className="flex-none mr-2">
                <svg width="12" height="28" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.373 7.67383H17.7188V12.2617H11.373V19.4336H6.53906V12.2617H0.175781V7.67383H6.53906V0.800781H11.373V7.67383Z" fill="black" /></svg>
              </div>
              <div className="flex-grow">
                <h3 className="font-bold leading-none">Add</h3>
              </div>
            </div>
          </div>
        </div>


          {/*logout & delete account*/}
          <div className="flex-none mt-14">
            <div className="p-1" >
              <button className=" w-full text-center p-2 mr-2 bg-gray-600 text-white font-semibold rounded-md cursor-pointer"
                   onClick={(e) => this.logout(e)}>Logout</button>
            </div>
            <div className="p-1" >
              <button className=" w-full text-center p-2 mr-2 bg-red-600 text-white font-semibold rounded-md cursor-pointer"
                   onClick={(e) => {
                     if (window.confirm('Are you sure you want to delete your account?')) this.deleteAccount(e)
                   }}>Delete Account</button>
            </div>
          </div>
        </div>
        <div className="flex-none">
          <TabBar active="profile" />
        </div>
      </div>
    );
  }
}

export default withRouter(Profile)