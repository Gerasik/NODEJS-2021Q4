class MyError extends Error {
  constructor(message) {
    super(message)
    this.name = "Chiphering Error"
  }
}

module.exports = MyError
