module.exports = (str, fn, conf) =>
  str
    .split("")
    .map((item) => (/[a-zA-Z]/.test(item) ? fn(item, conf) : item))
    .join("")
