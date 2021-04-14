import React from "react"
import { withRouter } from "react-router";
import TabBar from "../../views/TabBar";
import StatusIndicator from "../../views/design/StatusIndicator";
import DateHelper from "../../helpers/DateHelper";
import EditDog from "../../views/profile/EditDog";
import styled from "styled-components";
import Tag from "../../views/profile/Tag";

const InputField = styled.input`
  &::placeholder {
    color: black;
  }
  height: 35px;
  width: screen;
  padding-left: 8px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: black;
`;

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "Celine",
                bio: "",
                id: 1,
                profilePicture: "https://upload.wikimedia.org/wikipedia/en/6/64/Cruella_de_Vil.png",
                latestLocation: {
                    latitude: 0,
                    longitude: 0
                },
                status: "ONLINE",
                tags: [
                    {
                        id: 1,
                        name: "Chat",
                        tagType: "OFFERING"
                    },
                    {
                        id: 2,
                        name: "Training",
                        tagType: "LOOKING"
                    },
                    {
                        id: 3,
                        name: "Petsitting",
                        tagType: "OFFERING"
                    },
                    {
                        id: 4,
                        name: "Chat",
                        tagType: "LOOKING"
                    },
                    {
                        id: 5,
                        name: "Shared Food Orders",
                        tagType: "OFFERING"
                    },
                    {
                        id: 6,
                        name: "Walking Buddies",
                        tagType: "OFFERING"
                    },
                ],
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
                    /*{
                        id: 4,
                        name: "Jumper",
                        sex: "MALE",
                        breed: "Dalmatian",
                        dateOfBirth: "2020-03-01",
                        imageUrl: "https://dogtime.com/assets/uploads/gallery/dalmatian-dog-breed-pictures/10-water.jpg"
                    }

                     */
                ]            },
        }
    }
  render() {
    let bio;
    if (this.state.user.bio == ""){
        bio = "Write a short description about you";
    }
    else {bio = this.state.user.bio}
    let plus =<svg width="12" height="28" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.373 7.67383H17.7188V12.2617H11.373V19.4336H6.53906V12.2617H0.175781V7.67383H6.53906V0.800781H11.373V7.67383Z" fill="black"/></svg>
      return (
          <div className="p-4 h-screen">
              <div className="absolute inset-x-0 top-0">
                  <div className=" h-12 bg-gray-300 text-center">
                      <h1 className="font-bold text-xl align-middle pt-2.5">Edit Profile</h1>
                  </div>
              </div>
              <div className="flex">
                  <div className="flex-none mr-4 mt-10">
                      <img src={this.state.user.profilePicture} className="h-24 w-24 rounded-full bg-gray-400"></img>
                  </div>
                  <div>
                      <div>
                          <h2 className="font-bold text-black mt-10 text-2xl">{this.state.user.name}</h2>
                      </div>
                      <div className="mt-1">
                          <StatusIndicator status={this.state.user.status} />
                      </div>
                      <div className="w-screen select-text text-black flex flex-content flex-box mr-0">
                          <InputField
                              placeholder={bio}
                              onChange={e => {
                                  this.handleInputChange('bio', e.target.value);
                              }}
                          />
                      </div>
                  </div>
              </div>
              <div>
                  <h2 className="font-bold text-lg mr-5 mb-2 mt-4">DOGS</h2>
                  <div className="flex flex-wrap">
                      {this.state.user.dogs.map(dog => {
                          let ageString = DateHelper.getAgeStringFromDateOfBirth(dog.dateOfBirth);
                          return (
                              <div key={dog.id} className="w-1/2 "
                                   onClick={() => this.redirectToEditDog(dog.id)}>
                                  <EditDog name={dog.name} sex={dog.sex} breed={dog.breed} age={ageString} imageUrl={dog.imageUrl}></EditDog>
                              </div>
                          )
                      })}
                      <div className="bg-gray-300 cursor-pointer h-16 w-16 rounded-full flex flex-col opacity-80"
                           onClick={() => this.redirectToAddDog()}>
                          <div className="flex-initial mx-auto mt-0">
                              {<svg width="18" height="60" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.373 7.67383H17.7188V12.2617H11.373V19.4336H6.53906V12.2617H0.175781V7.67383H6.53906V0.800781H11.373V7.67383Z" fill="black"/>
                              </svg>}
                          </div>
                      </div>
                      <div className="flex-grow mt-5 ml-3">
                          <span className="font-bold text-m leading-none">Add Dog…</span>
                      </div>
                  </div>
                  </div>
              <div>
                  <h2 className="font-bold text-lg mt-2">OFFERING</h2>
                  <div className="flex flex-wrap">
                      {this.state.user.tags.map(tag => {
                          if (tag.tagType === "OFFERING"){
                          return (
                              <div key={tag.id} className="w-flex mt-2">
                                  <Tag name={tag.name}></Tag>
                              </div>
                          )}
                      })}
                      <div className="cursor-pointer w-24 h-10 mt-2 place-items-center inline-block p-2 mr-2 bg-gray-300 font-semibold rounded-md"
                           onClick={() => this.redirectToAddTag()}>
                          <h3 className="font-bold leading-none"><span>{plus}</span> Add</h3>
                      </div>
                  </div>
                  <h2 className="ml-0 font-bold text-lg mt-4">LOOKING FOR</h2>
                  <div className="flex flex-wrap">
                      {this.state.user.tags.map(tag => {
                          if (tag.tagType === "LOOKING"){
                              return (
                                  <div key={tag.id} className="w-flex mt-2 ">
                                      <Tag name={tag.name}></Tag>
                                  </div>
                              )}
                      })}
                      <div className="cursor-pointer w-24 h-10 mt-2 place-items-center inline-block p-2 mr-2 bg-gray-300 font-semibold rounded-md"
                           onClick={() => this.redirectToAddTag()}>
                          <h3 className="font-bold leading-none"><span>{plus}</span> Add</h3>
                      </div>
                  </div>
              </div>

            <div className="absolute inset-x-0 bottom-0">
          <TabBar active="profile" />
            </div>
      </div>
    );
  }

    redirectToAddDog() {
        this.props.history.push("/profile/dog/new");
    }

    redirectToEditDog(dogId) {
        this.props.history.push("/profile/dog/" + dogId.toString());
    }

    handleInputChange(bio, value) {
        this.setState({ [bio]: value });
    }


    redirectToAddTag() {
        this.props.history.push("/profile/tag/new");
    }
}

export default withRouter(Profile)