# FriendlyFetch — Client Application

Software Praktikum FS 2021 — Group 2


## Project Overview

FriendlyFetch is a community app for dog owners. It allows them to find other dog owners nearby, share information about dog-friendly parks and walking routes on a map, and 

## Technologies

The client application is based on React. Additionally, the following technologies were used:

- [TailwindCSS](https://tailwindcss.com) to speed up styling
- Google was used as a login provider
- Google Maps was integrated using the [google-maps-react](https://github.com/fullstackreact/google-maps-react) component
- The wrapper code for the API client was generated using OpenAPI and imported as an NPM package


## High-Level Components

The applications is divided into four main areas: Login, Map, Profile, and Chat. After logging in, navigation between these areas happens through a navigation bar at the bottom of the screen, which is implemented in [TabBar.js](src/views/TabBar.js).

### Login

The login page is implemented in [Login.js](src/components/login/Login.js). It welcomes the user and lets them sign in using their google account.

### Map

After login, existing users are taken to the map. This is implemented in [Map.js](src/components/map/Map.js) and lets users find other users as well as add and find parks and walking routes.

### Profile

New users are taken to their own profile after logging in so they can start by completing it. This is implemented in [Profile.js](src/components/profile/Profile.js). On their profile, users can enter a short bio as well as add their dogs. Additionally, they can add tags indicating to other users what they can offer or are looking for (e.g. bulk-ordering food or going on walks together with other users, dogsitting, etc.).

### Chat

The chat area lets users exchange messages with other users of the application. Its main entry point is the inbox, which shows all existing chat conversations. The inbox is implemented in [Inbox.js](src/components/chat/Inbox.js).

### Routers

The app uses `react-router` to handle client-side routing. The main router is defined in [AppRouter.js](src/components/shared/routers/AppRouter.js), delegating routing for the separate areas of the app to sub-routers.


## Launch & Deployment

### Local Setup

#### `npm install`

This has to be done before starting the application for the first time (only once).

#### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

#### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into an 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423


#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.


### Deployment

The project is pre-configured to be deployed to [Heroku](https://heroku.com). GitHub actions are set up such that a deployment automatically happens when new code is pushed / merged in to the `master` branch.


## Main User Flows

### Loggin In

TODO Screenshots

The user logs in to the app using their google account. After the first time, they are taken to their profile to complete it. On subsequent logins, they are taken to the map.

### Adding Dogs And Tags to Profile

TODO Screenshots

From their own profile, users can add dogs as well as "looking for"- and "offering"-tags to their profile to share this information with other users of the app.

### Starting a Chat Conversation

TODO Screenshots

Users can start a chat conversation with others either from their profile or from a list of all users within the chat interface.

### Adding a Park or walking Route to The Map

TODO Screenshots

From the map, users have the possibility of adding parks and walking routes for others to see. After entering the drawing mode, they can place the park or place multiple points to form a route. Upon saving, they have the option of adding a description which others will be able to see by clicking on the park/walking route on the map.


## Roadmap

TODO

## Authors and Acknowledgement

FriendlyFetch was developed during the course "Software Praktikum" in the spring semester 2021 at Unviersity of Zurich by Ksenia Beloturkina, Céline Salzmann, Benjamin Schneider (Team Lead) and Neha Singh.

We'd also like to think our TA Alain Küng and the other groups who have provided feedback during milestone presentations and the beta testing phase.


## License

TODO
