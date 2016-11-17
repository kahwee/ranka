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
    this.send({
      text: text
    })
    return this
  }

  sendImage (image) {
    this.send({

    })
  }
}
module.exports = Response
