import path from "path";
import fs from "fs";
export const writeFile = (path_, data) =>
  new Promise((res, rej) => {
    fs.writeFile(
      path.resolve(path_),
      data,
      err => (err ? rej(err) : res(true))
    );
  });
