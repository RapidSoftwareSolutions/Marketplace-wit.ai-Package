# Wit.ai Package
Wit.ai makes it easy for developers to build applications and devices that you can talk or text to.
* Domain: wit.ai
* Credentials: accessToken

## How to get credentials: 
0. Login to your [Wit.Ai console](https://wit.ai) 
1. Choice app or create new.
2. Go to app settings https://wit.ai/YOUR_ACCOUNT/YOUR_APP_NAME/settings
3. Copy and save your _Server Access Token_.


## WitAi.getSentenceMeaning
Returns the extracted meaning from a sentence, based on the app data. Note that you may use JSONP to do cross-domain/cross-origin requests.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| text       | String     | Required: User’s query. Length must be > 0 and < 256
| textId     | String     | Optional: A specific Id you want to assign to the message that will be processed. If not set, Wit.ai will auto generate one for you
| threadId   | String     | Optional: A specific Id that will let you group requests per conversation

#### Request example
```json
{	
	"accessToken": "...",
	"text": "how many people between Tuesday and Friday",
}
```


## WitAi.getAudioMeaning
Returns the meaning extracted from an audio file or stream. We do recommend you to stream the audio input as it will reduce the latency, hence improve the user experience.


| Field         | Type       | Description
|---------------|------------|----------
| accessToken   | credentials| Required: The api key obtained from WitAi.
| data          | String     | Required: Link to `wav` or `mpeg3` or `ulaw` or `raw` audio file.
| textId        | String     | Optional: A specific Id you want to assign to the message that will be processed. If not set, Wit.ai will auto generate one for you
| threadId      | String     | Optional: A specific Id that will let you group requests per conversation
| outcomesNumber| String     | Optional: The number of n-best outcomes you want to get back. default is 1

#### Request example
```json
{	
	"accessToken": "...",
	"data": "http://www.wavsource.com/snds_2016-11-20_5768273412148964/people/politics/baker_arduous.wav",
}
```

## WitAi.getBotNextStep
Returns what your bot should do next. The next step can be either answering to the user, performing an action, or waiting for further requests.


| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| sessionId  | String     | Required: The session_id is a unique ID you generate on your side to group messages from the same user request/conversation. When you start a new conversation, you should generate a new one. You should generate a new one, even when the user is the same.
| text       | String     | Optional: A message from the user. Length must be > 0 and < 256. This should only be set at the first call until you get type=”stop”
| context    | JSON       | Optional: The object representing the session state. JSON object.

#### Request example
```json
{	
	"accessToken": "...",
	"sessionId": "qwerty123",
	"context": {"loc":"Brussels"}
}
```


## WitAi.getEntities
Returns a list of available entities for the app.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.



## WitAi.createEntity
Creates a new entity with the given attributes.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| id         | String     | Required: ID or name of the requested entity
| description| String     | Optional: Short sentence describing this entity
| values     | JSON       | Optional: Possible values for this entity. Array of JSON objects.
| lookups    | JSON       | Optional: Currently only supporting “trait” or “keywords” Search Strategy. If not provided, it will default to “keywords”.Traits are only available for new Bot Engine apps. JSON array.

#### Request example
```json
{	
	"accessToken": "...",
	"id": "favorite_city",
	"description": "A city that I like",
	"values":[{"value":"Paris",
                  "expressions":["Paris",
                                 "City of Light",
                                 "Capital of France"]}]},
    "lookups" : [ "trait" ]
}
```


## WitAi.getEntityValues
Returns all the expressions validated for an entity. We currently limit to the first 1000 values (with the first 50 expressions)

| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| entityId   | String     | Required: ID or name of the entity.


## WitAi.updateEntityValues
Updates an entity with the given attributes.


| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| entityId   | String     | Required: ID or name of the entity.
| id         | String     | Optional: New ID or name of the entity
| description| String     | Optional: Short sentence describing this entity
| values     | JSON       | Optional: Possible values for this entity. Array of JSON objects.

#### Request example
```json
{	
	"accessToken": "...",
	"entityId": "favorite_city",
	"values":[
       {"value":"Paris",
        "expressions":["Paris",
                       "City of Light",
                       "Capital of France"],
        "metadata":"{\"cityId\":342,\"countryId\":12}"},
       {"value":"Seoul",
       "expressions":["Seoul",
                      "서울",
                      "Kimchi paradise"],
       "metadata":"city_343"}]
}
```


## WitAi.deleteEntity
Permanently remove the entity.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| entityId   | String     | Required: ID or name of the entity.


## WitAi.addEntityValues
Add a possible value into the list of values for the entity.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| entityId   | String     | Required: ID or name of the entity.
| value      | String     | Required: Canonical value of the entity
| expressions| JSON       | Optional: Ways of expressing this canonical value (JSON array)
| metadata   | String     | Optional: Metadata you want to attach to this value, will be sent back in runtime.

#### Request example
```json
{	
	"accessToken": "...",
	"entityId": "...",
	"value": "London",
	"expressions": ["London"],
    "metadata": "CITY_1234"
}
```


## WitAi.removeEntityValue
Delete a canonical value from the entity.

| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| entityId   | String     | Required: ID or name of the entity.
| entityValue| String     | Required: Canonical value of the entity


## WitAi.createEntityExpression
Create a new expression for an entity

| Field      | Type       | Description
|------------|------------|----------
| accessToken| credentials| Required: The api key obtained from WitAi.
| entityId   | String     | Required: ID or name of the entity.
| entityValue| String     | Required: Canonical value of the entity
| expression | String     | Required: New expression for the canonical value of the entity. Must be shorter than 256 characters.


## WitAi.removeExpression
Delete an expression of the canonical value of the entity.

| Field          | Type       | Description
|----------------|------------|----------
| accessToken    | credentials| Required: The api key obtained from WitAi.
| entityId       | String     | Required: ID or name of the entity.
| entityValue    | String     | Required: Canonical value of the entity
| expressionValue| String     | Required: Expression value to delete.

#### Request example
```json
{	
	"accessToken": "...",
	"entityId": "favorite_city",
	"entityValue": "Paris",
	"expressionValue": "Camembert city"
}
```
