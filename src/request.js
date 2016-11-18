class Request {
  constructor (opts) {
    Object.assign(this, opts.body)
    this.ranka = opts.ranka
  }

  hasAttachments () {
    return this.message && typeof this.message.attachments !== 'undefined'
  }

  getImages () {
    return this.getAttachmentsByType('image')
  }

  isThumbsUp () {
    const images = this.getImages()
    const valid = [
      369239343222814, // big
      369239263222822 // small
    ]
    return images.some((attachment) => valid.includes(attachment.payload.sticker_id))
  }

  getLocations () {
    return this.getAttachmentsByType('location')
  }

  getLocation () {
    const locs = this.getLocations()
    if (locs.length > 0) {
      return locs[0]
    } else {
      return null
    }
  }

  getAttachmentsByType (type) {
    if (this.hasAttachments()) {
      return this.message.attachments.filter((attachment) => attachment.type === type)
    } else {
      return []
    }
  }
}
module.exports = Request
