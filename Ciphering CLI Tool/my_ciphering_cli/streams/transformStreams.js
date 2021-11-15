const { Transform } = require('stream');
const { ALPHABET_LENGTH } = require('../config');

class Ciphering extends Transform {
  constructor(options) {
    super(options);

    this.cipheringOptions = options.cipheringOptions.split('-');
    this._cipherOptionToCipherFunc = {
      'C1': this._caesarEncrypt.bind(this),
      'C0': this._caesarDecrypt.bind(this),
      'R1': this._ROT5Encrypt.bind(this),
      'R0': this._ROT5Decrypt.bind(this),
      'A': this._atbash.bind(this),
    }
  }

  _transform(chunk, encoding, callback) {
    const string = chunk.toString();

    return callback(null, `${this._cipherString(string)}`);
  }

  _cipherString(string) {
    return this.cipheringOptions.reduce((acc, option) => {
      const cipherFunction = this._cipherOptionToCipherFunc[option];

      return cipherFunction(acc);
    }, string)
  }

  _ROT5Encrypt(string) {
    return this._caesarEncrypt(string, 5)
  }

  _ROT5Decrypt(string) {
    return this._caesarDecrypt(string, 5)
  }

  _caesarEncrypt (string, shift = 1) {
    return this._caesar(string, shift);
  }

  _caesarDecrypt (string, shift = 1) {
    return this._caesar(string, (26 - shift) % 26);
  }

  _atbash(string) {
    return string
      .split('')
      .reduce((acc, item) => {
        let charCode = item.charCodeAt(0);

        if (charCode === 231) {
          charCode = 99;
        } else if (charCode === 199) {
          charCode = 67;
        }

        if (charCode >= 65 && charCode <= 90) {
          // Uppercase
          acc += String.fromCharCode(charCode + (ALPHABET_LENGTH - 1 - (charCode - 65)*2));
        } else if (charCode >= 97 && charCode <= 122) {
          // Lowercase
          acc += String.fromCharCode(charCode + (ALPHABET_LENGTH - 1 - (charCode - 97)*2))
        } else {
          acc += item.charAt(0);
        }

        return acc;
      }, '');
  }

  _caesar(string, shift) {
    return string
      .split('')
      .reduce((acc, item) => {
        let charCode = item.charCodeAt(0);

        if (charCode === 231) {
          charCode = 99;
        } else if (charCode === 199) {
          charCode = 67;
        }

        if (charCode >= 65 && charCode <= 90) {
          // Uppercase
          acc += String.fromCharCode((charCode - 65 + shift) % 26 + 65)
        } else if (charCode >= 97 && charCode <= 122) {
          // Lowercase
          acc += String.fromCharCode((charCode - 97 + shift) % 26 + 97)
        } else {
          acc += item.charAt(0);
        }

        return acc;
      }, '');
  }
}

module.exports = {
  Ciphering,
}
