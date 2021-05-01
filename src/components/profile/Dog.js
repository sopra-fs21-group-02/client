import React, { useRef } from 'react';
import { withRouter } from 'react-router';
import styled from "styled-components";
import { RefObject } from "react";
import moment from "moment";
import GetApiClient from "../../helpers/ApiClientFactory";
import {DogsApi} from "sopra-fs21-group-02-dogs-api";


const ALL_DOGS = [
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

];

const FAKE_FETCH_DOGS = (id) => {
  for (let i = 0; i < ALL_DOGS.length; i++) {
    if (ALL_DOGS[i].id === id) {
      return ALL_DOGS[i];
    }
  }
}

class Dog extends React.Component {
  inputRef: RefObject<HTMLInputElement>

  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveSex = this.saveSex.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.deleteDog = this.deleteDog.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.editDog = this.editDog.bind(this);
    this.addDog = this.addDog.bind(this);
    this.apiCallback = this.apiCallback.bind(this);
    this.setFile = this.setFile.bind(this);

    this.inputRef = React.createRef();
    this.state = {
      active: false,
      dog: {
        breed: "",
        sex: "",
        name: "",
        imageUrl: "https://www.pdsa.org.uk/media/7888/dalmatian-gallery-outdoors-8-min.jpg",
        dateOfBirth: "",
        id: -1
      }
    }
  }

  componentDidMount() {
    this.inputRef.current.focus();
    let routeId = this.props.match.params.dogId;
    console.log(routeId)
    if (routeId === "new") { // New dog
      this.setState({
        dog: {
          breed: "",
          sex: "",
          name: "",
          imageUrl: "https://thumbs.dreamstime.com/z/puppy-vector-illustration-isolated-white-background-dog-line-art-puppy-vector-illustration-cute-cartoon-dog-140539394.jpg",
          dateOfBirth: "",
          id: -1
        }
      });
    } else { // Editing dog
      let dogServer = FAKE_FETCH_DOGS(parseInt(routeId));
      this.setState({
        dog: dogServer,
        active: dogServer.sex
      });
    }
  }

  setFile = (file) => {
    this.inputRef.current.click()
    this.setState({
      newImage: file[0]
    })
  }

  //TODO adapt method once API is integrated
  saveDog() {
    if (!this.state.dog.sex || !this.state.dog.name || !this.state.dog.breed || !this.state.dog.dateOfBirth) {
      alert("please enter all attributes of your dog. Name, breed, date of birth and sex")
      return;
    }
    if (!this.checkDate()) {
      alert("please enter a correct birth date (format JJJJ-MM-DD)")
      return;
    }
    if (this.state.dog.id === -1){
      console.log("adding new dog")
      this.addDog()
    }
    else{
      console.log("editing dog")
      this.editDog()
    }
  }

  addDog(){
    console.log("add dog has been called")
    const reader = new FileReader();
    let image = reader.readAsBinaryString(this.state.newImage);

    //TODO userId of current logged in user
    const userId = 1;

    const client = GetApiClient()
    const api = new DogsApi(client)
    let dogFormData = new FormData();
    for (var key in this.state.dog) {
      dogFormData.append(key, this.state.dog[key]);
    }

    let imageFormData = new FormData();
    imageFormData.append('profilePicture', this.state.newImage);
    //api.addDog(userId, this.state.dog, {profilePicture: this.state.newImage}, this.apiCallback)
    api.addDog(userId, dogFormData, imageFormData, this.apiCallback)

  }

  editDog(){

  }

  deleteDog() {

  }

  apiCallback(error, data, response){
    console.log("callback has been called")
    if(error){
      console.error(error);
      return;
    }
    this.props.history.push("/profile");
  }

  checkDate() {
    let date = moment(this.state.dog.dateOfBirth)
    return date.isValid()
  }

  //TODO adapt method once API is integrated
  handleInputChange(event) {
    this.setState(prevState => {
      let dog = Object.assign({}, prevState.dog);
      dog[event.target.name] = event.target.value;
      console.log(this.state.dog)
      return { dog };
    })
  }

  //TODO adapt method once API is integrated
  saveSex(sex) {
    this.setState(prevState => {
      let dog = Object.assign({}, prevState.dog);
      dog.sex = sex;
      console.log(this.state.dog)
      return { dog };
    })
    this.setState({ active: sex })
    console.log(this.state.dog)
  }

  render() {
    let container = "cursor-pointer hover:bg-gray-400 flex-grow inline-block p-3 mr-2 bg-gray-300 text-xs rounded-md";
    let containerMale = container;
    if (this.state.active === "MALE") {
      containerMale += " bg-gray-400";
    } else {
      containerMale += " bg-gray-300";
    }
    let containerFemale = container;
    if (this.state.active === "FEMALE") {
      containerFemale += " bg-gray-400";
    } else {
      containerFemale += " bg-gray-300";
    }

    let saveContainer = "";
    if (!this.state.dog.sex || !this.state.dog.name || !this.state.dog.breed || !this.state.dog.dateOfBirth) {
      saveContainer += "h-12 font-bold text-xl align-middle pt-2.5 w-1/2 opacity-20 cursor-not-allowed"
    }
    else {
      saveContainer += "h-12 font-bold text-xl align-middle pt-2.5 w-1/2 hover:bg-gray-400 cursor-pointer hover:font-bold"
    }

    let imageUrl = this.state.dog.imageUrl;
    if (this.state.newImage){
      imageUrl = URL.createObjectURL(this.state.newImage);
    }
    return (
      <div className="h-screen w-full flex-col flex">
        <div className="flex-none z-50">
          <div className=" h-12 bg-gray-300 text-center">
            {(!this.state.dog.sex || !this.state.dog.name || !this.state.dog.breed || !this.state.dog.dateOfBirth) ?
              <h1 className="font-bold text-xl align-middle pt-2.5">New Dog</h1> :
              <h1 className="font-bold text-xl align-middle pt-2.5">Edit Dog</h1>
            }
          </div>
        </div>

        {/* to edit or add */}
        <div className="overflow-auto p-4 flex flex-cols">
          {/* attributes of dog: name, breed, date of birth and sex and del dog*/}
          <div className="flex-grow w-full">
            <h2 className="font-bold">NAME</h2>
            <input
              placeholder="Enter the name of your dog here (e.g. Fifi)."
              name="name"
              value={this.state.dog.name}
              onChange={this.handleInputChange}
              className="w-full placeholder-grey rounded border h-9 p-2"
            />
            <h2 className="font-bold text-black mt-5">BREED</h2>
            <input
              placeholder="Enter the breed of your dog here (e.g. Dalmatian)."
              name="breed"
              value={this.state.dog.breed}
              onChange={this.handleInputChange}
              className="w-full placeholder-grey rounded border h-9 p-2"
            />
            <h2 className="font-bold text-black mt-5">DATE OF BIRTH</h2>
            <input
              placeholder="Enter the date of birth of your dog here (e.g. 2018-04-01)."
              name="dateOfBirth"
              value={this.state.dog.dateOfBirth}
              onChange={this.handleInputChange}
              className="w-full placeholder-grey rounded border h-9 p-2"
            />

            {/* select the sex*/}
            <h2 className="font-bold text-black mt-5">SEX</h2>
            <div className={containerFemale}
              onClick={() => this.saveSex("FEMALE")}>
              <h3 className="font-bold leading-none">Female</h3>
            </div>
            <div className={containerMale}
              onClick={() => this.saveSex("MALE")}>
              <h3 className="font-bold leading-none">Male</h3>
            </div>

            {/* delete button "remove dog" */}
            {(this.state.dog.sex || this.state.dog.name || this.state.dog.breed || this.state.dog.dateOfBirth) ?
              <h2 className="font-bold text-black mt-5">REMOVE FROM PROFILE?</h2> : null}
            {(this.state.dog.sex || this.state.dog.name || this.state.dog.breed || this.state.dog.dateOfBirth) ?
              <div className={container}>
                <h3 className="font-bold leading-none">
                  Delete Dog
                  <span className="cursor-pointer text-gray-700 ml-1"
                    onClick={(e) => {
                      if (window.confirm('Are you sure you want to remove this dog from your profile?')) this.deleteDog(e)
                    }}> x</span>
                </h3>
              </div>
              : null}
          </div>

          {/* adding image here */}
          <div className="flex m-2">
            <div className="bg-cover bg-no-repeat bg-center h-20 w-20 rounded-full" style={{
              backgroundImage: `url(${imageUrl})`,
            }}>
              <div className="group-hover:opacity-100 group-hover: cursor-pointer">
                <div className="hover:bg-gray-300 cursor-pointer h-20 w-20 rounded-full flex flex-col opacity-80">
                  <div>
                    <label htmlFor="fileUpload">
                      <div>
                        <div className="m-7">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.7376 1.7376C18.0328 1.43197 18.3859 1.18819 18.7763 1.02048C19.1667 0.85277 19.5866 0.764494 20.0115 0.760802C20.4364 0.75711 20.8578 0.838075 21.2511 0.998974C21.6443 1.15987 22.0016 1.39748 22.3021 1.69794C22.6025 1.9984 22.8401 2.35568 23.001 2.74895C23.1619 3.14222 23.2429 3.56359 23.2392 3.98849C23.2355 4.41338 23.1472 4.83329 22.9795 5.2237C22.8118 5.61411 22.568 5.96721 22.2624 6.2624L20.9936 7.5312L16.4688 3.0064L17.7376 1.7376ZM14.2064 5.2688L0.8 18.6752V23.2H5.3248L18.7328 9.7936L14.2048 5.2688H14.2064Z" fill="black" />
                          </svg>
                        </div>
                      </div>
                    </label>
                    <input hidden
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      ref={this.inputRef}
                      style={{ display: 'none' }}
                      onChange={e => { this.setFile(e.target.files) }}
                      className="upload bg-cover bg-no-repeat bg-center h-20 w-20 rounded-full" />
                  </div>
                </div>
              </div>
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
                onClick={() => this.saveDog()}>Save</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dog);