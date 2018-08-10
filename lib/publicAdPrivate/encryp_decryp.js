import { readFile } from "../fs/readFile";

/**
 *
 * @param {string} path_priKey
 * @param {string} path_pubKey
 * @param {ursa} ursa
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

    return {
      privateKey: privateKey,
      publicKey: publicKey
    };
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
    const sig = privateKeyCLient.hashAndSign(
      "sha256",
      message,
      "utf8",
      "base64"
    );
    return {
      encrypt: encryptMsg,
      sig: sig
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
  sig,
  message,
  privateKeyServer
) => {
  try {
    const decrptMsg_ = privateKeyServer.decrypt(
      encryptMessage,
      "base64",
      "utf8"
    );
    return decrptMsg_;
    // console.log(privateKeyServer);
  } catch (error) {
    return error;
  }
};
