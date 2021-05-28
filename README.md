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

TODO

## Launch & Deployment

TODO

## User Flows

TODO

## Roadmap

TODO

## Authors and Acknowledgement

FriendlyFetch was developed during the course "Software Praktikum" in the spring semester 2021 at Unviersity of Zurich by Ksenia Beloturkina, Céline Salzmann, Benjamin Schneider (Team Lead) and Neha Singh.

We'd also like to think our TA Alain Küng and the other groups who have provided feedback during milestone presentations and the beta testing phase.


## License

TODO



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
