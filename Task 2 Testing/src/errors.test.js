const { expect } = require("@jest/globals")

const MyError = require("./errors")

const testMyError = new MyError()

test("should be instance of Error", () => {
  expect(testMyError instanceof Error).toBe(true)
})
