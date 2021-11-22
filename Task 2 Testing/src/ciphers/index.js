const updateStr = require("./updateStr")
const rotCipher = require("./rot")
const caesarCipher = require("./caesar")
const atbashCipher = require("./atbash")

module.exports = {
  rot: (str, conf) => updateStr(str, rotCipher, conf),
  caesar: (str, conf) => updateStr(str, caesarCipher, conf),
  atbash: (str, conf) => updateStr(str, atbashCipher, conf),
}
