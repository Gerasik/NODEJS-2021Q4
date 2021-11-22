const { expect } = require("@jest/globals")

const { configCheck, getFlagValue } = require("./configValidator")

describe("Test getFlagValue", () => {
  test("should be a string", () => {
    expect(getFlagValue("-c")).toBe("C1-C1-R0-A")
  })

  test("Should to be false", () => {
    expect(getFlagValue("-a")).toBeFalsy()
  })
})

describe("configCheck", () => {
  test("Should to be false", () => {
    expect(getFlagValue()).toBeFalsy()
  })
  try {
    getFlagValue()
  } catch (e) {
    expect(e.message).toBe("UNKNOWN ERROR")
  }
})
