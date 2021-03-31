# SoPra FS21 - Group 02 - Client

## Getting started with React

Read and go through those Tutorials, It will make your life easier!

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](http://localhost:3000) and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Once you have done all of this, in the template there are two main external dependencies that you should look at:

- [styled-components](https://www.styled-components.com/docs)
  It removes the mapping between components and styles (i.e. external css files). This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) Declarative routing for React being a collection of navigational components that compose declaratively with your application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) Let's you access the state of the router and perform navigation from inside your components.



## Prerequisites and Installation

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into an 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).


>Thanks to Lucas Pelloni for the template


## Documentation for API Endpoints

All URIs are relative to *https://api.server.test/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DogsApp.ConversationsApi* | [**messagePost**](docs/ConversationsApi.md#messagePost) | **POST** /message | Add message to conversation
*DogsApp.ConversationsApi* | [**usersUserId1ConversationsUserId2Get**](docs/ConversationsApi.md#usersUserId1ConversationsUserId2Get) | **GET** /users/{userId1}/conversations/{userId2} | Return all messages between user1 and user2
*DogsApp.ConversationsApi* | [**usersUserIdConversationsGet**](docs/ConversationsApi.md#usersUserIdConversationsGet) | **GET** /users/{userId}/conversations | Return all conversations of user by userId
*DogsApp.DogsApi* | [**usersUserIdDogsDogIdDelete**](docs/DogsApi.md#usersUserIdDogsDogIdDelete) | **DELETE** /users/{userId}/dogs/{dogId} | Delete dog with dogId
*DogsApp.DogsApi* | [**usersUserIdDogsDogIdGet**](docs/DogsApi.md#usersUserIdDogsDogIdGet) | **GET** /users/{userId}/dogs/{dogId} | Return dog of user by dogId
*DogsApp.DogsApi* | [**usersUserIdDogsDogIdPut**](docs/DogsApi.md#usersUserIdDogsDogIdPut) | **PUT** /users/{userId}/dogs/{dogId} | Update an existing dog
*DogsApp.DogsApi* | [**usersUserIdDogsGet**](docs/DogsApi.md#usersUserIdDogsGet) | **GET** /users/{userId}/dogs | Return all dogs of user with userId
*DogsApp.DogsApi* | [**usersUserIdDogsPost**](docs/DogsApi.md#usersUserIdDogsPost) | **POST** /users/{userId}/dogs | Add dog to user profile
*DogsApp.ParksApi* | [**parksGet**](docs/ParksApi.md#parksGet) | **GET** /parks | Return all parks
*DogsApp.ParksApi* | [**parksParkIdDelete**](docs/ParksApi.md#parksParkIdDelete) | **DELETE** /parks/{parkId} | Delete park with parkId
*DogsApp.ParksApi* | [**parksParkIdReviewsGet**](docs/ParksApi.md#parksParkIdReviewsGet) | **GET** /parks/{parkId}/reviews | Return all review of park by parkId
*DogsApp.ParksApi* | [**parksParkIdReviewsPost**](docs/ParksApi.md#parksParkIdReviewsPost) | **POST** /parks/{parkId}/reviews | Add review to park with parkId
*DogsApp.ParksApi* | [**parksPost**](docs/ParksApi.md#parksPost) | **POST** /parks | Create park
*DogsApp.PathsApi* | [**pathPathIdReviewsGet**](docs/PathsApi.md#pathPathIdReviewsGet) | **GET** /path/{pathId}/reviews | Return all review of walking path by pathId
*DogsApp.PathsApi* | [**pathPathIdReviewsPost**](docs/PathsApi.md#pathPathIdReviewsPost) | **POST** /path/{pathId}/reviews | Add review to path with pathId
*DogsApp.PathsApi* | [**pathsGet**](docs/PathsApi.md#pathsGet) | **GET** /paths | Return all paths
*DogsApp.PathsApi* | [**pathsPathIdDelete**](docs/PathsApi.md#pathsPathIdDelete) | **DELETE** /paths/{pathId} | Delete path with pathId
*DogsApp.PathsApi* | [**pathsPost**](docs/PathsApi.md#pathsPost) | **POST** /paths | Create path
*DogsApp.UsersApi* | [**usersGet**](docs/UsersApi.md#usersGet) | **GET** /users | Return all users
*DogsApp.UsersApi* | [**usersLogoutPut**](docs/UsersApi.md#usersLogoutPut) | **PUT** /users/logout | Log out from account
*DogsApp.UsersApi* | [**usersUserIdDelete**](docs/UsersApi.md#usersUserIdDelete) | **DELETE** /users/{userId} | Delete user with userId
*DogsApp.UsersApi* | [**usersUserIdGet**](docs/UsersApi.md#usersUserIdGet) | **GET** /users/{userId} | Return user by userId
*DogsApp.UsersApi* | [**usersUserIdPut**](docs/UsersApi.md#usersUserIdPut) | **PUT** /users/{userId} | Update an existing user


## Documentation for Models

 - [DogsApp.AreaFilter](docs/AreaFilter.md)
 - [DogsApp.ChatMessage](docs/ChatMessage.md)
 - [DogsApp.Conversation](docs/Conversation.md)
 - [DogsApp.Coordinate](docs/Coordinate.md)
 - [DogsApp.Dog](docs/Dog.md)
 - [DogsApp.ErrorResponse](docs/ErrorResponse.md)
 - [DogsApp.Gender](docs/Gender.md)
 - [DogsApp.OnlineStatus](docs/OnlineStatus.md)
 - [DogsApp.Park](docs/Park.md)
 - [DogsApp.RadiusFilter](docs/RadiusFilter.md)
 - [DogsApp.Review](docs/Review.md)
 - [DogsApp.Tag](docs/Tag.md)
 - [DogsApp.User](docs/User.md)
 - [DogsApp.WalkingRoute](docs/WalkingRoute.md)


## Documentation for Authorization

All endpoints do not require authorization.
