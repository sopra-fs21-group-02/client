/**
 * Dogs app
 * This is the API definition of the dogs owners app.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import ApiClient from './ApiClient';
import AreaFilter from './model/AreaFilter';
import ChatMessage from './model/ChatMessage';
import Conversation from './model/Conversation';
import Coordinate from './model/Coordinate';
import Dog from './model/Dog';
import ErrorResponse from './model/ErrorResponse';
import Gender from './model/Gender';
import OnlineStatus from './model/OnlineStatus';
import Park from './model/Park';
import RadiusFilter from './model/RadiusFilter';
import Review from './model/Review';
import Tag from './model/Tag';
import User from './model/User';
import WalkingRoute from './model/WalkingRoute';
import ConversationsApi from './api/ConversationsApi';
import DogsApi from './api/DogsApi';
import ParksApi from './api/ParksApi';
import PathsApi from './api/PathsApi';
import UsersApi from './api/UsersApi';


/**
* This_is_the_API_definition_of_the_dogs_owners_app_.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var DogsApp = require('index'); // See note below*.
* var xxxSvc = new DogsApp.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new DogsApp.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new DogsApp.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new DogsApp.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The AreaFilter model constructor.
     * @property {module:model/AreaFilter}
     */
    AreaFilter,

    /**
     * The ChatMessage model constructor.
     * @property {module:model/ChatMessage}
     */
    ChatMessage,

    /**
     * The Conversation model constructor.
     * @property {module:model/Conversation}
     */
    Conversation,

    /**
     * The Coordinate model constructor.
     * @property {module:model/Coordinate}
     */
    Coordinate,

    /**
     * The Dog model constructor.
     * @property {module:model/Dog}
     */
    Dog,

    /**
     * The ErrorResponse model constructor.
     * @property {module:model/ErrorResponse}
     */
    ErrorResponse,

    /**
     * The Gender model constructor.
     * @property {module:model/Gender}
     */
    Gender,

    /**
     * The OnlineStatus model constructor.
     * @property {module:model/OnlineStatus}
     */
    OnlineStatus,

    /**
     * The Park model constructor.
     * @property {module:model/Park}
     */
    Park,

    /**
     * The RadiusFilter model constructor.
     * @property {module:model/RadiusFilter}
     */
    RadiusFilter,

    /**
     * The Review model constructor.
     * @property {module:model/Review}
     */
    Review,

    /**
     * The Tag model constructor.
     * @property {module:model/Tag}
     */
    Tag,

    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User,

    /**
     * The WalkingRoute model constructor.
     * @property {module:model/WalkingRoute}
     */
    WalkingRoute,

    /**
    * The ConversationsApi service constructor.
    * @property {module:api/ConversationsApi}
    */
    ConversationsApi,

    /**
    * The DogsApi service constructor.
    * @property {module:api/DogsApi}
    */
    DogsApi,

    /**
    * The ParksApi service constructor.
    * @property {module:api/ParksApi}
    */
    ParksApi,

    /**
    * The PathsApi service constructor.
    * @property {module:api/PathsApi}
    */
    PathsApi,

    /**
    * The UsersApi service constructor.
    * @property {module:api/UsersApi}
    */
    UsersApi
};

/**
 * This is the entry point of your React application where the root element is in the public/index.html.
 * We call this a “root” DOM node because everything inside it will be managed by React DOM.
 * Applications built with just React usually have a single root DOM node.
 * More: https://reactjs.org/docs/rendering-elements.html
 */
ReactDOM.render(<App />, document.getElementById("root"));
