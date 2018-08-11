import { readFile } from "../fs/readFile";

class Key {
  constructor(privateKey, publicKey) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }
}

/**
 *
 * @param {string} path_priKey
 * @param {string} path_pubKey
 * @param {ursa} ursa
 * @returns {Key}
 */
export const genPublicKeyAndPrivateKey = async (
  path_priKey,
  path_pubKey,
  ursa
) => {
  try {
    /** read file private.pem and public.pem  */
    const readFilePriKey = await readFile(path_priKey, "ascii");
    const readFilePubKey = await readFile(path_pubKey, "ascii");
    /** create PrivateKey And PublicKey */
    const privateKey = ursa.createPrivateKey(readFilePriKey);
    const publicKey = ursa.createPublicKey(readFilePubKey);

    return new Key(privateKey, publicKey);
  } catch (error) {
    return error;
  }
};
/**
 *
 * @param {string} message
 * @param {ursa.createPrivateKey} publicKeyServer
 * @param {*} privateKeyCLient
 */
export const encryptMessage = async (
  message,
  publicKeyServer,
  privateKeyCLient
) => {
  try {
    const encryptMsg = publicKeyServer.encrypt(message, "utf8", "base64");
    const signed = privateKeyCLient.hashAndSign(
      "sha256",
      message,
      "utf8",
      "base64"
    );

    return {
      encrypt: encryptMsg,
      signed: signed
    };
  } catch (error) {
    return error;
  }
};
/**
 *
 * @param {*} encryptMessage
 * @param {*} sig
 * @param {*} message
 * @param {*} privateKeyServer
 */
export const decrptMsg = async (
  encryptMessage,
  signed,
  message_input,
  privateKeyServer,
  publicKey
) => {
  try {
    const decrptMsg_ = privateKeyServer.decrypt(
      encryptMessage,
      "base64",
      "utf8"
    );
    if (decrptMsg_ !== message_input) {
      throw new Error("invalid decrypt");
    }
    message_input = new Buffer(message_input).toString("base64");
    console.log(signed);
    // console.log(publicKey.hashAndVerify("sha256", "test", signed, "base64"));
    if (!publicKey.hashAndVerify("sha256", message_input, signed, "base64")) {
      throw new Error("invalid signature");
    }
    return decrptMsg_;
    // console.log(privateKeyServer);
  } catch (error) {
    return error;
  }
};
