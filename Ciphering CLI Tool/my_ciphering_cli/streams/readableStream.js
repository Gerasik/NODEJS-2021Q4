const fs = require('fs');

const createReadableStream = (filePath) => {
  const fileReadableStream = fs.createReadStream(filePath);

  return fileReadableStream;
}

module.exports = {
  createReadableStream,
}
