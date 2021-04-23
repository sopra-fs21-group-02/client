import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Back from "../../views/design/icons/Back";
import Tag from "../../views/profile/Tag";
import Picker from 'emoji-picker-react';


const suggestedTags = [
    "💬 Chat",
    "👀 Petsitting",
    "🏇 Training",
    "🐾 Walking Buddies",
    "🍽 Shared Food Orders"
]



const App = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };}


class NewTag extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenEmoji: null,
      tagsAdded: [],
      tagType: "OFFERING"
    }
  }

  componentDidMount() {
    let routeId = this.props.match.params.tagType;
    if (routeId === "offering") {
      this.setState({tagType: "OFFERING"})
    } else {
      this.setState({tagType: "LOOKING"})
    }
  }

  render() {
    let saveContainer = "";
    if ((this.state.tagsAdded).length === 0) {
      saveContainer += "h-12 font-bold text-xl align-middle pt-2.5 w-1/2 opacity-20 cursor-not-allowed"
    } else {
      saveContainer += "h-12 font-bold text-xl align-middle pt-2.5 w-1/2 hover:bg-gray-400 cursor-pointer hover:font-bold"
    }
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
          <div className="flex-1 ml-3 mt-3">
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
              <h2 className="font-bold mt-3">ADD A CUSTOM TAG</h2>

              


            </div>

            {/*show added tags*/}
            <div>
              <h2 className="font-bold mt-3 text-xs">YOUR ADDED TAGS</h2>
              <div className="flex flex-wrap">
                {this.state.tagsAdded.map(tag => {
                  return (
                      <div className="w-flex mt-2 text-xs">
                        <Tag name={tag} onRemoveClick={() => this.deleteTag(tag)} removable={true}></Tag>
                      </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/*Cancel or Save*/}
          <div className="flex-none">
            <div className="h-12">
              <div className="flex bg-gray-300 text-center absolute inset-x-0 bottom-0">
                <h1
                    className="hover:bg-gray-400 cursor-pointer hover:font-bold h-12 text-xl align-middle pt-2.5 w-1/2"
                    onClick={() => this.redirectToProfile()}
                >Cancel</h1>
                <h1 className={saveContainer}
                    onClick={() => this.saveTags()}>Save</h1>
              </div>
            </div>
          </div>
        </div>
    );
  }

  redirectToProfile() {
    this.props.history.push("/profile")
  }

  //TODO adapt method once API is integrated
  saveTags() {
    //saveTags!
    this.redirectToProfile()
  }

  addTag(tagToAdd) {
    console.log(!(this.state.tagsAdded.indexOf(tagToAdd) > -1))
    if (!(this.state.tagsAdded.indexOf(tagToAdd) > -1)) {
      this.setState({
        tagsAdded: this.state.tagsAdded.concat([tagToAdd])
      })
    } else {
      alert("you already added this tag. Please add other tags or save the changes")
    }
  }

  //TODO the pace of deletion is not as fast as I want it to be
  deleteTag(tag) {
    let tags = this.state.tagsAdded;
    let index = tags.indexOf(tag); // Let's say it's Bob.
    delete tags[index];
  }

  onEmojiClick(event, emojiObject) {
    this.setChosenEmoji(emojiObject);
  }

  setChosenEmoji(emoji) {
  }
}
export default withRouter(NewTag);