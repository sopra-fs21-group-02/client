import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Back from "../../views/design/icons/Back";
import Tag from "../../views/profile/Tag";
import Picker from 'emoji-picker-react';
import GetApiClient from "../../helpers/ApiClientFactory";
import {TagsApi, UsersApi} from "sopra-fs21-group-02-dogs-api";

const suggestedTags = [
    "💬 Chat",
    "👀 Petsitting",
    "🏇 Training",
    "🐾 Walking Buddies",
    "🍽 Shared Food Orders"
]

class NewTag extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onEmojiClick = this.onEmojiClick.bind(this);
    this.addCustomTag = this.addCustomTag.bind(this);
    this.apiCallback = this.apiCallback.bind(this);
    this.addTag = this.addTag.bind(this);
    this.userGetCallback = this.userGetCallback.bind(this);
    this.saveTag = this.saveTag.bind(this);
    this.checkTag = this.checkTag.bind(this);

    this.state = {
      tagToAdd: {
        tagType: null,
        name: null
      },
      allTags: [],
      tagType: null,
      customTag:
          {name: "", emoji : ""},
      showEmojiSelection : false
    }
  }

  componentDidMount() {
    let routeId = this.props.match.params.tagType;
    if (routeId === "offering") {
      this.setState({tagType: "OFFERING"})
    } else {
      this.setState({tagType: "LOOKINGFOR"})
    }
    let client = GetApiClient();
    let api = new UsersApi(client);
    let userId = localStorage.getItem('loggedInUserId');
    api.usersUserIdGet(userId, this.userGetCallback);
  }

  userGetCallback(error, data, response) {
    if (error) {
      console.error(error);
      return;
    }
    let allTags = response.body.tags;
    this.setState({
      allTags : allTags
    })
  }

  redirectToProfile() {
    this.props.history.push("/profile")
  }

  async addTag(tagToAdd) {
    await this.setState({
      tagToAdd: {
        tagType: this.state.tagType,
        name: tagToAdd
      }
    })
    if (this.checkTag()){
      this.redirectToProfile();
      return;
    }
    if (!this.checkTag()){
      this.saveTag()
    }}

  checkTag(){
    let tagName = this.state.tagToAdd.name.toString();
    let tagType = this.state.tagToAdd.tagType.toString();
    let doubleTag = false;
    this.state.allTags.forEach(function (element, index) {
      if (element.name.toString() === tagName && element.tagType.toString() === tagType){
        alert("this tag is already added")
        doubleTag = true;
      }
    })
    return doubleTag;
  }

  saveTag(){
    const userId = localStorage.getItem('loggedInUserId');
    const client = GetApiClient()
    const apiTag = new TagsApi(client)

    let tag = Object.assign({}, this.state.tagToAdd);
    delete tag.id;

    console.log(tag)
    apiTag.addTag(userId, tag, this.apiCallback)
  }

  apiCallback(error, data, response) {
    console.log("add callback has been called")
    if (error) {
      console.error(error);
    }
    this.redirectToProfile()
  }

  // a user can add individual tags to his profile
  addCustomTag(){
    if (this.state.customTag.name && this.state.customTag.emoji){
      let newtag = "";
      newtag += this.state.customTag.emoji;
      newtag += " ";
      newtag += this.state.customTag.name;
      console.log(newtag)
      this.addTag(newtag)
    }
  }

  handleInputChange(event){
    this.setState(prevState => {
      let customTag = Object.assign({}, prevState.customTag);
      customTag[event.target.name] = event.target.value;
      return { customTag };
    })
  }

  onEmojiClick(event, emojiObject) {
    this.setState(prevState => {
      let customTag = Object.assign({}, prevState.customTag);
      customTag["emoji"] = emojiObject.emoji;
      this.setState({showEmojiSelection : false})
      return { customTag };
    })
  }

  openEmoji(){
    this.setState({showEmojiSelection : true})
  }

  render() {
    let emoji = "";
    if (this.state.customTag.emoji === ""){
      emoji += "☺ Pick Icon ..."}
    else {
      emoji += this.state.customTag.emoji}

    return (
        <div className="h-screen w-full flex-col flex">
          {/*top bar: add tag*/}
          <div className="flex-none z-50">
            <div className=" h-12 bg-gray-300 text-center">
              {(this.state.tagType === "OFFERING") ?
                  <h1 className="font-bold text-xl align-middle pt-2.5">Add "Offering" Tag</h1> :
                  <h1 className="font-bold text-xl align-middle pt-2.5">Add "Looking For" Tag</h1>
              }
              <div className="-mt-11 ">
                <Back
                    onClick={() => this.redirectToProfile()}
                ></Back>
              </div>
            </div>
          </div>

          {/*adding tags*/}
          <div className="flex-1 overflow-auto p-3">
            {/*suggested tags*/}
            <div>
              <h2 className="font-bold">SUGGESTED TAGS</h2>
              <div className="flex flex-wrap">
                {suggestedTags.map(tag => {
                  return (
                      <div className="w-flex mt-2">
                        <Tag name={tag} onClick={() => this.addTag(tag)} addable={true}></Tag>
                      </div>
                  )
                })}
              </div>
            </div>

            {/*custom tags*/}
            <div>
              <h2 className="font-bold mt-5 mb-3">ADD A CUSTOM TAG</h2>
            </div>
            <div className="mt-2">
              <div className="flex">
                <button
                    name="emoji"
                    value={this.state.customTag.emoji}
                    onChange={this.handleInputChange}
                    className="w-full text-black text-left text-bold rounded border bg-gray-400 h-9 p-1"
                    onClick={()=> this.openEmoji()}
                >{emoji}</button>
              </div>
              <div>
                {this.state.showEmojiSelection ?
                    <div>
                      <Picker onEmojiClick={this.onEmojiClick} pickerStyle={{ width: '70%' }}/>
                    </div> : null}
              </div>
              <input
                  placeholder="Tag name ..."
                  name="name"
                  value={this.state.customTag.name}
                  onChange={this.handleInputChange}
                  className="w-full placeholder-grey rounded border h-9 p-2 mt-3"
              />
              <button
                  className="inline-block p-2 mt-2 mr-2 bg-gray-400 text-white font-semibold text-s rounded-md cursor-pointer"
                  onClick={this.addCustomTag}
              >Add</button>
            </div>
          </div>
        </div>
    );
  }
}
export default withRouter(NewTag);