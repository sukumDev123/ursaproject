import path from "path";
import fs from "fs";
export const readFile = (path_, genIs) =>
  new Promise((res, rej) => {
    return fs.readFile(
      path.resolve(path_),
      genIs,
      (err, data) => (err ? rej(err) : res(data))
    );
  });
