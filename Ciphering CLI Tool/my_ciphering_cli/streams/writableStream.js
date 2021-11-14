const fs = require('fs');

const createWritableStream = (filePath) => {
  const fileWritableStream = fs.createWriteStream(filePath);

  return fileWritableStream;
}

module.exports = {
  createWritableStream,
}
