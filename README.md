# ranka

Facebook Messaging bot with greater expressivity to be used in conjunction with Express.

![Demo](https://github.com/kahwee/ranka/raw/master/demo.gif "Demo")

* [Setting up](#setting-up)
* [Request Object](#request-object)
* [Response Object](#response-object)

## Setting up

First, you will need to instantiate Ranka together with Express

```js
const express = require('express')
const app = express()
const Ranka = require('ranka')
const ranka = new Ranka({
  serverURL: '',
  validationToken: '',
  pageAccessToken: ''
})
```

Then, use your webhook this way:

```js
app.use('/webhook', Ranka.router({
  ranka: ranka
}))

ranka.on('message', (req, res) => {
  res
    .sendText('mm...')
    .typing()
    .wait(3000)
    .sendText(`Did you say "${req.body.message.text}"?`)
    .sendImage('http://i.giphy.com/FdQj4yMGloVMI.gif')
    .exec()
})
```

Bind your Express server port if you haven't already.

```js
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```

## Request Object

### Request Properties

Every [Facebook callback](https://developers.facebook.com/docs/messenger-platform/webhook-reference/message) is supported. This includes:

* `sender`
* `recipient`
* `timestamp`
* `message`

For example, when Facebook sends back the following:

```json
{
  "sender":{
    "id":"USER_ID"
  },
  "recipient":{
    "id":"PAGE_ID"
  },
  "timestamp":1458692752478,
  "message":{
    "mid":"mid.1457764197618:41d102a3e1ae206a38",
    "seq":73,
    "text":"hello, world!",
    "quick_reply": {
      "payload": "DEVELOPER_DEFINED_PAYLOAD"
    }
  }
}
```

`console.log(req.message)` returns you with:

```json
{
  "mid":"mid.1457764197618:41d102a3e1ae206a38",
  "seq":73,
  "text":"hello, world!",
  "quick_reply": {
    "payload": "DEVELOPER_DEFINED_PAYLOAD"
  }
}
```

### Request Methods

#### isThumbsUp()

Returns true if it is Facebook thumbs up.

```js
req.isThumbsUp()
```

#### hasAttachments()

Returns True, if there are attachments

#### getAttachmentsByType(type)

Returns an array of all attachments with specified type.

If no attachments of type is found, return an empty array.

```js
req.getAttachmentsByType('location')
```

## Response Object

### Response chainable methods

The methods are chainable, you can use multiple methods and run `.exec()` at the end.

#### send (message)

This is equivalent to sending this payload to Facebook Messenger API where `message` is the passed in as an object.

```
{
  "recipient": {
    "id": "AUTO_FILLED_USER_ID"
  },
  "message": message
}
```

In this case, we can send a basic text:

```js
res
  .send({ text: 'Hello there!' })
  .exec()
```

Correspondingly, `ranka` generates the data to send back to Facebook:

```
{
  "recipient": {
    "id": "AUTO_FILLED_USER_ID"
  },
  "message": { 
    "text": "Hello there!" 
  }
}
```

The remaining commands are convenient helpers that wraps the `send()` method.

#### sendText(text)

Sends a text as a reply to the sender.

```js
res
  .sendText('Hello!')
  .exec()
```

#### sendQuickReplies(text, quick_replies)

You can send some quick replies:

```js
res
  .sendQuickReplies('Please share your location:', [
    {
      content_type: 'location'
    }
  ])
  .exec()
```

