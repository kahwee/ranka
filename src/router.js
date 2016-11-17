const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Request = require('./request')
const Response = require('./response')

/**
 * This is ranka
 */
let ranka
router.use(bodyParser.json())

router.get('/', (req, res) => {
  const {query} = req
  if (query['hub.mode'] === 'subscribe') {
    if (ranka.verify(query['hub.verify_token'])) {
      res.send(query['hub.challenge'])
    } else {
      res.status(403).send('Failed validation. Make sure the validation tokens match.')
    }
  } else {
    res.send(req.headers.host + req.baseUrl)
  }
})

router.post('/', (req, res) => {
  const object = req.body.object
  if (object === 'page') {
    req.body.entry.forEach((entrySingle) => {
      entrySingle.messaging.forEach((messaging) => {
        const req = new Request({
          ranka,
          body: messaging
        })
        const res = new Response({req, ranka})
        if (messaging.message) {
          if (messaging.message.is_echo) {
            ranka.emit('message-echo', req, res)
          } else {
            ranka.emit('message', req, res)
          }
        } else if (messaging.read) {
          ranka.emit('read', req, res)
        }
      })
    })
  }
  res.sendStatus(200)
})

/**
 * Monitoring
 * @param  {[type]} '/monit' [description]
 * @param  {[type]} (req,    res           [description]
 * @return {[type]}          [description]
 */
router.get('/monit', (req, res) => {
})

module.exports = (opts) => {
  if (opts.ranka) {
    ranka = opts.ranka
  } else {
    throw new Error('You need to provide ranka object')
  }
  return router
}
