const fs = require("fs");
const path = require("path");
const readFile = (path_, genIs) =>
  new Promise((res, rej) => {
    fs.readFile(
      path.resolve(path_),
      genIs,
      (err, data) => (err ? rej(err) : res(data))
    );
  });

module.exports = readFile;
