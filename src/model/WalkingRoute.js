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

import ApiClient from '../ApiClient';
import Coordinate from './Coordinate';
import Review from './Review';
import User from './User';

/**
 * The WalkingRoute model module.
 * @module model/WalkingRoute
 * @version 1.0
 */
class WalkingRoute {
    /**
     * Constructs a new <code>WalkingRoute</code>.
     * @alias module:model/WalkingRoute
     * @param listOfCoordinates {Array.<module:model/Coordinate>} 
     */
    constructor(listOfCoordinates) { 
        
        WalkingRoute.initialize(this, listOfCoordinates);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, listOfCoordinates) { 
        obj['listOfCoordinates'] = listOfCoordinates;
    }

    /**
     * Constructs a <code>WalkingRoute</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/WalkingRoute} obj Optional instance to populate.
     * @return {module:model/WalkingRoute} The populated <code>WalkingRoute</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new WalkingRoute();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('creator')) {
                obj['creator'] = User.constructFromObject(data['creator']);
            }
            if (data.hasOwnProperty('listOfCoordinates')) {
                obj['listOfCoordinates'] = ApiClient.convertToType(data['listOfCoordinates'], [Coordinate]);
            }
            if (data.hasOwnProperty('distance')) {
                obj['distance'] = ApiClient.convertToType(data['distance'], 'Number');
            }
            if (data.hasOwnProperty('reviews')) {
                obj['reviews'] = ApiClient.convertToType(data['reviews'], [Review]);
            }
        }
        return obj;
    }


}

/**
 * @member {Number} id
 */
WalkingRoute.prototype['id'] = undefined;

/**
 * @member {module:model/User} creator
 */
WalkingRoute.prototype['creator'] = undefined;

/**
 * @member {Array.<module:model/Coordinate>} listOfCoordinates
 */
WalkingRoute.prototype['listOfCoordinates'] = undefined;

/**
 * @member {Number} distance
 */
WalkingRoute.prototype['distance'] = undefined;

/**
 * @member {Array.<module:model/Review>} reviews
 */
WalkingRoute.prototype['reviews'] = undefined;






export default WalkingRoute;

