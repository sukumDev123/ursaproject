// const ursa = require("ursa");

// const readFile = require("../fs/readFile");
// const writeFile = require("../fs/writeFile");
import urs from "ursa";
import { readFile } from "../fs/readFile";
import { writeFile } from "../fs/writeFile";

export const writePrivateKeyAndPublicKey = async (
  pathToPrivateKey,
  pathToPublicKey,
  bites
) => {
  try {
    const key = ursa.generatePrivateKey(bites, 65537);
    const privatekeypem = key.toPrivatePem();
    const publickeypem = key.toPublicPem();
    const writePri = await writeFile(pathToPrivateKey, privatekeypem);
    const writePub = await writeFile(pathToPublicKey, publickeypem);
    const readPri = await readFile(pathToPrivateKey, "ascii");
    const readPub = await readFile(pathToPublicKey, "ascii");
    return {
      privateKey: readPri,
      publicKeyGen: readPub
    };
  } catch (error) {
    return {
      message: error
    };
  }
};
