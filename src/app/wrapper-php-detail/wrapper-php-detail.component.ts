import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-php-detail',
  templateUrl: './wrapper-php-detail.component.html',
  styleUrls: ['./wrapper-php-detail.component.css']
})
export class WrapperPhpDetailComponent implements OnInit {
  systemObject: string = '';
  paymentObject: string = '';
  customerObject: string = '';
  orderObject: string = '';
  otherObject: string = '';

  encryptPayloadMethodCode: string = '';
  callingApiCode: string = '';
  decryptResponseCode: string = '';
  newPaymentCode: string = '';
  paymentEnquiryCode: string = '';
  cancelPaymentCode: string = '';
  logMaintainCode: string = '';
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
    this.encryptPayloadMethodCode = `
    public function EncryptPayload(string $requestPayloadJSON): string {
      $key = JWKFactory::createFromKeyFile(__DIR__ . '\\Keys\\MerchantKeys\\merchant_private_key.key');
      $publicKey = JWKFactory::createFromKeyFile(__DIR__ . '\\Keys\\HSBCLatestPublicKeys\\hsbc_public_cert_dev_0004_der.cer');

      $jwsAlgorithmManager = new AlgorithmManager([new RS256()]);
      $jwsBuilder = new JWSBuilder($jwsAlgorithmManager);

      $jws = $jwsBuilder
      ->create()
      ->withPayload($requestPayloadJSON)
      ->addSignature($key, [
          'alg' => 'RS256',
          'kid' => '0901',
      ])
      ->build();
      $jwsSerializer = new JwsCompactSerializer();
      $jwsString = $jwsSerializer->serialize($jws, 0);

          // Init JWE algorithm
      $jweKeyEncryptionAlgorithmManager = new AlgorithmManager([
          new RSAOAEP256(),
      ]);

      // Init JWE encryption algorithm
      $jweContentEncryptionAlgorithmManager = new AlgorithmManager([
          new A128GCM(),
      ]);
      $compressionMethodManager = new CompressionMethodManager([
          new Deflate(),
      ]);

      // Build JWE object and encrypt the message by HSBC's public key
      $jweBuilder = new JWEBuilder(
          $jweKeyEncryptionAlgorithmManager,
          $jweContentEncryptionAlgorithmManager,
          $compressionMethodManager
      );

      $jwe = $jweBuilder
          ->create()
          ->withPayload($jwsString)
          ->withSharedProtectedHeader([
              'alg' => 'RSA-OAEP-256',
              'enc' => 'A128GCM',
              'kid' => '0004',
          ])
          ->addRecipient($publicKey)
          ->build();

          $jweSerializer = new JweCompactSerializer();
      $jweString = $jweSerializer->serialize($jwe, 0);
     
      return $jweString;
  }`;

    this.callingApiCode = `
    public function callingAPI(string $resoucePath,string $requestMsg): string {
      $curl = curl_init();
      curl_setopt(
          $curl,
          CURLOPT_URL, $resoucePath
      );
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
      curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($curl, CURLOPT_AUTOREFERER, 1);
      curl_setopt($curl, CURLOPT_POST, 1);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $requestMsg);
      curl_setopt($curl, CURLOPT_TIMEOUT, 30);
      curl_setopt($curl, CURLOPT_HEADER, 0);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      $header = [];
      $header[] = 'Content-Type: application/json';
      $header[] = 'Authorization: Basic WW91clVzZXJOYW1lOllvdXJQYXNzd29yZA==';
      $header[] = 'x-hsbc-client-id: 8b915a4f5b5047f091f210e2232b5ced';
      $header[] = 'x-hsbc-client-secret: 1bb456a541dc416dB6016B5F9583C606';
      $header[] = 'x-hsbc-msg-encrypt-id: 119619+0901+0004';
      curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
      $ResponseMessage = curl_exec($curl);
      if (curl_errno($curl)) {
          echo 'Errno' . curl_error($curl);
      }
      curl_close($curl);
      return $ResponseMessage;
  }`;

    this.decryptResponseCode = `
    public function DecryptResponse(string $EncryptedResponse) {
      $key = JWKFactory::createFromKeyFile(__DIR__ . '\\Keys\\MerchantKeys\\merchant_private_key.key');
      $publicKey = JWKFactory::createFromKeyFile(__DIR__ . '\\Keys\\HSBCLatestPublicKeys\\hsbc_public_cert_dev_0004_der.cer');
          // Decrypt JWE Message
      // Init JWE algorithm
      $jweKeyEncryptionAlgorithmManager = new AlgorithmManager([
          new RSAOAEP256(),
      ]);

      // Init JWE encryption algorithm
      $jweContentEncryptionAlgorithmManager = new AlgorithmManager([
          new A128GCM(),
      ]);

      $compressionMethodManager = new CompressionMethodManager([
          new Deflate(),
      ]);

      $jweDecrypter = new JWEDecrypter(
          $jweKeyEncryptionAlgorithmManager,
          $jweContentEncryptionAlgorithmManager,
          $compressionMethodManager
      );

      $jweSerializerManager = new JWESerializerManager([
          new JweCompactSerializer(),
      ]);

      $jweObject = $jweSerializerManager->unserialize($EncryptedResponse);
      $jweDecrypter->decryptUsingKey($jweObject, $key, 0);
      $jweDecyptedPayload = $jweObject->getPayload();

      // Get JWS Payload and verify signature
      // Init JWS algorithm
      $jwsAlgorithmManager = new AlgorithmManager([new RS256()]);
      $jwsVerifier = new JWSVerifier($jwsAlgorithmManager);
      $jwsSerializer = new JwsCompactSerializer();
      $jwsObject = $jwsSerializer->unserialize($jweDecyptedPayload);

      // the $isVeified indicates whether the signature is valid
      $isVerified = $jwsVerifier->verifyWithKey(
          $jwsObject,
          $publicKey,
          0
      );
      $jwsPayload = $jwsObject->getPayload();
      return $jwsPayload;
  }`;

  this.newPaymentCode = `
  public function newPayment($txnRef, $system, $payment, $merchant, $customer, $order, $other) {
    $requestPayload = (object)[
        'transaction' => $txnRef,
        'system' => $system,
        'payment' => $payment,
        'merchant' => $merchant,
        'customer' => $customer,
        'order' => $order,
        'other' => $other,
    ];

    if(sizeof((array)$requestPayload->customer) == 0) {
        unset($requestPayload->customer);
    }
    
    if(sizeof((array)$requestPayload->other) == 0) {
        unset($requestPayload->other);
    }

    $requestPayloadJSON = json_encode($requestPayload);

    $this->logMaintainFunction('**************************************** Payment Submit ***************************************************');
    $requestTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$requestTime);
    $this->logMaintainFunction('Payload : ');
    $this->logMaintainFunction(json_encode($requestPayload, JSON_PRETTY_PRINT));

    $requestMsg = $this->EncryptPayload($requestPayloadJSON);

    $encryptionTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$encryptionTime);
    $this->logMaintainFunction('Encrypted Message : ');
    $this->logMaintainFunction($requestMsg);

    $ResponseMessage = $this->callingAPI("https://devclustercmb.api.p2g.netd2.hsbc.com.hk/glcm-mobilecoll-mcin-ea-merchantservices-cert-proxy/v1/payment/pageRedirect", $requestMsg);

    $responseTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$responseTime);
    $this->logMaintainFunction('Response : ');
    $this->logMaintainFunction($ResponseMessage);

    if(json_decode($ResponseMessage) == null) {
        $DecrptedResponse = $this->DecryptResponse($ResponseMessage);
    }
    else {
        $DecrptedResponse = $ResponseMessage;
    }

    $decryptTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$decryptTime);
    $this->logMaintainFunction('Decrypted Message : ');
    $this->logMaintainFunction($DecrptedResponse);
    return $DecrptedResponse;
  }`;

  this.paymentEnquiryCode = `
  public function paymentEnquiry($txnRef, $merchant) {
    $requestPayload = [
        'merchant' => [
            'merId' => strval($merchant),
        ],
        'transaction' => [
            'txnRef' => strval($txnRef),
        ],
    ];

    $requestPayloadJSON = json_encode($requestPayload);

    $this->logMaintainFunction('**************************************** Payment Enquiry ***************************************************');
    $requestTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$requestTime);
    $this->logMaintainFunction('Payload : ');
    $this->logMaintainFunction(json_encode($requestPayload, JSON_PRETTY_PRINT));

    $requestMsg = $this->EncryptPayload($requestPayloadJSON);

    $encryptionTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$encryptionTime);
    $this->logMaintainFunction('Encrypted Message : ');
    $this->logMaintainFunction($requestMsg);

    $ResponseMessage = $this->callingAPI("https://devclustercmb.api.p2g.netd2.hsbc.com.hk/glcm-mobilecoll-mcin-ea-merchantservices-cert-proxy/v1/payment/enquiry", $requestMsg);

    $responseTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$responseTime);
    $this->logMaintainFunction('Response : ');
    $this->logMaintainFunction($ResponseMessage);

    $DecrptedResponse = $this->DecryptResponse($ResponseMessage);

    $decryptTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$decryptTime);
    $this->logMaintainFunction('Decrypted Message : ');
    $this->logMaintainFunction($DecrptedResponse);

    return $DecrptedResponse;
  }`;

  this.cancelPaymentCode = `
  public function paymentCancellation($refundNotificationURL, $txnRef, $rfdRef, $amount, $currency, $merId) {
    $requestPayload = [
        'system' => [
            'refundNotificationUrl' => $refundNotificationURL,
        ],
        'transaction' => [
            'txnRef' => strval($txnRef),
            'rfdRef' => $rfdRef,
            'amount' => (int)$amount,
            'currency' => $currency,
        ],
        'merchant' => [
            'merId' => strval($merId),
        ],
    ];

    $requestPayloadJSON = json_encode($requestPayload);

    $this->logMaintainFunction('**************************************** Payment Camcel and Refund ***************************************************');
    $requestTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$requestTime);
    $this->logMaintainFunction('Payload : ');
    $this->logMaintainFunction(json_encode($requestPayload, JSON_PRETTY_PRINT));

    $requestMsg = $this->EncryptPayload($requestPayloadJSON);

    $encryptionTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$encryptionTime);
    $this->logMaintainFunction('Encrypted Message : ');
    $this->logMaintainFunction($requestMsg);

    $ResponseMessage = $this->callingAPI("https://devclustercmb.api.p2g.netd2.hsbc.com.hk/glcm-mobilecoll-mcin-ea-merchantservices-cert-proxy/v1/payment/cancel", $requestMsg);

    $responseTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$responseTime);
    $this->logMaintainFunction('Response : ');
    $this->logMaintainFunction($ResponseMessage);

    $DecrptedResponse = $this->DecryptResponse($ResponseMessage);

    $decryptTime = date('Y/m/d H:i:s');
    $this->logMaintainFunction('Time : '.$decryptTime);
    $this->logMaintainFunction('Decrypted Message : ');
    $this->logMaintainFunction($DecrptedResponse);

    return $DecrptedResponse;
  }`;

  this.logMaintainCode = `
  public function logMaintainFunction(string $log_msg) {
    file_put_contents("LogFile/Wrapper.log", $log_msg . "\n", FILE_APPEND);
  }`;
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
