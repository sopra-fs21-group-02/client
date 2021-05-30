import React, { useRef } from 'react';
import { withRouter } from 'react-router';
import styled from "styled-components";
import { RefObject } from "react";
import moment from "moment";
import GetApiClient from "../../helpers/ApiClientFactory";
import {DogsApi, UsersApi} from "sopra-fs21-group-02-dogs-api";
import { getDomain } from '../../helpers/getDomain';
import Users from '../../views/design/icons/Users';
import Button from "../../views/design/Button";


class Dog extends React.Component {
  inputRef: RefObject<HTMLInputElement>

  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveSex = this.saveSex.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.deleteDog = this.deleteDog.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.checkImage = this.checkImage.bind(this);
    this.editDog = this.editDog.bind(this);
    this.addDog = this.addDog.bind(this);
    this.apiCallback = this.apiCallback.bind(this);
    this.setFile = this.setFile.bind(this);
    this.userGetCallback = this.userGetCallback.bind(this);

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
    if (routeId === "new") { // New dog
      this.setState({
        dog: {
          breed: "",
          sex: "",
          name: "",
          imageUrl: "https://thumbs.dreamstime.com/z/puppy-vector-illustration-isolated-white-background-dog-line-art-puppy-vector-illustration-cute-cartoon-dog-140539394.jpg",
          dateOfBirth: "",
          id: -1
        },
        alreadyClicked : false
      });
    } else { // Editing dog
      let client = GetApiClient();
      let api = new UsersApi(client);
      let userId = localStorage.getItem('loggedInUserId');
      api.usersUserIdGet(userId, this.userGetCallback);
    }
  }

  userGetCallback(error, data, response) {
    if (error) {
      console.error(error);
      return;
    }

    let allDogs = response.body.dogs;
    allDogs.forEach((dog) => {
      if (dog.id == this.props.match.params.dogId) {
        dog.imageUrl = `${getDomain()}/v1/users/${localStorage.getItem('loggedInUserId')}/dogs/${dog.id}/image`;
        this.setState({
          dog: dog,
          active: dog.sex
        });
      }
    });
  }

  setFile = (file) => {
    this.inputRef.current.click()
    this.setState({
      newImage: file[0]
    })
  }

  saveDog() {
    if (this.state.alreadyClicked === true){
      alert("You already clicked the save button.")
      return;
    }
    this.setState({alreadyClicked: true})
    if (!this.state.dog.sex || !this.state.dog.name || !this.state.dog.breed || !this.state.dog.dateOfBirth) {
      alert("Please enter all attributes of your dog. Name, breed, date of birth and sex");
      this.setState({alreadyClicked: false})
      return;
    }
    if (!this.checkDate()) {
      alert("Please enter a correct birth date (format JJJJ-MM-DD)");
      this.setState({alreadyClicked: false})
      return;
    }
    if (!this.checkImage()) {
      alert("Please select a valid picture (jpg, gif, tif, or png)");
      this.setState({alreadyClicked: false})
      return;
    }

    if (this.state.dog.name.length >= 255 ){
      alert("Please enter a shorter name")
      this.setState({alreadyClicked: false})
      return;
      }
    if (this.state.dog.breed.length >= 255 ){
      alert("Please enter a shorter breed name")
      this.setState({alreadyClicked: false})
      return;
    }

    if (this.state.dog.id === -1){
      this.addDog()
    }
    else{
      this.editDog()
    }
  }

  addDog(){
    const userId = localStorage.getItem('loggedInUserId');

    const client = GetApiClient()
    const api = new DogsApi(client)

    let dog = Object.assign({}, this.state.dog);
    delete dog.id;

    api.addDog(userId, new Blob([JSON.stringify(dog)], { type: 'application/json' }), {profilePicture: this.state.newImage}, this.apiCallback)
  }

  editDog(){
    const userId = localStorage.getItem('loggedInUserId');
    const client = GetApiClient()
    const api = new DogsApi(client)

    let dog = Object.assign({}, this.state.dog);
    
    let picture = this.state.newImage ? { profilePicture: this.state.newImage } : {};
    api.editDog(userId, dog.id, new Blob([JSON.stringify(dog)], { type: 'application/json'}), picture, this.apiCallback);
  }

  deleteDog() {
    const userId = localStorage.getItem('loggedInUserId');
    const client = GetApiClient();
    const api = new DogsApi(client);

    api.deleteDog(userId, this.state.dog.id, this.apiCallback);
  }

  apiCallback(error, data, response){
    if(error){
      console.error(error);
      return;
    }
    this.setState({alreadyClicked : false})
    this.props.history.push("/profile");
  }

  checkDate() {
    let date = moment(this.state.dog.dateOfBirth)
    return date.isValid()
  }

  checkImage() {
    let image = this.state.newImage;
    if (!image) return true;

    // Check image type image/png,image/jpeg,image/gif,image/tiff
    let allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/tiff'];
    return allowedTypes.indexOf(image.type) !== -1;
  }

  handleInputChange(event) {
    this.setState(prevState => {
      let dog = Object.assign({}, prevState.dog);
      dog[event.target.name] = event.target.value;
      return { dog };
    })
  }

  saveSex(sex) {
    this.setState(prevState => {
      let dog = Object.assign({}, prevState.dog);
      dog.sex = sex;
      return { dog };
    })
    this.setState({ active: sex })
  }

  render() {
    let container = "cursor-pointer hover:bg-gray-400 flex-grow inline-block p-3 mr-2 mb-2 bg-gray-300 text-xs rounded-md";
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
    if (!this.state.dog.sex || !this.state.dog.name || !this.state.dog.breed || !this.state.dog.dateOfBirth || this.state.alreadyClicked) {
      saveContainer += "h-12 font-bold text-xl align-middle pt-2.5 w-1/2 opacity-20 cursor-not-allowed"
    }
    else {
      saveContainer += "h-12 font-bold text-xl align-middle pt-2.5 w-1/2 hover:bg-gray-400 cursor-pointer hover:font-bold"
    }

    let imageUrl = this.state.dog.imageUrl;
    if (this.state.newImage){
      imageUrl = URL.createObjectURL(this.state.newImage);
    }

    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    let maxDate = year + '-' + month + '-' + day;

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
        <div className="overflow-auto p-4 flex-1 flex flex-cols">
          {/* attributes of dog: name, breed, date of birth and sex and del dog*/}
          <div className="flex-grow w-full ">
            <h2 className="font-bold">NAME</h2>
            <input
              placeholder="Enter the name of your dog here (e.g. Fifi)."
              name="name"
              maxLength={255}
              value={this.state.dog.name}
              onChange={this.handleInputChange}
              className="w-full placeholder-grey rounded border h-9 p-2 overflow-ellipsis"
            />
            <h2 className="font-bold text-black mt-5">BREED</h2>
            <input
              placeholder="Enter the breed of your dog here (e.g. Dalmatian)."
              name="breed"
              maxLength={255}
              value={this.state.dog.breed}
              onChange={this.handleInputChange}
              className="w-full placeholder-grey rounded border h-9 p-2"
            />
            <h2 className="font-bold text-black mt-5">DATE OF BIRTH</h2>
            <input
              placeholder="Enter the date of birth of your dog here (e.g. 2018-04-01)."
              name="dateOfBirth"
              type="date"
              max={maxDate}
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
            {(this.state.dog.id !== -1) ?
              <h2 className="font-bold text-black mt-5">REMOVE FROM PROFILE?</h2> : null}
            {(this.state.dog.id !== -1) ?
              <div className={container + ' cursor-pointer'}
                    onClick={(e) => {
                      if (window.confirm('Are you sure you want to remove this dog from your profile?')) this.deleteDog(e)
                    }}>
                <h3 className="font-bold leading-none">
                  Delete Dog
                  <span className="text-gray-700 ml-1"> x</span>
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
                      accept="image/png,image/jpeg,image/gif,image/tiff"
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
                onClick={() => this.props.history.push('/profile')}
              >Cancel</h1>
              <h1 className={saveContainer}
                onClick={() => this.saveDog()}
                disabled={this.state.alreadyClicked}
                >Save</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dog);