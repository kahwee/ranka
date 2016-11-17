# ranka

Facebook Messaging bot with greater expressivity.

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
    .sendText(`mm...`)
    .typing()
    .wait(3000)
    .sendText(`Did you say "${req.body.message.text}"?`)
    .sendImage('http://i.giphy.com/FdQj4yMGloVMI.gif')
    .exec()
})
```
