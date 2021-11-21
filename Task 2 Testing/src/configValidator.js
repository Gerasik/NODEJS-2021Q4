const fs = require("fs")

const MyError = require("./errors")
const { errors } = require("./constants")

const checkFlag = (f) => {
  return /--config|--input|--output/.test(f) ? f.slice(1, 3) : f
}

const config = process.argv.slice(2).map((it) => checkFlag(it))

const getFlagValue = (flag) => {
  const flagInd = config.indexOf(checkFlag(flag))
  return flagInd !== -1 ? config[flagInd + 1] : false
}

const configCheck = () => {
  if (config.length === 0) {
    throw new MyError(errors.EMPTY_CLI)
  }

  if (config.length !== new Set(config).size) {
    throw new MyError(errors.DUPLICATE_FLAG)
  }

  if (~~config.indexOf("-c")) {
    throw new MyError(errors.NO_CONFIG)
  }

  if (!fs.existsSync(getFlagValue("-i"))) {
    throw new MyError(errors.WRONG_INPUT)
  }

  if (!fs.existsSync(getFlagValue("-o"))) {
    throw new MyError(errors.WRONG_OUTPUT)
  }

  const ciphersArr = getFlagValue("-c").split("-")
  if (
    ciphersArr.length !== ciphersArr.filter((it) => it).length ||
    ciphersArr.filter((it) => /^C0$|^C1$|^R0$|^R1$|^A$/g.test(it)).length !==
      ciphersArr.length
  ) {
    throw new MyError(errors.NO_VALID_CONFIG)
  }
}

module.exports = { configCheck, getFlagValue }
