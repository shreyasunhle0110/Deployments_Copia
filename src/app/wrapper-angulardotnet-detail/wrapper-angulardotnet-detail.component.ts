import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-angulardotnet-detail',
  templateUrl: './wrapper-angulardotnet-detail.component.html',
  styleUrls: ['./wrapper-angulardotnet-detail.component.css']
})
export class WrapperAngulardotnetDetailComponent implements OnInit {
  systemObject: string = '';
  paymentObject: string = '';
  customerObject: string = '';
  orderObject: string = '';
  otherObject: string = '';

  paymentMethodCode: string = '';
  paymentEnquiryMethodCode: string = '';
  paymentCancellationMethodCode: string = '';
  callingAPICode: string = '';
  commonRepositoryCode: string = '';
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
      protectedvoidnewPayment(object sender, EventArgs e)
      {
        if (txtMerchantID.Text != ""&&txtSuccessUrl.Text != ""&&txtFailureUrl.Text != "")
          {
            PaymentPageRedirectDTOdto = newPaymentPageRedirectDTO();
            dto.transaction = new transaction();
            dto.system = new system();
            dto.payment = new payment();
            dto.merchant = new merchant();
            dto.customer = new customer();
            dto.order = new order();
            dto.other = new other();
            dto = newPayment(dto.transaction, dto.system, dto.payment, dto.merchant, dto.customer, dto.order, dto.other);

            HttpCookie cookie = newHttpCookie("txnRef");
            cookie.Value = dto.transaction.txnRef;
            Response.Cookies.Add(cookie);

            HttpCookie cookie1 = newHttpCookie("merId");
            cookie1.Value = dto.merchant.merId;
            Response.Cookies.Add(cookie1);

            HttpCookie cookie2 = newHttpCookie("amount");
            cookie2.Value = dto.payment.amount.ToString();
            Response.Cookies.Add(cookie2);

            Session["txnRef"] = dto.transaction.txnRef;
            Session["merId"] = dto.merchant.merId;

            Dictionary<string, object>returnDict = new Dictionary<string, object>();
            var json = newJavaScriptSerializer().Serialize(dto);

            // Build request payload
            varjsSerializer = newSystem.Web.Script.Serialization.JavaScriptSerializer();
            Dictionary<string, object>requestPayloadDict = (Dictionary<string, object>)jsSerializer.DeserializeObject(json);

            string requestPayload1 = JsonConvert.SerializeObject(requestPayloadDict);
            Console.WriteLine("Request JSON:" + requestPayload1);

            var o = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(requestPayload1);
            foreach (var item in o)
            {
              if (o.ContainsKey("other") == true)
              {
                if(o["other"]["udfs"].HasValues == false)
                {
                  o.Property("other").Remove();
                  break;
                }
              }
            }

            foreach (var item in o)
            {
              if (o.ContainsKey("customer") == true)
              {
                if (String.IsNullOrEmpty(o["customer"]["customer_firstname"].ToString()) && String.IsNullOrEmpty(o["customer"]["customer_lastname"].ToString()) &&String.IsNullOrEmpty(o["customer"]["customer_email"].ToString()) && String.IsNullOrEmpty(o["customer"]["customer_phone"].ToString()))
                {
                  o.Property("customer").Remove();
                  break;
                }
              }
            }

            stringnewJson = JsonConvert.SerializeObject(o);
            vardeserializedObject = JsonConvert.DeserializeObject<PaymentPageRedirectDTO>(newJson);
            varserializerSettings = newJsonSerializerSettings
            {
              NullValueHandling = NullValueHandling.Ignore,
              DefaultValueHandling = DefaultValueHandling.Ignore
            };
            varnewSerializedObject = JsonConvert.SerializeObject(deserializedObject, Formatting.Indented, newJsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });

            Console.WriteLine(newSerializedObject);
            stringrequestPayload = newSerializedObject;
            //string requestPayload = requestPayload1;
            CreateLogFiles("Payload: ", requestPayload);

            // sign and encrypt request payload
            stringencryptedrequestpayload = SignAndEncryptMessage(requestPayload);
            Console.WriteLine("request encrypted message:" + encryptedrequestpayload);

            CreateLogFiles("Encrypted Message: ", encryptedrequestpayload);

            // request dcms with encrypted payload. get encrypted response from hsbcdcms
            stringdcmsencryptedresponse = requestDCMS(ConstantValue.DCMS_URL + ConstantValue.DCMS_PAYMENT_REDIRECT_URL, encryptedrequestpayload, txtMerchantID.Text);
            Console.WriteLine("dcms response encrypted message:" + dcmsencryptedresponse);

            CreateLogFiles("Response: ", dcmsencryptedresponse.Substring(3));

            string str = dcmsencryptedresponse.Substring(0, 3);
            if (str != "200")
            {
              // decrypt and validate signature response
              stringdcmsresponse = DecryptAndValidateMessage(dcmsencryptedresponse);
              Console.WriteLine("dcms response message:" + dcmsresponse);

              CreateLogFiles("Decrypted Message: ", dcmsresponse);

              dynamic DecryptedData = Newtonsoft.Json.JsonConvert.DeserializeObject(dcmsresponse);
              stringredirectLink = "";
              foreach (var parentIteminDecryptedData.response)
              {
                if (parentItem.Value["redirectUrlLink"] != null)
                {
                  redirectLink = parentItem.Value["redirectLink"];
                  stringinc = "<HTML><script src='https://checkout.razorpay.com/v1/checkout.js'></script><script> ";
                  stringlst = "var options = " + redirectLink + @";
                  options.handler = function(response) {
                  window.location.replace('" + dto.system.redirectSuccessUrl + @"');
                }
              var rzp1 = new Razorpay(options); rzp1.open(); </script></HTML>";
              stringNewValue = inc + lst;
              this.Page.ClientScript.RegisterStartupScript(typeof(Page), "callfn", NewValue);
              break;
            }
            elseif (parentItem.Value["redirectLink"] != null)
            {
              redirectLink = parentItem.Value["redirectLink"];
              stringNewValue = "<HTML>" + redirectLink + "</HTML>";
              Response.Write(NewValue);
              this.Page.ClientScript.RegisterStartupScript(typeof(Page), "callfn", NewValue);
              break;
            }
            else
            {
                TextArea1.Visible = true;
                TextArea1.Value = parentItem.Value["sysMsg"];
                break;
            }
          }
        }
        else
        {
            TextArea1.Visible = true;
            TextArea1.Value = dcmsencryptedresponse.Substring(3);
        }
    }
    else
    {
      ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('Please enter all values')", true);
    }
  }`;
  
  this.paymentEnquiryMethodCode = `
    protectedvoidpaymentEnquiry(object sender, EventArgs e)
    {
      if(flag == "0")
      {
        if(txtMerchantID.Text != ""&&txtTransactionNo.Text != "")
        {
            flag = "1";
        }
      }
      if (flag == "1")
      {
        Dictionary<string, object>returnDict = new Dictionary<string, object>();
        txnRef = txtTransactionNo.Text;
        merId = txtMerchantID.Text;
        amount = txtAmount.Text;
        // Build request payload
        Dictionary<string, object>requestPayloadDict = paymentEnquiry(txnRef, merId);
        stringrequestPayload = JsonConvert.SerializeObject(requestPayloadDict, Formatting.Indented);
        Console.WriteLine("Request JSON:" + requestPayload);
        CreateLogFiles("Payload: ", requestPayload);

        // Sign and encrypt request payload
        stringencryptedRequestPayload = SignAndEncryptMessage(requestPayload);
        Console.WriteLine("Request Encrypted Message:" + encryptedRequestPayload);
        CreateLogFiles("Encrypted Message: ", encryptedRequestPayload); 

        // Request DCMS with encrypted payload. Get encrypted response from HSBC DCMS
        stringdcmsEncryptedResponse = requestDCMS(ConstantValue.DCMS_URL + ConstantValue.DCMS_PAYMENT_ENQUIRY_URL, encryptedRequestPayload, merId);
        Console.WriteLine("Dcms Response Encrypted Message:" + dcmsEncryptedResponse);
        CreateLogFiles("Response: ", dcmsEncryptedResponse);

        // Decrypt and validate signature response
        stringdcmsResponse = DecryptAndValidateMessage(dcmsEncryptedResponse);
        Console.WriteLine("Dcms Response Message:" + dcmsResponse);
        CreateLogFiles("Decrypted Message: ", dcmsResponse);

        TextArea1.InnerText = dcmsResponse;
        returnDict.Add("requestJSON", JsonConvert.SerializeObject(requestPayloadDict, Formatting.Indented));
        returnDict.Add("encryptedRequestMessage", encryptedRequestPayload);
        returnDict.Add("dcmsEncryptedResponse", dcmsEncryptedResponse);
        returnDict.Add("dcmsResponse", dcmsResponse);
      }
      else
      {
          TextArea1.Value = "Some Error occured";
      }
    }

    publicstatic Dictionary<string, object>paymentEnquiry(stringtxnRef, stringmerId)
    {
      Dictionary<string, object>requestPayloadDict = new Dictionary<string, object>();
      Dictionary<string, object>transactionDict = new Dictionary<string, object>();
      transactionDict.Add("txnRef", txnRef);             // Unique ID referred to a specific transaction
      requestPayloadDict.Add("transaction", transactionDict);
      Dictionary<string, object>merchantDict = new Dictionary<string, object>();
      merchantDict.Add("merId", merId);
      requestPayloadDict.Add("merchant", merchantDict);
      returnrequestPayloadDict;
    }`;

    this.paymentCancellationMethodCode = `
    protectedvoidpaymentCancellation(object sender, EventArgs e)
    {
      if (flag == "0")
      {
        if (txtMerchantID.Text != ""&&txtTransactionNo.Text != "")
        {
          flag = "1";
        }
      }
      if (flag == "1")
      {
        txnRef = txtTransactionNo.Text;
        merId = txtMerchantID.Text;
        amount = txtAmount.Text;
        Dictionary<string, object>returnDict = new Dictionary<string, object>();

        // Build request payload
        Dictionary<string, object>requestPayloadDict = paymentCancellation(txnRef, merId, amount);
        stringrequestPayload = JsonConvert.SerializeObject(requestPayloadDict, Formatting.Indented);
        Console.WriteLine("Request JSON:" + requestPayload);
        CreateLogFiles("Payload: ", requestPayload);

        // Sign and encrypt request payload
        stringencryptedRequestPayload = SignAndEncryptMessage(requestPayload);
        Console.WriteLine("Request Encrypted Message:" + encryptedRequestPayload);
        CreateLogFiles("Encrypted Message: ", encryptedRequestPayload);

        // Request DCMS with encrypted payload. Get encrypted response from HSBC DCMS
        stringdcmsEncryptedResponse = requestDCMS(ConstantValue.DCMS_URL + ConstantValue.DCMS_PAYMENT_CANCEL, encryptedRequestPayload, merId);
        Console.WriteLine("Dcms Response Encrypted Message:" + dcmsEncryptedResponse);
        CreateLogFiles("Response: ", dcmsEncryptedResponse);

        // Decrypt and validate signature response
        stringdcmsResponse = DecryptAndValidateMessage(dcmsEncryptedResponse);
        Console.WriteLine("Dcms Response Message:" + dcmsResponse);
        CreateLogFiles("Decrypted Message: ", dcmsResponse);

        TextArea1.InnerText = dcmsResponse;
        returnDict.Add("requestJSON", JsonConvert.SerializeObject(requestPayloadDict, Formatting.Indented));
        returnDict.Add("encryptedRequestMessage", encryptedRequestPayload);
        returnDict.Add("dcmsEncryptedResponse", dcmsEncryptedResponse);
        returnDict.Add("dcmsResponse", dcmsResponse);
      }
      else
      {
        TextArea1.Value = "Some Error occured";
      }
    }

    publicstatic Dictionary<string, object>paymentCancellation(stringtxnRef, stringmerId, string amount)
    {
      Dictionary<string, object>requestPayloadDict = new Dictionary<string, object>();

      Dictionary<string, object>systemDict = new Dictionary<string, object>();
      systemDict.Add("refundNotificationUrl", "https://www.example.com/refundNotification");
      requestPayloadDict.Add("system", systemDict);

      Dictionary<string, object>transactionDict = new Dictionary<string, object>();
      transactionDict.Add("txnRef", txnRef);             // Unique ID referred to a specific transaction
      transactionDict.Add("rfdRef", "RFD" + DateTime.Now.ToString("HHmmss"));
      transactionDict.Add("amount", Convert.ToInt32(amount));
      transactionDict.Add("currency", "INR");
      requestPayloadDict.Add("transaction", transactionDict);

      Dictionary<string, object>merchantDict = new Dictionary<string, object>();
      merchantDict.Add("merId", merId);
      requestPayloadDict.Add("merchant", merchantDict);

      returnrequestPayloadDict;
    }`;

    this.callingAPICode = `
    protectedvoidPage_Load(object sender, EventArgs e)
    {
      stringtxnRefNo = (Request.QueryString["txnRefNo"]);
      stringpaymentStatus = (Request.QueryString["paymentStatus"]);
      varjsonString = AsyncMethod(paymentStatus, txnRefNo);
      Response.Write(jsonString);
      Response.End();
    }
    publicasyncSystem.Threading.Tasks.Task<string>AsyncMethod(stringpaymentStatus, stringtxnRefNo)
    {
      stringjsonString = "";
      if (txnRefNo != null&&paymentStatus == "success")
      {
        jsonString = "{\"title\":\" Acknowledgement received \",\"txnRefNo\":\"" + txnRefNo + "\",\"paymentStatus\":\"" + paymentStatus + "\"}";
      }
      elseif (txnRefNo != null&&paymentStatus == "fail")
      {
        jsonString = "{\"title\":\" Acknowledgement received \",\"txnRefNo\":\"" + txnRefNo + "\",\"paymentStatus\":\"" + paymentStatus + "\"}";
      }
      elseif (txnRefNo == null&&paymentStatus == "success")
      {
        jsonString = "{\"title\":\" Acknowledgement received \",\"txnRefNo\":\" Transaction No is blank \",\"paymentStatus\":\"" + paymentStatus + "\"}";
      }
      elseif (txnRefNo == null&&paymentStatus == "fail")
      {
        jsonString = "{\"title\":\" Acknowledgement received \",\"txnRefNo\":\" Transaction No is blank \",\"paymentStatus\":\"" + paymentStatus + "\"}";
      }
      elseif (txnRefNo == null&&paymentStatus == null)
      {
        jsonString = "{\"title\":\" Acknowledgement received \",\"txnRefNo\":\" Transaction No is blank \",\"paymentStatus\":\" Status is blank \"}";
      }
      else
      {
        jsonString = "{\"title\":\" Acknowledgement received \",\"txnRefNo\":\"" + txnRefNo + "\",\"paymentStatus\":\" Invalid Status \"}";
      }
      returnjsonString;
    }`;

    this.commonRepositoryCode = `
    publicvoidCreateLogFiles(string Message, string Text)
    {
    string path = Server.MapPath("~/ErrorLog/ErrorLog.txt");
    if (!File.Exists(path))
    {
      using (StreamWriter writer = File.CreateText(path))
      {
        string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyyhh:mm:sstt"));
        writer.WriteLine(message);
        writer.WriteLine(Message);
        writer.WriteLine(Text);
        writer.WriteLine("*********************************************************************************************************************************************************************************************");
        writer.Close();
      }
    }
    else
    {
      using (StreamWriter writer = File.AppendText(path))
      {
        string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyyhh:mm:sstt"));
        writer.WriteLine(message);
        writer.WriteLine(Message);
        writer.WriteLine(Text);
        writer.WriteLine("*********************************************************************************************************************************************************************************************");
        writer.Close();
      }
    }
  }

  publicstaticstringrequestDCMS(stringresourcePath, stringrequestMsg, string MERCHANT_ID)
  {
    stringresponseString = "";
    var data = Encoding.ASCII.GetBytes(requestMsg);
    try
    {
      using (HttpClienthttpClient = newHttpClient())
      {
        stringauthorizationStr = "Basic WW91clVzZXJOYW1lOllvdXJQYXNzd29yZA==";

        httpClient.DefaultRequestHeaders.Add("Authorization", authorizationStr);
        httpClient.DefaultRequestHeaders.Add("x-hsbc-client-id", ConstantValue.API_CLIENT_ID);
        httpClient.DefaultRequestHeaders.Add("x-hsbc-client-secret", ConstantValue.API_CLIENT_SECRET);
        httpClient.DefaultRequestHeaders.Add("x-hsbc-msg-encrypt-id", MERCHANT_ID + "+" + ConstantValue.MERCHNAT_KEY_VERSION + "+" + ConstantValue.KEY_VERSION);

        HttpResponseMessage message = null;
        using (Stream dataStream = newMemoryStream(data ?? newbyte[0]))
        {
          using (HttpContent content = newStreamContent(dataStream))
          {
            content.Headers.Add("Content-Type", "application/json");
            var task = httpClient.PostAsync(resourcePath, content);
            message = task.Result;
          }
        }
        if (message != null)
        {
          using (message)
          {
            if (message.StatusCode.ToString() == "OK")
            {
              responseString = message.Content.ReadAsStringAsync().Result;
            }
            else
            {
              responseString = "200" + message.Content.ReadAsStringAsync().Result;
            }
          }
        }
      }
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
    }
    returnresponseString;
  }

  publicstaticclassConstantValue
  {
    // DCMS API URL
    publicstaticstring DCMS_URL = "https://devclustercmb.api.p2g.netd2.hsbc.com.hk/glcm-mobilecoll-mcin-ea-merchantservices-cert-proxy/v1";
    publicstaticstring DCMS_PAYMENT_REDIRECT_URL = "/payment/pageRedirect";
    publicstaticstring DCMS_PAYMENT_ENQUIRY_URL = "/payment/enquiry";

    // certificate version
    publicstaticstring MERCHNAT_KEY_VERSION = "0901";
    publicstaticstring KEY_VERSION = "0004";

    // certificate path
    publicstaticstring MERCHNAT_PRIVATE_KEY_PATH = "D:/Projects/Wrapper .Net Project/OmniWrapperCode/OmniWrapperCode/Keys/ConvertedKeys/merchant_private.p12";
    publicstaticstring MERCHNAT_PRIVATE_KEY_PASSWORD = "Wrapper@2021";
    publicstaticstring PUBLIC_KEY_PATH = "D:/Projects/Wrapper .Net Project/OmniWrapperCode/OmniWrapperCode/Keys/ConvertedKeys/hsbc_public_cert_dev_0004_pem.cer";

    // API Secret
    publicstaticstring API_CLIENT_ID = "8b915a4f5b5047f091f210e2232b5ced";
    publicstaticstring API_CLIENT_SECRET = "1bb456a541dc416dB6016B5F9583C606";

  }

  publicstaticstringSignAndEncryptMessage(string message)
  {
    // Sign the message by merchant private key

    varprivateKey = new X509Certificate2(ConstantValue.MERCHNAT_PRIVATE_KEY_PATH, ConstantValue.MERCHNAT_PRIVATE_KEY_PASSWORD).GetRSAPrivateKey();
    varjwsHeader = new Dictionary<string, object>()
    {
      { "kid", ConstantValue.MERCHNAT_KEY_VERSION},
      { "alg", "RS256"}
    };
    stringjwsStr = Jose.JWT.Encode(message, privateKey, JwsAlgorithm.RS256, extraHeaders: jwsHeader);
    // Encrypt the message by HSBC public key

    varpublicKey = new X509Certificate2(ConstantValue.PUBLIC_KEY_PATH).GetRSAPublicKey();
    varjweHeader = new Dictionary<string, object>()
    {
      {"kid", ConstantValue.KEY_VERSION}//,
    };
    stringjweStr = Jose.JWT.Encode(jwsStr, publicKey, JweAlgorithm.RSA_OAEP_256, JweEncryption.A128GCM, extraHeaders: jweHeader);
    returnjweStr;
  }

  publicstaticstringDecryptAndValidateMessage(string message)
  {
    //Decrypt message by merchant private key
    varprivateKey = new X509Certificate2(ConstantValue.MERCHNAT_PRIVATE_KEY_PATH, ConstantValue.MERCHNAT_PRIVATE_KEY_PASSWORD).GetRSAPrivateKey();
    stringdecryptedJweObject = JWT.Decode(message, privateKey);

    // Validate HSBC signature and extract response Payload
    varpublicKey = new X509Certificate2(ConstantValue.PUBLIC_KEY_PATH).GetRSAPublicKey();
    stringjwsPayload = JWT.Decode(decryptedJweObject, publicKey);

    returnjwsPayload;
  }

  publicstaticstringrequestDCMS(stringresourcePath, stringrequestMsg, string MERCHANT_ID)
  {
    stringresponseString = "";
    var data = Encoding.ASCII.GetBytes(requestMsg);
    try
    {
      using (HttpClienthttpClient = newHttpClient())
      {
        stringauthorizationStr = "Basic WW91clVzZXJOYW1lOllvdXJQYXNzd29yZA==";

        httpClient.DefaultRequestHeaders.Add("Authorization", authorizationStr);
        httpClient.DefaultRequestHeaders.Add("x-hsbc-client-id", ConstantValue.API_CLIENT_ID);
        httpClient.DefaultRequestHeaders.Add("x-hsbc-client-secret", ConstantValue.API_CLIENT_SECRET);
        httpClient.DefaultRequestHeaders.Add("x-hsbc-msg-encrypt-id", MERCHANT_ID + "+" + ConstantValue.MERCHNAT_KEY_VERSION + "+" + ConstantValue.KEY_VERSION);

        HttpResponseMessage message = null;
        using (Stream dataStream = newMemoryStream(data ?? newbyte[0]))
        {
          using (HttpContent content = newStreamContent(dataStream))
          {
            content.Headers.Add("Content-Type", "application/json");
            var task = httpClient.PostAsync(resourcePath, content);
            message = task.Result;
          }
        }
        if (message != null)
        {
          using (message)
          {
            if (message.StatusCode.ToString() == "OK")
            {
              responseString = message.Content.ReadAsStringAsync().Result;
            }
            else
            {
              responseString = "200" + message.Content.ReadAsStringAsync().Result;
            }
          }
        }
      }
    }
    catch (Exception ex)
    {
      Console.WriteLine(ex.Message);
    }
    returnresponseString;
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
