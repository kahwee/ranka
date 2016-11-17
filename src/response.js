class Response {
  constructor (opts) {
    this.req = opts.req
    this.ranka = opts.ranka
  }

  send (message) {
    this.ranka.callSendAPI({
      recipient: this.req.body.sender,
      message: message
    })
  }

  sendText (text) {
    this.send({
      text: text
    })
  }

  sendImage (image) {
    this.send({

    })
  }
}
module.exports = Response
