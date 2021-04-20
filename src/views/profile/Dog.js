import React from 'react';

class Dog extends React.Component {
  render() {
      let sexIcon = this.props.sex === "MALE" ? "♂︎" : "♁";
      return(
          <div className="flex mb-4">
              {this.props.editable ?
                      <div className="bg-cover bg-no-repeat bg-center h-16 w-16 rounded-full" style={{
                          backgroundImage: `url(${this.props.imageUrl})`,
                      }}>
                          <div className="group-hover:opacity-100">
                              <div className="hover:bg-gray-300 cursor-pointer h-16 w-16 rounded-full flex flex-col opacity-80">
                                  <div className="m-auto">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M17.7376 1.7376C18.0328 1.43197 18.3859 1.18819 18.7763 1.02048C19.1667 0.85277 19.5866 0.764494 20.0115 0.760802C20.4364 0.75711 20.8578 0.838075 21.2511 0.998974C21.6443 1.15987 22.0016 1.39748 22.3021 1.69794C22.6025 1.9984 22.8401 2.35568 23.001 2.74895C23.1619 3.14222 23.2429 3.56359 23.2392 3.98849C23.2355 4.41338 23.1472 4.83329 22.9795 5.2237C22.8118 5.61411 22.568 5.96721 22.2624 6.2624L20.9936 7.5312L16.4688 3.0064L17.7376 1.7376ZM14.2064 5.2688L0.8 18.6752V23.2H5.3248L18.7328 9.7936L14.2048 5.2688H14.2064Z" fill="black"/>
                                      </svg>
                                  </div>
                              </div>
                          </div>
                      </div>
                      : <div className="flex-none mr-2">
                          <img src={this.props.imageUrl} className="h-16 w-16 rounded-full bg-gray-400"></img>
                      </div> }
              <div className="flex-grow ml-3">
                  <h3 className="font-bold leading-none">{this.props.name} <span>{sexIcon}</span></h3>
                  <span className="text-sm leading-none">{this.props.breed}</span><br/>
                  <span className="text-sm leading-none">{this.props.age}</span>
              </div>
          </div>
      )
  }
}

export default Dog;