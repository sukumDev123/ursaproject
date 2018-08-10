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
    const mee = "Sukum RSA!";
    let txt = await readFile("./text.json", "utf8");
    txt = JSON.parse(txt);
    const testD = await decrptMsg(txt.encrypt, txt.sig, mee, key1.privateKey);
  } catch (error) {
    return error;
  }
}
startFUnction()
  .then(data => console.log(data))
  .catch(err => console.log(err));
