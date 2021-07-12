# Postman 请求加密加签，结果验签解密

用到的库

[crypto-js](https://github.com/brix/crypto-js)：postman内置，加密标准的JavaScript库

[jsencrypt](https://github.com/travist/jsencrypt)：RSA加密

## Pre-request-Scripts

```js
var CryptoJS = require("crypto-js");
var encodeType = pm.environment.get("EncodeType");
var cryptContent;
var rawJson = JSON.parse(pm.request.body.raw);
//caseid
const uuidv1 = require('uuid')
rawJson["CaseId"] = uuidv1();
delete rawJson.Data;
//iterationData
var body = JSON.stringify(rawJson)
var reg = /{{\w+}}/g
var matchArr = body.match(reg);
if (matchArr != null) {
    for (let index = 0; index < matchArr.length; index++) {
        const element = matchArr[index];
        var key = element.replace("{{", "").replace("}}", "");
        const value = pm.iterationData.get(key);
        if (value === undefined) {
            continue;
        }
        body = body.replace(element, pm.iterationData.get(key))
    }
}
console.log("请求原文：" + body)
//加密
if (encodeType == "Aes") {
    var encrypted = CryptoJS.AES.encrypt(body, CryptoJS.enc.Utf8.parse(pm.environment.get("EncodeParam")), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    cryptContent = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString()));
}
//加签
eval(pm.globals.get("jsencrypt"));
var enSignType = pm.environment.get("EnSignType");
var signData;
var newBodyData;
if (enSignType == "Sha1") {
    //加签
    var sign = new JSEncrypt();
    sign.setPrivateKey(pm.environment.get("EnSignParam"));
    var signData = sign.sign(cryptContent, CryptoJS.SHA1, "sha1");
    newBodyData = cryptContent + "," + signData;
}
console.log("请求密文：" + newBodyData);

pm.variables.set("__newData", newBodyData);
```

## Tests

```js
//验签
var CryptoJS = require("crypto-js");
eval(pm.globals.get("jsencrypt"));
console.log("结果密文：" + pm.response.json());
var arr = pm.response.json().split(',');
var deSignType = pm.environment.get("DeSignType")
if (deSignType == "Sha1") {
    var verify = new JSEncrypt();
    verify.setPublicKey(pm.environment.get("DeSignParam"));
    var verified = verify.verify(arr[0], arr[1], CryptoJS.SHA1);
    if (!verified) {
        console.log("验签失败");
        //return;
    }
    //解密
    var decodeType = pm.environment.get("DecodeType");
    if (decodeType == "Aes") {
        var decrypted = CryptoJS.AES.decrypt(arr[0], CryptoJS.enc.Utf8.parse(pm.environment.get("DecodeParam")), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        console.log("结果原文：" + decrypted.toString(CryptoJS.enc.Utf8));
    }
}

//test
pm.test("response must be valid and have a body", function () {
    pm.response.to.be.ok; // info, success, redirection, clientError,  serverError, are other variants
});
```

jsencrypt需要手动引用，可以先放到`Globals`中,再通过`eval(pm.globals.get("jsencrypt"));`引入

## reference

[Postman Sandbox API reference](https://learning.getpostman.com/docs/postman/scripts/postman_sandbox_api_reference)