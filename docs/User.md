# DogsApp.User

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** |  | [optional] [readonly] 
**email** | **String** |  | [optional] [readonly] 
**name** | **String** |  | [optional] [readonly] 
**gender** | [**Gender**](Gender.md) |  | [optional] 
**dateOfBirth** | **Date** |  | [optional] 
**bio** | **String** |  | [optional] 
**status** | [**OnlineStatus**](OnlineStatus.md) |  | [optional] 
**profilePicture** | **String** |  | [optional] [readonly] 
**latestLocation** | [**Coordinate**](Coordinate.md) |  | [optional] 
**lookingFor** | **String** |  | [optional] 
**offering** | [**[Tag]**](Tag.md) |  | [optional] 
**conversations** | [**[Conversation]**](Conversation.md) |  | [optional] [readonly] 
**dogs** | [**[Dog]**](Dog.md) |  | [optional] [readonly] 



## Enum: LookingForEnum


* `PETSITTING` (value: `"PETSITTING"`)

* `MEETINGFORWALKS` (value: `"MEETINGFORWALKS"`)

* `BREEDING` (value: `"BREEDING"`)




