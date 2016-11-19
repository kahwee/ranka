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
          recipient: this.req.sender,
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
          recipient: this.req.sender,
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
        console.log('RESULT is ', result)
      })
  }

  /**
   * @link https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies
   * @param  {[type]} text       [description]
   * @param  {[type]} quick_replies [description]
   * @return {[type]}            [description]
   */
  sendQuickReplies (text, quick_replies) {
    return this.send({text, quick_replies})
  }

  sendText (text) {
    return this.send({text})
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

  sendTemplate (payload) {
    return this.sendAttachmentWithPayload('template', payload)
  }

  sendAttachmentWithPayload (type, payload) {
    return this.sendAttachment({type, payload})
  }

  sendImage (url) {
    return this.sendAttachmentWithPayload('image', {url})
  }
}
module.exports = Response
