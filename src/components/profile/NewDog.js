import React from 'react';
import { withRouter } from 'react-router';
import styled from "styled-components";

const InputField = styled.input`
  &::placeholder {
    color: gray;
    height: 35px;
  }
  height: 35px;
  padding-left: 8px;
  margin-right: 0px;
  margin-left: 3px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: black;
`;

class NewDog extends React.Component {
    constructor() {
        super();
        this.state = {
            active : false,
            breed : "",
            sex : "",
            name : "",
            imageUrl : "https://www.pdsa.org.uk/media/7888/dalmatian-gallery-outdoors-8-min.jpg",
            dateOfBirth : ""
        }
    }

    componentDidMount() {
        let routeId = this.props.match.params.id;
        if (routeId === undefined) { // New dog
            this.setState({
                dog: {
                    name: "",
                    image: ""
                }
            });
        } else { // Editing dog
            let dog = {} 
            // ...Fetch dog from array/API
            this.setState({
                dog: dog
            });
        }
    }

    render() {
        let container = "cursor-pointer hover:bg-gray-400 flex-grow inline-block p-3 mr-2 bg-gray-300 text-xs rounded-md";
        let containerMale=container;
        if(this.state.active === "male") {
            containerMale += " bg-gray-400";
        } else {
            containerMale += " bg-gray-300";
        }
        let containerFemale=container;
        if(this.state.active === "female") {
            containerFemale += " bg-gray-400";
        } else {
            containerFemale += " bg-gray-300";
        }

        let saveContainer = "";
        if (!this.state.sex || !this.state.name || !this.state.breed || !this.state.dateOfBirth) {
            saveContainer += "h-12 font-bold text-xl align-middle pt-2.5 w-1/2 opacity-20 cursor-not-allowed"
        }
        else {
            saveContainer += "h-12 font-bold text-xl align-middle pt-2.5 w-1/2 hover:bg-gray-400 cursor-pointer hover:font-bold"
        }

        return (
            <div className="h-screen">
                <div className="">
                    <div className=" h-12 bg-gray-300 text-center">
                        <h1 className="font-bold text-xl align-middle pt-2.5">New Dog</h1>
                    </div>
                </div>

                <div className="pt-2 pr-2 flex flex-cols">
                    <div className="flex-grow ml-5 mt-2 pr-10">
                        <h2 className="font-bold text-black">NAME</h2>
                        <InputField
                            placeholder="Fifi"
                            onChange={e => {
                                this.handleInputChange('name', e.target.value);
                            }}
                            className="w-full"
                        />
                        <h2 className="font-bold text-black">BREED</h2>

                        <InputField
                            placeholder="Dalmatian"
                            onChange={e => {
                                this.handleInputChange('breed', e.target.value);
                            }}
                            className="w-full"
                        />
                        <h2 className="font-bold text-black">DATE OF BIRTH</h2>
                        <InputField
                            placeholder="1.1.2021"
                            onChange={e => {
                                this.handleInputChange('dateOfBirth', e.target.value);
                            }}
                            className="w-full"
                        />

                        {/* select the sex*/}
                        <h2 className="font-bold text-black">SEX</h2>
                        <div className={containerFemale}
                                onClick={() => this.saveSex("female")}>
                            <h3 className="font-bold leading-none">Female</h3>
                        </div>
                        <div className={containerMale}
                                onClick={() => this.saveSex("male")}>
                            <h3 className="font-bold leading-none">Male</h3>
                        </div>
                    </div>

                    {/* adding image here*/}
                    <div className="flex mr-2 mt-2">
                    <div className="bg-cover bg-no-repeat bg-center h-20 w-20 rounded-full" style={{
                        backgroundImage: `url(${this.state.imageUrl})`,
                    }}>
                        <div className="group-hover:opacity-100">
                            <div className="hover:bg-gray-300 cursor-pointer h-20 w-20 rounded-full flex flex-col opacity-80"
                                    onClick={() => this.redirectToAddImage()}>
                                <div className="m-auto">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.7376 1.7376C18.0328 1.43197 18.3859 1.18819 18.7763 1.02048C19.1667 0.85277 19.5866 0.764494 20.0115 0.760802C20.4364 0.75711 20.8578 0.838075 21.2511 0.998974C21.6443 1.15987 22.0016 1.39748 22.3021 1.69794C22.6025 1.9984 22.8401 2.35568 23.001 2.74895C23.1619 3.14222 23.2429 3.56359 23.2392 3.98849C23.2355 4.41338 23.1472 4.83329 22.9795 5.2237C22.8118 5.61411 22.568 5.96721 22.2624 6.2624L20.9936 7.5312L16.4688 3.0064L17.7376 1.7376ZM14.2064 5.2688L0.8 18.6752V23.2H5.3248L18.7328 9.7936L14.2048 5.2688H14.2064Z" fill="black"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className="absolute inset-x-0 bottom-0">
                    <div className=" h-12 bg-gray-300 text-center">
                        <div className="flex">
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

    //TODO adapt method once API is integrated
    redirectToProfile(){
        this.props.history.push("/profile");
    }

    //TODO adapt method once API is integrated
    saveDog(){
        if (!this.state.sex || !this.state.name || !this.state.breed || !this.state.dateOfBirth){
            alert("please enter all attributes of your dog. Name, breed, date of birth and sex")
        }
        else {this.redirectToProfile()}
    }

    redirectToAddImage() {
        let url = "/profile/dog/new/image";
        this.props.history.push(url);
    };

    //TODO adapt method once API is integrated
    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    //TODO adapt method once API is integrated
    saveSex(sex) {
        this.setState({sex : sex})
        this.setState({active : sex})
    }
}

export default withRouter(NewDog);