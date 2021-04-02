# DogsApp.UsersApi

All URIs are relative to *https://api.server.test/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersGet**](UsersApi.md#usersGet) | **GET** /users | Return all users
[**usersLoginPost**](UsersApi.md#usersLoginPost) | **POST** /users/login | User is logged in/registered
[**usersLogoutPut**](UsersApi.md#usersLogoutPut) | **PUT** /users/logout | Log out from account
[**usersUserIdDelete**](UsersApi.md#usersUserIdDelete) | **DELETE** /users/{userId} | Delete user with userId
[**usersUserIdGet**](UsersApi.md#usersUserIdGet) | **GET** /users/{userId} | Return user by userId
[**usersUserIdPut**](UsersApi.md#usersUserIdPut) | **PUT** /users/{userId} | Update an existing user



## usersGet

> [User] usersGet(opts)

Return all users

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.UsersApi();
let opts = {
  'areaFilter': new DogsApp.AreaFilter(), // AreaFilter | 
  'radiusFilter': new DogsApp.RadiusFilter() // RadiusFilter | 
};
apiInstance.usersGet(opts, (error, data, response) => {
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
 **areaFilter** | [**AreaFilter**](.md)|  | [optional] 
 **radiusFilter** | [**RadiusFilter**](.md)|  | [optional] 

### Return type

[**[User]**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersLoginPost

> usersLoginPost(user)

User is logged in/registered

A user can register/login.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.UsersApi();
let user = new DogsApp.User(); // User | User object that needs to be created
apiInstance.usersLoginPost(user, (error, data, response) => {
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
 **user** | [**User**](User.md)| User object that needs to be created | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## usersLogoutPut

> usersLogoutPut()

Log out from account

A user can log out from his/her account.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.UsersApi();
apiInstance.usersLogoutPut((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersUserIdDelete

> usersUserIdDelete(userId)

Delete user with userId

A user can delete his own profile.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.UsersApi();
let userId = 789; // Number | Numeric ID of the user to delete
apiInstance.usersUserIdDelete(userId, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user to delete | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersUserIdGet

> User usersUserIdGet(userId)

Return user by userId

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.UsersApi();
let userId = 789; // Number | Numeric ID of the user to get
apiInstance.usersUserIdGet(userId, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user to get | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersUserIdPut

> usersUserIdPut(userId, user)

Update an existing user

A user can update only his own profile.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.UsersApi();
let userId = 789; // Number | Numeric ID of the user to update
let user = new DogsApp.User(); // User | User object that needs to be updated
apiInstance.usersUserIdPut(userId, user, (error, data, response) => {
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
 **userId** | **Number**| Numeric ID of the user to update | 
 **user** | [**User**](User.md)| User object that needs to be updated | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

