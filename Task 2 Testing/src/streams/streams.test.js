const INPUT = "./input.txt"
const OUTPUT = "./output.txt"

const { expect } = require("@jest/globals")
const { Readable, Writable, Transform } = require("stream")

const { MyReadable, MyWritable, MyTransform } = require("./index")

test("should be instance of Readable", () => {
  expect(new MyReadable(INPUT) instanceof Readable).toBe(true)
})

test("should be instance of Writable", () => {
  expect(new MyWritable(OUTPUT) instanceof Writable).toBe(true)
})

test("should be instance of Transform", () => {
  expect(new MyTransform() instanceof Transform).toBe(true)
})
