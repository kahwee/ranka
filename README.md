# ranka

Facebook Messaging bot with greater expressivity.

![alt text](https://github.com/kahwee/ranka/raw/master/demo.gif "Demo")


```js
const Ranka = require('ranka')
const ranka = new Ranka({
  serverURL: '',
  validationToken: '',
  pageAccessToken: ''
})
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
## Request

### Request Properties

* `sender`
* `recipient`
* `message`

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

## Response

### Response chainable methods

#### sendText(text)

```js
res
  .sendText('Hello!')
  .exec()
```

#### sendQuickReplies(text, quick_replies)

For example, share you location

```js
res
  .sendQuickReplies('Please share your location:', [
    {
      content_type: 'location'
    }
  ])
  .exec()
```


### send (message)

For example, share you location

```js
res
  .send({ text: 'Hello there!' })
  .exec()
```
