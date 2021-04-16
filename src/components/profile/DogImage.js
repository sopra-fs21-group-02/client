import React from "react";
import { withRouter } from 'react-router';


class DogImage extends React.Component {

    redirectToNewDog(){
        this.props.history.push("/profile/dog/new");
    }

    saveImage(){
        //TODO save image to NewDog
        this.redirectToNewDog();
    }
    render() {
        return(
        <div>
            <div className="p-4 h-screen">
                <div className="absolute inset-x-0 top-0">
                    <div className=" h-12 bg-gray-300 text-center">
                        <h1 className="font-bold text-xl align-middle pt-2.5">New Dog</h1>
                    </div>
                </div>
                <div className="mt-10 font-bold">
                     <h1> Adding picture comes here</h1>
                </div>
            </div>
            <div className="p-4 h-screen">
                <div className="absolute inset-x-0 bottom-0">
                    <div className=" h-12 bg-gray-300 text-center">
                        <div className="flex">
                            <h1 className="hover:bg-gray-400 cursor-pointer hover:font-bold h-12 text-xl align-middle pt-2.5 w-1/2"
                                onClick={() => this.redirectToNewDog()}
                            >Cancel</h1>
                            <h1 className="hover:bg-gray-400 cursor-pointer hover:font-bold h-12 font-bold text-xl align-middle pt-2.5 w-1/2"
                                onClick={() => this.saveImage()}>Save</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default withRouter(DogImage);