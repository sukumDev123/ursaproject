import ursa from "ursa";
import {
  genPublicKeyAndPrivateKey,
  decrptMsg,
  encryptMessage
} from "./lib/publicAdPrivate/encryp_decryp";
import { readFile } from "./lib/fs/readFile";
import fs from "fs";

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
    // const mee = "Sukum RSA!";
    // // let txt = await readFile("./text.json", "utf8");
    // // txt = JSON.parse(txt);
    // const testD = await decrptMsg(txt.encrypt, txt.sig, mee, key1.privateKey);
    const text = {
      sukum: "name",
      nilphect: "lastname"
    };
    const text1 = {
      sukum: "name1",
      nilphect: "lastname"
    };

    const testEn = await encryptMessage(
      JSON.stringify(text1),
      key1.publicKey,
      key2.privateKey
    );
    // console.log(testEn);
    const det = await decrptMsg(
      testEn.encrypt,
      testEn.signed,
      JSON.stringify(text1),
      key1.privateKey,
      key2.publicKey
    );
    console.log(typeof det, det);
  } catch (error) {
    return error;
  }
}
startFUnction()
  .then(data => console.log(data))
  .catch(err => console.log(err));
