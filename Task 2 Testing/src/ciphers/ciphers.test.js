const STR = "ABCxyz 22 тест . +"

const { expect } = require("@jest/globals")

const { atbash, rot, caesar } = require("./index")

describe("Test atbash", () => {
  const testCipher = atbash(STR)

  describe("Test atbash", () => {
    test("should be a string", () => {
      expect(typeof testCipher).toBe("string")
    })

    test("Must be correctly coded", () => {
      expect(testCipher).toBe("ZYXcba 22 тест . +")
    })
  })
})

describe("Test rot", () => {
  const testCipher = rot(STR)
  const testCipherReverse = rot(STR, true)

  describe("Test rot", () => {
    test("should be a string", () => {
      expect(typeof testCipher).toBe("string")
    })

    test("Must be correctly coded", () => {
      expect(testCipher).toBe("STUpqr 22 тест . +")
    })

    test("Must be correctly coded reverse", () => {
      expect(testCipherReverse).toBe("IJKfgh 22 тест . +")
    })
  })
})

describe("Test caesar", () => {
  const testCipher = caesar(STR)
  const testCipherReverse = caesar(STR, true)

  describe("Test caesar", () => {
    test("should be a string", () => {
      expect(typeof testCipher).toBe("string")
    })

    test("Must be correctly coded", () => {
      expect(testCipher).toBe("ZABwxy 22 тест . +")
    })

    test("Must be correctly coded reverse", () => {
      expect(testCipherReverse).toBe("BCDyza 22 тест . +")
    })
  })
})
