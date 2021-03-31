# DogsApp.PathsApi

All URIs are relative to *https://api.server.test/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**pathPathIdReviewsGet**](PathsApi.md#pathPathIdReviewsGet) | **GET** /path/{pathId}/reviews | Return all review of walking path by pathId
[**pathPathIdReviewsPost**](PathsApi.md#pathPathIdReviewsPost) | **POST** /path/{pathId}/reviews | Add review to path with pathId
[**pathsGet**](PathsApi.md#pathsGet) | **GET** /paths | Return all paths
[**pathsPathIdDelete**](PathsApi.md#pathsPathIdDelete) | **DELETE** /paths/{pathId} | Delete path with pathId
[**pathsPost**](PathsApi.md#pathsPost) | **POST** /paths | Create path



## pathPathIdReviewsGet

> [Review] pathPathIdReviewsGet(pathId)

Return all review of walking path by pathId

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.PathsApi();
let pathId = 789; // Number | Numeric ID of the path
apiInstance.pathPathIdReviewsGet(pathId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pathId** | **Number**| Numeric ID of the path | 

### Return type

[**[Review]**](Review.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## pathPathIdReviewsPost

> pathPathIdReviewsPost(pathId, review)

Add review to path with pathId

A user can add review to the walking path.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.PathsApi();
let pathId = 789; // Number | Numeric ID of the path
let review = new DogsApp.Review(); // Review | Review object that needs to be created
apiInstance.pathPathIdReviewsPost(pathId, review, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pathId** | **Number**| Numeric ID of the path | 
 **review** | [**Review**](Review.md)| Review object that needs to be created | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## pathsGet

> [Park] pathsGet(filter)

Return all paths

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.PathsApi();
let filter = new DogsApp.AreaFilter(); // AreaFilter | Filter to specify the visual area on the map
apiInstance.pathsGet(filter, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filter** | [**AreaFilter**](.md)| Filter to specify the visual area on the map | 

### Return type

[**[Park]**](Park.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## pathsPathIdDelete

> pathsPathIdDelete(pathId)

Delete path with pathId

A user can delete a path created by him.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.PathsApi();
let pathId = 789; // Number | Numeric ID of the path
apiInstance.pathsPathIdDelete(pathId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pathId** | **Number**| Numeric ID of the path | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## pathsPost

> pathsPost(walkingRoute)

Create path

A path object that should be created

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.PathsApi();
let walkingRoute = new DogsApp.WalkingRoute(); // WalkingRoute | 
apiInstance.pathsPost(walkingRoute, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **walkingRoute** | [**WalkingRoute**](WalkingRoute.md)|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

