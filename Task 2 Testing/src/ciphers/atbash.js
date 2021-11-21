const LAST_UPPERCASE = 90
const MIDDLE_OF_UPPERCASE = 77
const MIDDLE_OF_LOWERCASE = 109

module.exports = (letter) => {
  const chToNum = letter.charCodeAt(0)
  return String.fromCharCode(
    chToNum +
      ((chToNum <= LAST_UPPERCASE ? MIDDLE_OF_UPPERCASE : MIDDLE_OF_LOWERCASE) -
        chToNum) *
        2 +
      1
  )
}
