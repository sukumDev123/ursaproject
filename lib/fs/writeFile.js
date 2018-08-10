const fs = require("fs");
const path = require("path");

const writeFile = (path_, data) =>
  new Promise((res, rej) => {
    fs.writeFile(
      path.resolve(path_),
      data,
      err => (err ? rej(err) : res(true))
    );
  });
module.exports = writeFile;
