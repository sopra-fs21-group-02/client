# DogsApp.ParksApi

All URIs are relative to *https://api.server.test/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**parksGet**](ParksApi.md#parksGet) | **GET** /parks | Return all parks
[**parksParkIdDelete**](ParksApi.md#parksParkIdDelete) | **DELETE** /parks/{parkId} | Delete park with parkId
[**parksParkIdReviewsGet**](ParksApi.md#parksParkIdReviewsGet) | **GET** /parks/{parkId}/reviews | Return all review of park by parkId
[**parksParkIdReviewsPost**](ParksApi.md#parksParkIdReviewsPost) | **POST** /parks/{parkId}/reviews | Add review to park with parkId
[**parksPost**](ParksApi.md#parksPost) | **POST** /parks | Create park



## parksGet

> [Park] parksGet(filter)

Return all parks

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.ParksApi();
let filter = new DogsApp.AreaFilter(); // AreaFilter | Filter to specify the visual area on the map
apiInstance.parksGet(filter, (error, data, response) => {
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


## parksParkIdDelete

> parksParkIdDelete(parkId)

Delete park with parkId

A user can delete a park created by him.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.ParksApi();
let parkId = 789; // Number | Numeric ID of the park
apiInstance.parksParkIdDelete(parkId, (error, data, response) => {
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
 **parkId** | **Number**| Numeric ID of the park | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## parksParkIdReviewsGet

> [Review] parksParkIdReviewsGet(parkId)

Return all review of park by parkId

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.ParksApi();
let parkId = 789; // Number | Numeric ID of the park
apiInstance.parksParkIdReviewsGet(parkId, (error, data, response) => {
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
 **parkId** | **Number**| Numeric ID of the park | 

### Return type

[**[Review]**](Review.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## parksParkIdReviewsPost

> parksParkIdReviewsPost(parkId, review)

Add review to park with parkId

A user can add review to the park.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.ParksApi();
let parkId = 789; // Number | Numeric ID of the park
let review = new DogsApp.Review(); // Review | Review object that needs to be created
apiInstance.parksParkIdReviewsPost(parkId, review, (error, data, response) => {
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
 **parkId** | **Number**| Numeric ID of the park | 
 **review** | [**Review**](Review.md)| Review object that needs to be created | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## parksPost

> parksPost(park)

Create park

A park object that should be created

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.ParksApi();
let park = new DogsApp.Park(); // Park | 
apiInstance.parksPost(park, (error, data, response) => {
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
 **park** | [**Park**](Park.md)|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

