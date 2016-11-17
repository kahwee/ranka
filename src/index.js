const EventEmitter = require('events')
const request = require('request')
class Ranka extends EventEmitter {
  constructor (opts) {
    super(opts)
    const {validationToken, pageAccessToken} = opts
    Object.assign(this, {validationToken, pageAccessToken})
    this.opts = opts
  }

  /**
   * Checks if `validationToken` is correct
   * @param  {[type]} token `hub.token` from initial request
   * @return {[type]}       [description]
   */
  verify (token) {
    return this.validationToken === token
  }

  api (json) {
    return new Promise((resolve, reject) => {
      request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
          access_token: this.pageAccessToken
        },
        json,
        method: 'POST'
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve()
        } else {
          reject()
          console.error('Failed calling Send API', response.statusCode, response.statusMessage, body.error)
        }
      })
    })
  }

}
Ranka.router = require('./router')
module.exports = Ranka
