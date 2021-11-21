const { expect } = require("@jest/globals")

const { configCheck, getFlagValue } = require("./configValidator")

// process.argv.push("", "", "-c", "test")
beforeEach(() => {
  process.argv = ["", "", "-c", "test"]
})

test("test getFlagValue", () => {
  console.log(process.argv)
  expect(getFlagValue("-c")).toBeFalsy()
})
