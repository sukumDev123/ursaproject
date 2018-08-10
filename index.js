const writePrivateKeyAndPublicKey = require("./lib/publicAdPrivate/writePublicAndPrivate");
const ursa = require("ursa");
const fs = require("fs");
const readFile = require("./lib/fs/readFile");
const writeFile = require("./lib/fs/writeFile");

/**
 *
 * @param {string} path_priKey
 * @param {string} path_pubKey
 * @param {ursa} ursa
 */
const genPublicKeyAndPrivateKey = async (path_priKey, path_pubKey, ursa) => {
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
const encryptMessage = async (message, publicKeyServer, privateKeyCLient) => {
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
const decrptMsg = async (encryptMessage, sig, message, privateKeyServer) => {
  try {
    const decrptMsg_ = privateKeyServer.decrypt(
      encryptMessage,
      "base64",
      "utf8"
    );
    return decrptMsg_;
  } catch (error) {
    return error;
  }
};
async function startFUnction() {
  try {
    const key1 = await genPublicKeyAndPrivateKey(
      "./key/pri/private.pem",
      "./key/pub/public.pem",
      ursa
    );
    const key2 = await genPublicKeyAndPrivateKey(
      "./key/pri/private2.pem",
      "./key/pub/public2.pem",
      ursa
    );
    const mee = "Sukum RSA!";
    let txt = await readFile("./text.json", "utf8");
    txt = JSON.parse(txt);
    const testD = await decrptMsg(txt.encrypt, txt.sig, mee, key1.privateKey);
    console.log(testD);
    // const testMsg = await encryptMessage(
    //   "Sukum RSA!",
    //   key1.publicKey,
    //   key2.privateKey
    // );
    // fs.writeFile("./text.txt", JSON.stringify(testMsg), err =>
    //   console.log(err)
    // );
  } catch (error) {
    return error;
  }
}
startFUnction()
  .then(data => console.log(data))
  .catch(err => console.log(err));

// encry("./key/pri/private4.pem", "./key/pub/public.pem", "Hello RAS! ", "utf8")
//   .then(s => console.log(s))
//   .catch(er => console.log(er));
// const testEnCryp = async (path_, message) => {
//   const
// };
// writePrivateKeyAndPublicKey(
//   "./key/pri/private4.pem",
//   "./key/pub/public4.pem",
//   1024
// )
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => console.log(err));
// const { privateKey, publickeypem } = writePrivateKeyAndPublicKey(
//   "./key/pri/private3.pem",
//   "./key/pub/public3.pem",
//   1024
// ); // Promise return

// console.log("private : ", privatekeypem.toString("ascii"));
// console.log("public : ", publickeypem.toString("ascii"));

// Bob has his private and Alice's public key
