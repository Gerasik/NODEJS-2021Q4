const { Transform } = require("stream")

class MyTransform extends Transform {
  constructor(cipher, options) {
    super(options)
    this.encode = options
    this.cipher = cipher
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.cipher(chunk.toString("utf8"), this.encode)

      callback(null, resultString)
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = MyTransform
