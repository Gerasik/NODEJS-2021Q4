const { pipeline } = require("stream")
const readline = require("readline")
const { buildAppConfigInfo, errorMessageBuilder } = require("./utils")
const {
  INPUT_CONFIG_OPTION,
  OUTPUT_CONFIG_OPTION,
  APP_ERROR_TYPES,
  CIPHER_CONFIG_OPTION,
} = require("./config")
const { createReadableStream } = require("./streams/readableStream")
const { createWritableStream } = require("./streams/writableStream")
const { Ciphering } = require("./streams/transformStreams")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const configFromCLI = process.argv.slice(2)
const {
  error,
  hasError,
  hasCriticalError,
  config: APP_CONFIG,
} = buildAppConfigInfo(configFromCLI)

if (hasCriticalError) {
  const errorMessage = errorMessageBuilder(
    { configOption: error.configOption, value: error.configOptionValue },
    error.type
  )

  process.stderr.write(errorMessage)
  process.exit(9)
}

if (hasError) {
  const errorMessage = errorMessageBuilder(
    {
      configOption: error.configOption,
      value: error.configOptionValue,
    },
    error.type
  )

  if (error.type === APP_ERROR_TYPES.noInputPath) {
    process.stdout.write(errorMessage)
    process.exit(9)
  }

  if (error.type === APP_ERROR_TYPES.noOutputPath) {
    process.stdout.write(errorMessage)
  }
}

const inputFilePath = APP_CONFIG.get(INPUT_CONFIG_OPTION)
const outputFilePath = APP_CONFIG.get(OUTPUT_CONFIG_OPTION)
const cipherConfig = APP_CONFIG.get(CIPHER_CONFIG_OPTION)

const readableStream = createReadableStream(APP_CONFIG.get(INPUT_CONFIG_OPTION))
const writableStream = outputFilePath
  ? createWritableStream(APP_CONFIG.get(OUTPUT_CONFIG_OPTION))
  : process.stdout
const transformStream = new Ciphering({ cipheringOptions: cipherConfig })
