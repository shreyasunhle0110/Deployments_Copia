import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-node-detail',
  templateUrl: './wrapper-node-detail.component.html',
  styleUrls: ['./wrapper-node-detail.component.css']
})
export class WrapperNodeDetailComponent implements OnInit {
  systemObject: string = '';
  paymentObject: string = '';
  customerObject: string = '';
  orderObject: string = '';
  otherObject: string = '';

  paymentMethodCode: string = '';
  paymentEnquiryMethodCode: string = '';
  paymentCancellationMethodCode: string = '';
  callingAPICode: string = '';
  keystoreDataMethodCode: string = '';
  logMaintainFunctionMethodCode: string = '';
  cleanObjectMethodCode: string = '';
  callbackNotificationAPICode: string = '';
  constantFileCode: string = '';
  constructor() { }

  ngOnInit(): void {
    this.argumentsCode();
    this.actualCode();
  }

  argumentsCode() {
    this.systemObject = `
    {
      RedirectSuccessUrl: "successurl.com",
      RedirectFailUrl: "failurl.com",
      RedirectCancelUrl: "cancelurl.com",
      NotificationUrl: "notificationurl.com"
    }`;

    this.paymentObject = `
    {
      country: "IN",
      currency: "INR",
      amount: 10200000,
      payment_option": "all",
      expiry: "2020-01-01T13:02:00+05:30",
      offers: [
        "offer_#111@222",
        "offer_#333@444"
       ]
    }`;

    this.customerObject = `
    {
      customer_firstname: "Ghanshyam",
      customer_lastname: "Subramaniam",
      customer_email: "customer.name@example.com",
      customer_phone: "9843176540"
    }`;

    this.orderObject = `
    {
      "description": "Proceed check out for your order #ORD-438UL748T6",
      "descriptions": [
        {
          "product_name": "Product Item 1",
          "product_id": "PRO-ASDF-1234",
          "unitAmt": 10000,
          "unit": 2,
          "subAmt": 20000
        },
        {
          "product_name": "Product Item 2",
          "product_id": "PRO-JHGF-9876",
          "unitAmt": 50000,
          "unit": 3,
          "subAmt": 150000
        }
      ]
    }`;

    this.otherObject = `
    {
      "udfs": [
        {
          "definition": "Product Image in Base64 format",
          "value": "iVBORw0KGgoAAAANSUhEU..."
        },
        {
          "definition": "Special Notes from Customer",
          "value": "Customer is a non-smoker"
        }
      ]
    }`
  }

  actualCode() {
    this.paymentMethodCode = `
    async function newPayment(txnRef, system, payment, merchant, customer, order, other) {
      await cleanObject(customer);
      await cleanObject(payment);
      await cleanObject(other);
    
      var payload = {
        "transaction": {
          "txnRef": txnRef
        },
        "system": system,
        "payment": payment,
        "merchant": {
          "merId": merchant
        },
        "customer": customer,
        "order": order,
        "other": other
      }
    
      await cleanObject(payload);
    
      console.log(payload);
      
      // Creating instance of keyStoreData
      keyData = await keyStoreData();
    
      // Assigning public and private keys to the variables
      var __MerchantPrivateKey = keyData.keystore.get('0901').toJSON(true);
      var __skey = keyData.keystore.get('0004');
      // Setting token payload and encryption algorithm 
    
      // Signing the payload using Merchant Private Key
      var token = await JWS.createSign({ format: 'compact' }, __MerchantPrivateKey).update(JSON.stringify(payload), "utf8").final();
      
      // Encrypting the signing payload using HSBC Public Key
      requestEncryptedMessage = await JWE.createEncrypt({ format: "compact" }, __skey).update(token, "utf8").final();
      
      // Calling HSBC's Payment PageRedirect API and Getting Encrypted Response
      var responseMessage;
      await CallingAPI(requestEncryptedMessage, "https://devclustercmb.api.p2g.netd2.hsbc.com.hk/glcm-mobilecoll-mcin-ea-merchantservices-cert-proxy/v1//payment/pageRedirect", merchant)
        .then(result => {
          responseMessage = result;
          
        })
        .catch(err => {
          console.log(err);
          ResponseMessageObj = { httpResMessage: err.toString() };
        });
    
      // Taking reference of Merchant Parivate Key to the variable to decrypt the encrypted response
      var __MerchantPrivateKey = await jose.JWK.asKey(keyData.privateKey, "pem");
      var decryptMessage;
      requestDecryptMessage = await JWE.createDecrypt(__MerchantPrivateKey).
        decrypt(responseMessage.httpResMessage).
        then(function (result) {
          decryptMessage = result;
        }).
        catch(err => {
          console.log("Error bro");
        });
    
      // Taking reference of HSBC Public Key to the variable to verify the decrypted response
      if (responseMessage.httpStatus == "200") {
        var __skey = await jose.JWK.asKey(keyData.certificate, "pem");
        var ResponseDecryptedMessage;
        await JWS.createVerify(__skey).
          verify(decryptMessage.payload.toString()).
          then(function (result) {
            ResponseDecryptedMessage = result.payload.toString();
          });
        const responseObject = {
          ResponseDecryptedMessage: ResponseDecryptedMessage
        };
        if(JSON.parse(responseObject.ResponseDecryptedMessage).response.system.redirectLink != undefined) {
          returnObj = {
            "redirectLink": JSON.parse(responseObject.ResponseDecryptedMessage).response.system.redirectLink,
            "txnRef": JSON.parse(responseObject.ResponseDecryptedMessage).response.transaction.txnRef,
            "redirectUrlLink": JSON.parse(responseObject.ResponseDecryptedMessage).response.system.redirectUrlLink
          }
        }
        else {
          returnObj = {
            "redirectLink": JSON.stringify(responseObject.ResponseDecryptedMessage),
            "txnRef": null,
            "redirectUrlLink": null
          }
        }
      }
      else {
        returnObj = {
          "redirectLink": JSON.stringify(responseMessage),
          "txnRef": null,
          "redirectUrlLink": null
        }
      }
    
      await logMaintainFunction(payload, requestEncryptedMessage, decryptMessage, ResponseDecryptedMessage, responseMessage, "Payment Submit");
      return returnObj;
    }`;

    this.paymentEnquiryMethodCode = `
    async function paymentEnquiry(txnRef, merchant) {

      var payload = {
        transaction: {
          txnRef: txnRef
        },
        merchant: {
          merId: merchant
        }
      };
    
      // Creating instance of keyStoreData
      keyData = await keyStoreData();
    
      // Assigning public and private keys to the variables
      var __MerchantPrivateKey = keyData.keystore.get('0901').toJSON(true);
      var __skey = keyData.keystore.get('0004');
    
      // Signing the payload using Merchant Private Key
      var token = await JWS.createSign({ format: 'compact' }, __MerchantPrivateKey).update(JSON.stringify(payload), "utf8").final();
    
      // Encrypting the signing payload using HSBC Public Key
      requestEncryptedMessage = await JWE.createEncrypt({ format: 'compact' }, __skey).update(token, "utf8").final();
    
      // Calling HSBC's Payment PageRedirect API and Getting Encrypted Response
      var responseMessage;
      await CallingAPI(requestEncryptedMessage, "https://devclustercmb.api.p2g.netd2.hsbc.com.hk/glcm-mobilecoll-mcin-ea-merchantservices-cert-proxy/v1//payment/enquiry", merchant)
        .then(result => {
          ResponseMessageObj = result;
          responseMessage = ResponseMessageObj;
        })
        .catch(err => {
          console.log(err);
          ResponseMessageObj = { httpResMessage: err.toString() };
        });
    
      // Taking reference of Merchant Parivate Key to the variable to decrypt the encrypted response
      if (responseMessage.httpStatus == 200) {
        var __MerchantPrivateKey = await jose.JWK.asKey(keyData.privateKey, "pem");
        var decryptMessage;
        requestDecryptMessage = await JWE.createDecrypt(__MerchantPrivateKey).
          decrypt(responseMessage.httpResMessage).
          then(function (result) {
            decryptMessage = result;
          });
    
        // Taking reference of HSBC Public Key to the variable to verify the decrypted response
        var __skey = await jose.JWK.asKey(keyData.certificate, "pem");
        var ResponseMessageObj;
        await JWS.createVerify(__skey).
          verify(decryptMessage.payload.toString()).
          then(function (result) {
            ResponseMessageObj = result.payload.toString();
          });
    
        returnObj = {
          "title": "Response of Payment Enquiry",
          "response": ResponseMessageObj
        }
      }
      else {
        returnObj = {
          "title": "Response of Payment Enquiry.",
          "response": JSON.stringify(responseMessage)
        }
      }
      await logMaintainFunction(payload, requestEncryptedMessage, responseMessage, decryptMessage, responseMessage, "Payment Enquiry");
      return returnObj
    }`;

    this.paymentCancellationMethodCode = `
    async function paymentCancellation(refundNotificationURL, txnRef, rfdRef, amount, currency, merId) {

      var payload = {
        system: {
          refundNotificationUrl: refundNotificationURL
        },
        transaction: {
          txnRef: txnRef,
          rfdRef: rfdRef,
          amount: amount,
          currency: currency
        },
        merchant: {
          merId: merId
        }
      }
      // Creating instance of keyStoreData
      keyData = await keyStoreData();
    
      // Assigning public and private keys to the variables
      var __MerchantPrivateKey = keyData.keystore.get('0901').toJSON(true);
      var __skey = keyData.keystore.get('0004');
    
      // Signing the payload using Merchant Private Key
      var token = await JWS.createSign({ format: 'compact' }, __MerchantPrivateKey).update(JSON.stringify(payload), "utf8").final();
    
      // Encrypting the signing payload using HSBC Public Key
      requestEncryptedMessage = await JWE.createEncrypt({ format: 'compact' }, __skey).update(token, "utf8").final();
    
      // Calling HSBC's Payment PageRedirect API and Getting Encrypted Response
      var responseMessage;
      await CallingAPI(requestEncryptedMessage, "https://devclustercmb.api.p2g.netd2.hsbc.com.hk/glcm-mobilecoll-mcin-ea-merchantservices-cert-proxy/v1//payment/cancel", merId)
        .then(result => {
          responseMessage = result;
        })
        .catch(err => {
          console.log(err);
          ResponseMessageObj = { httpResMessage: err.toString() };
        });
    
      // Taking reference of Merchant Parivate Key to the variable to decrypt the encrypted response
      if (responseMessage.httpStatus == 200) {
        var __MerchantPrivateKey = await jose.JWK.asKey(keyData.privateKey, "pem");
        var decryptMessage;
        requestDecryptMessage = await JWE.createDecrypt(__MerchantPrivateKey).
          decrypt(responseMessage.httpResMessage).
          then(function (result) {
            decryptMessage = result;
          });
    
        // Taking reference of HSBC Public Key to the variable to verify the decrypted response
        var __skey = await jose.JWK.asKey(keyData.certificate, "pem");
        var ResponseMessageObj;
        await JWS.createVerify(__skey).
          verify(decryptMessage.payload.toString()).
          then(function (result) {
            ResponseMessageObj = result.payload.toString();
          });
    
        returnObj = {
          "title": "Response of Payment Cancel and Refund.",
          "response": ResponseMessageObj
        }
      }
      else {
        returnObj = {
          "title": "Response of Payment Cancel and Refund.",
          "response": JSON.stringify(responseMessage)
        }
      }
    
      await logMaintainFunction(payload, requestEncryptedMessage, responseMessage, decryptMessage, responseMessage, "Payment Cancel and Refund");
      return returnObj;
    }`;

    this.callingAPICode = `
    function CallingAPI(message, APILink, merchant) {
      return new Promise((resolve, reject) => {
        const requestHttpOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic WW91clVzZXJOYW1lOllvdXJQYXNzd29yZA==',
            'x-hsbc-client-id': contstant.clientId,
            'x-hsbc-client-secret': contstant.clientSecret,
            'x-hsbc-msg-encrypt-id': merchant + contstant.jwsKeyId + contstant.jweKeyId
          }
        }
    
        var req = https.request(
          APILink,
          requestHttpOptions,
          res => {
            res.setEncoding("utf8");
            res.on("data", data => {
              resolve({
                httpStatus: res.statusCode,
                httpResMessage: data
              });
            });
          }
        );
        req.on("error", e => {
          console.error(e);
          reject(e);
        });
        req.write(message);
        req.end();
      })
    }`;

    this.keystoreDataMethodCode = `
    async function keyStoreData() {
      // Setting Merchant Private and HSBC Public file location to the variables
      var privateKey = fs.readFileSync(contstant.privateKeyPath).toString();
      var certificate = fs.readFileSync(contstant.publicKeyPath).toString();
    
      // Creating a keystore
      keystore = await jose.JWK.createKeyStore();
    
      // declaring property object for Merchant Private Key
      var propsForPrivateKey = {
        kid: '0901',
        alg: 'RS256',
        format: 'compact'
      };
    
      // declaring property object for HSBC Public Key
      var propsForPublicKey = {
        kid: "0004",
        enc: "A128GCM",
        alg: "RSA-OAEP-256",
        format: "compact"
      }
    
      // Adding HSBC Public Key into the keystore array
      await keystore.add(certificate, "pem", propsForPublicKey).
        then(function (result) {
          key = result;
        });
    
      // Adding Merchant Private Key into the keystore array
      await keystore.add(privateKey, "pem", propsForPrivateKey).
        then(function (result) {
          key = result;
        });
    
      // Returning private key location, public key location and keystore
      var keyData = {
        keystore: keystore,
        privateKey: privateKey,
        certificate: certificate
      }
      return keyData
    }`;

    this.logMaintainFunctionMethodCode = `
    async function logMaintainFunction(payload, encyption, response, decryption, errorMsg, label) {
      const logger = winston.createLogger({
        format: combine(
          timestamp(),
          prettyPrint()
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: contstant.LogFilePath })
        ]
      });
      var time = new Date();
      var message = {
        operation: label,
        payload: payload,
        encryption: encyption,
        response: response,
        decryption: decryption,
        other: errorMsg
      }
      logger.log({
        level: 'info',
        message: message
      });
    }`;
    this.cleanObjectMethodCode = `
    async function cleanObject(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] == [] || obj[propName] == "") {
          delete obj[propName];
        }
      }
      return obj
    }`;

    this.callbackNotificationAPICode = `
    app.get("/CallbackNotification/:paymentStatus/:txnRefNo", async (req, res) => {
      if (req.params.txnRefNo != null && req.params.paymentStatus == "success") {
        res.json({
          title: "Acknowledgement received",
          txnRefNo: req.params.txnRefNo,
          paymentStatus: req.params.paymentStatus
        })
      }
      else if(req.params.txnRefNo != null && req.params.paymentStatus == "fail") {
        res.json({
          title: "Acknowledgement received",
          txnRefNo: req.params.txnRefNo,
          paymentStatus: req.params.paymentStatus
        })
      }
      else if(req.params.txnRefNo == null && req.params.paymentStatus == "success"){
        res.json({
          title: "Acknowledgement received",
          txnRefNo: "No is blank",
          paymentStatus: req.params.paymentStatus
        })
      }
      else if(req.params.txnRefNo == null && req.params.paymentStatus == "fail") {
        res.json({
          title: "Acknowledgement received",
          txnRefNo: "No is blank",
          paymentStatus: req.params.paymentStatus
        })
      }
      else if(req.params.txnRefNo == null && req.params.paymentStatus == null) {
        res.json({
          title: "Acknowledgement received",
          txnRefNo: "No is blank",
          paymentStatus: "Status is blank"
        })
      }
      else {
        res.json({
          title: "Acknowledgement received",
          txnRefNo: req.params.txnRefNo,
          paymentStatus: "Invalid Status"
        })
      }
    })`;
    this.constantFileCode = `
    module.exports = {
      privateKeyPath: "src/assets/Keys/MerchantKeys/merchant_private_key.key",
      publicKeyPath: "src/assets/Keys/HSBCLatestPublicKeys/hsbc_public_cert_dev_0004_pem.cer",
      LogFilePath: "LogFile/Wrapper.log",
      clientId: "8b915a4f5b5047f091f210e2232b5ced",
      clientSecret: "1bb456a541dc416dB6016B5F9583C606",
      merchant: "119619",
      jwsKeyId: "0901",
      jweKeyId: "0004"
    };`;
  }

  copyBtn(codeData) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = codeData;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
