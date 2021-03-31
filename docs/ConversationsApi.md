# DogsApp.ConversationsApi

All URIs are relative to *https://api.server.test/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**messagePost**](ConversationsApi.md#messagePost) | **POST** /message | Add message to conversation
[**usersUserId1ConversationsUserId2Get**](ConversationsApi.md#usersUserId1ConversationsUserId2Get) | **GET** /users/{userId1}/conversations/{userId2} | Return all messages between user1 and user2
[**usersUserIdConversationsGet**](ConversationsApi.md#usersUserIdConversationsGet) | **GET** /users/{userId}/conversations | Return all conversations of user by userId



## messagePost

> messagePost(chatMessage)

Add message to conversation

User can add message in a chart.

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.ConversationsApi();
let chatMessage = new DogsApp.ChatMessage(); // ChatMessage | A message that needs to be created
apiInstance.messagePost(chatMessage, (error, data, response) => {
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
 **chatMessage** | [**ChatMessage**](ChatMessage.md)| A message that needs to be created | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## usersUserId1ConversationsUserId2Get

> [ChatMessage] usersUserId1ConversationsUserId2Get(userId1, userId2)

Return all messages between user1 and user2

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.ConversationsApi();
let userId1 = 789; // Number | Numeric ID of the user1
let userId2 = 789; // Number | Numeric ID of the user2
apiInstance.usersUserId1ConversationsUserId2Get(userId1, userId2, (error, data, response) => {
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
 **userId1** | **Number**| Numeric ID of the user1 | 
 **userId2** | **Number**| Numeric ID of the user2 | 

### Return type

[**[ChatMessage]**](ChatMessage.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersUserIdConversationsGet

> [Conversation] usersUserIdConversationsGet(userId)

Return all conversations of user by userId

### Example

```javascript
import DogsApp from 'dogs_app';

let apiInstance = new DogsApp.ConversationsApi();
let userId = 789; // Number | Numeric ID of the user
apiInstance.usersUserIdConversationsGet(userId, (error, data, response) => {
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

[**[Conversation]**](Conversation.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

