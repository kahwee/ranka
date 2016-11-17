const Promise = require('bluebird')
class Response {
  constructor (opts) {
    this.req = opts.req
    this.ranka = opts.ranka
    this.actions = []
  }

  wait (ms) {
    this.actions.push(() => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, ms)
    }))
    return this
  }

  typing (isTyping = true) {
    this.actions.push(() => {
      return new Promise((resolve, reject) => {
        this.ranka.api({
          recipient: this.req.body.sender,
          sender_action: isTyping ? 'typing_on' : 'typing_off'
        }).then(resolve)
      })
    })
    return this
  }

  send (message) {
    this.actions.push(() => {
      return new Promise((resolve, reject) => {
        this.ranka.api({
          recipient: this.req.body.sender,
          message: message
        }).then(resolve)
      })
    })
    return this
  }

  exec () {
    this.actions.reduce(function (prev, curr) {
      return prev.then(curr)
    }, Promise.resolve())
      .then(function (result) {
        console.log('RESULT is ')
      })
  }

  sendText (text) {
    return this.send({
      text: text
    })
  }

  sendAttachment (attachment) {
    return this.send({attachment})
  }

  sendAudio (url) {
    return this.sendAttachmentWithPayload('audio', {url})
  }

  sendVideo (url) {
    return this.sendAttachmentWithPayload('video', {url})
  }

  sendFile (url) {
    return this.sendAttachmentWithPayload('file', {url})
  }

  sendAttachmentWithPayload (type, payload) {
    return this.sendAttachment({type, payload})
  }

  sendImage (url) {
    return this.sendAttachmentWithPayload('image', {url})
  }
}
module.exports = Response
