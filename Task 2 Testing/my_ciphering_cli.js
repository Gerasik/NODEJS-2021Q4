const { stderr, exit, stdin, stdout } = require("process")
const { pipeline } = require("stream")

const configValidator = require("./src/configValidator")
const { MyReadable, MyWritable, MyTransform } = require("./src/streams")
const { caesar, rot, atbash } = require("./src/ciphers")

try {
  configValidator.configCheck()

  const readStream = (inputPath = configValidator.getFlagValue("-i"))
    ? new MyReadable(inputPath)
    : stdin

  const writeStream = (outputPath = configValidator.getFlagValue("-o"))
    ? new MyWritable(outputPath)
    : stdout

  let transformsArray = []
  configValidator
    .getFlagValue("-c")
    .split("-")
    .forEach((el) => {
      switch (el) {
        case "C1":
          transformsArray.push(new MyTransform(caesar, true))
          break

        case "C0":
          transformsArray.push(new MyTransform(caesar))
          break

        case "R1":
          transformsArray.push(new MyTransform(rot, true))
          break

        case "R0":
          transformsArray.push(new MyTransform(rot))
          break

        case "A":
          transformsArray.push(new MyTransform(atbash))
          break

        default:
          break
      }
    })

  pipeline(readStream, ...transformsArray, writeStream, (err) => {
    if (err) {
      stderr.write("Error: " + err.message)
      exit(1)
    }
  })
} catch (error) {
  stderr.write("Error: " + error, "utf8")
  exit(1)
}
