# DogsApp.DogsApi

All URIs are relative to *https://api.server.test/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersUserIdDogsDogIdDelete**](DogsApi.md#usersUserIdDogsDogIdDelete) | **DELETE** /users/{userId}/dogs/{dogId} | Delete dog with dogId
[**usersUserIdDogsDogIdGet**](DogsApi.md#usersUserIdDogsDogIdGet) | **GET** /users/{userId}/dogs/{dogId} | Return dog of user by dogId
[**usersUserIdDogsDogIdImageGet**](DogsApi.md#usersUserIdDogsDogIdImageGet) | **GET** /users/{userId}/dogs/{dogId}/image | 
[**usersUserIdDogsDogIdImagePost**](DogsApi.md#usersUserIdDogsDogIdImagePost) | **POST** /users/{userId}/dogs/{dogId}/image | 
[**usersUserIdDogsDogIdPut**](DogsApi.md#usersUserIdDogsDogIdPut) | **PUT** /users/{userId}/dogs/{dogId} | Update an existing dog
[**usersUserIdDogsGet**](DogsApi.md#usersUserIdDogsGet) | **GET** /users/{userId}/dogs | Return all dogs of user with userId
[**usersUserIdDogsPost**](DogsApi.md#usersUserIdDogsPost) | **POST** /users/{userId}/dogs | Add dog to user profile



## usersUserIdDogsDogIdDelete

> usersUserIdDogsDogIdDelete(userId, dogId)

Delete dog with dogId

A user can delete his own dog.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.DogsApi();
let userId = 789; // Number | Numeric ID of the user
let dogId = 789; // Number | Numeric ID of the dog to delete
apiInstance.usersUserIdDogsDogIdDelete(userId, dogId, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user | 
 **dogId** | **Number**| Numeric ID of the dog to delete | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersUserIdDogsDogIdGet

> Dog usersUserIdDogsDogIdGet(userId, dogId)

Return dog of user by dogId

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.DogsApi();
let userId = 789; // Number | Numeric ID of the user
let dogId = 789; // Number | Numeric ID of the dog
apiInstance.usersUserIdDogsDogIdGet(userId, dogId, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user | 
 **dogId** | **Number**| Numeric ID of the dog | 

### Return type

[**Dog**](Dog.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersUserIdDogsDogIdImageGet

> File usersUserIdDogsDogIdImageGet(userId, dogId)



Get dog&#39;s profile image

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.DogsApi();
let userId = 789; // Number | Numeric ID of the user
let dogId = 789; // Number | Numeric ID of the dog
apiInstance.usersUserIdDogsDogIdImageGet(userId, dogId, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user | 
 **dogId** | **Number**| Numeric ID of the dog | 

### Return type

**File**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: image/gif, image/jpeg, image/png, image/tiff, application/json


## usersUserIdDogsDogIdImagePost

> usersUserIdDogsDogIdImagePost(userId, dogId, body)



Upload dog&#39;s profile image

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.DogsApi();
let userId = 789; // Number | Numeric ID of the user
let dogId = 789; // Number | Numeric ID of the dog
let body = "/path/to/file"; // File | 
apiInstance.usersUserIdDogsDogIdImagePost(userId, dogId, body, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user | 
 **dogId** | **Number**| Numeric ID of the dog | 
 **body** | **File**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: image/gif, image/jpeg, image/png, image/tiff
- **Accept**: application/json


## usersUserIdDogsDogIdPut

> usersUserIdDogsDogIdPut(userId, dogId, dog)

Update an existing dog

A user can edit dog belonging to his profile.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.DogsApi();
let userId = 789; // Number | Numeric ID of the user
let dogId = 789; // Number | Numeric ID of the dog to update
let dog = new DogsApp.Dog(); // Dog | Dog object that needs to be updated
apiInstance.usersUserIdDogsDogIdPut(userId, dogId, dog, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user | 
 **dogId** | **Number**| Numeric ID of the dog to update | 
 **dog** | [**Dog**](Dog.md)| Dog object that needs to be updated | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## usersUserIdDogsGet

> [Dog] usersUserIdDogsGet(userId)

Return all dogs of user with userId

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.DogsApi();
let userId = 789; // Number | Numeric ID of the user
apiInstance.usersUserIdDogsGet(userId, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user | 

### Return type

[**[Dog]**](Dog.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersUserIdDogsPost

> usersUserIdDogsPost(userId, dog)

Add dog to user profile

A user can add dog to his own profile.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.DogsApi();
let userId = 789; // Number | Numeric ID of the user
let dog = new DogsApp.Dog(); // Dog | Dog object that needs to be created
apiInstance.usersUserIdDogsPost(userId, dog, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user | 
 **dog** | [**Dog**](Dog.md)| Dog object that needs to be created | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

