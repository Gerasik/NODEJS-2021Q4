const FIRST_LOWERCASE = 97
const FIRST_UPPERCASE = 65
const LAST_LOWERCASE = 122
const LAST_UPPERCASE = 90
const ALPHABET_LENGTH = 26

module.exports = (letter, conf) => {
  const chToNum = letter.charCodeAt(0)
  const regStr = conf
    ? chToNum <= LAST_UPPERCASE
      ? FIRST_UPPERCASE
      : FIRST_LOWERCASE
    : chToNum <= LAST_UPPERCASE
    ? LAST_UPPERCASE
    : LAST_LOWERCASE

  return String.fromCharCode(
    regStr + ((chToNum + (conf ? 1 : -1) - regStr) % ALPHABET_LENGTH)
  )
}
