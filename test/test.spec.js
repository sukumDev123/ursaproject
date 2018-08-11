import { assert } from "chai";
import * as tLib from "../lib/publicAdPrivate/encryp_decryp";
import * as makePem from "../lib/publicAdPrivate/writePublicAndPrivate";
import { readFile } from "../lib/fs/readFile";
import { writeFile } from "../lib/fs/writeFile";
import ursa from "ursa";
import path from "path";
describe("Ursa Test App", () => {
  const messageIs = "Hi RSA test lib.";
  let tempKey = {};
  let key1, key2, key3, tempTest2;
  describe("RSA function ", () => {
    it("test genelator private key and public key to object require", async () => {
      // assert.equal(messageIs, 3);
      const key = await tLib.genPublicKeyAndPrivateKey(
        path.resolve("./key/pri/private2.pem"),
        path.resolve("./key/pub/public2.pem"),
        ursa
      );
      key3 = key;
      const encrypMsg = await tLib.encryptMessage(
        messageIs,
        key3.publicKey,
        key3.privateKey
      );
      tempTest2 = encrypMsg;
      assert.typeOf(key.privateKey, "object");
      assert.typeOf(key.publicKey, "object");
    });
    it("test Encryp data message is type string and not empty file", async () => {
      const keyG1 = await tLib.genPublicKeyAndPrivateKey(
        path.resolve("./key/pri/private.pem"),
        path.resolve("./key/pub/public.pem"),
        ursa
      );
      const keyG2 = await tLib.genPublicKeyAndPrivateKey(
        path.resolve("./key/pri/private.pem"),
        path.resolve("./key/pub/public.pem"),
        ursa
      );
      const encrypMsg = await tLib.encryptMessage(
        messageIs,
        keyG1.publicKey,
        keyG2.privateKey
      );
      assert.isNotEmpty(encrypMsg.encrypt);
      assert.isNotEmpty(encrypMsg.signed);

      assert.typeOf(encrypMsg.encrypt, "string");
      assert.typeOf(encrypMsg.signed, "string");
      tempKey = encrypMsg;
      key1 = keyG1;
      key2 = keyG2;
    });
    it("decryp data message is case success", async () => {
      const decrypMsg = await tLib.decrptMsg(
        tempKey.encrypt,
        tempKey.signed,
        messageIs,
        key1.privateKey,
        key2.publicKey
      );
      assert.equal(decrypMsg, messageIs);
    });
    it("decryp data messae is case not success because encryp is decryp but not equal old message ", async () => {
      const decrptMsg = await tLib.decrptMsg(
        tempKey.encrypt,
        tempKey.signed,
        "messageIs",
        key1.privateKey,
        key2.publicKey
      );
      assert.typeOf(decrptMsg, "Error");
      // expect(decrptMsg).to.thorw(decrptMsg);
    });
    it("decryp data messae is case not success because encryp is decryp but not signed ", async () => {
      const decrptMsg = await tLib.decrptMsg(
        tempKey.encrypt,
        tempTest2.signed,
        messageIs,
        key1.privateKey,
        key2.publicKey
      );
      assert.typeOf(decrptMsg, "Error");
      // expect(decrptMsg).to.thorw(decrptMsg);
    });
  });
});
