import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-java-detail',
  templateUrl: './wrapper-java-detail.component.html',
  styleUrls: ['./wrapper-java-detail.component.css']
})
export class WrapperJavaDetailComponent implements OnInit {
  systemObject: string = '';
  paymentObject: string = '';
  customerObject: string = '';
  orderObject: string = '';
  otherObject: string = '';
  paymentMethodCode: string = '';
  paymentEnquiryMethodCode: string = '';
  paymentCancellationMethodCode: string = '';
  webXmlCode: string = '';
  commonMethodCode: string = '';
  httpUtilCode: string = '';
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
    public static Map<String, Object> newPayment(Map<String, String> transaction,
			Map<String, String> system, Map<String, Object> payment,
			Map<String, Object> merchant, Map<String, Object> customer,
			Map<String, Object> order, Map<String, Object> other, String jsonArray,
			String MerchantID, String otherArray, String offerArray, String description, String totalCost) {

		HashMap<String, Object> paymentRedirectPayloadMap = new HashMap<String, Object>();

		paymentRedirectPayloadMap.put("transaction", transaction);

		paymentRedirectPayloadMap.put("system", system);

//		paymentRedirectPayloadMap.put("payment", payment);

		paymentRedirectPayloadMap.put("merchant", merchant);

		paymentRedirectPayloadMap.put("customer", customer);

//		paymentRedirectPayloadMap.put("order", requestPayloadMap5);

//		paymentRedirectPayloadMap.put("other", otherArray);
		String requestPayloadJSONString = "";
		
		while (paymentRedirectPayloadMap.values().remove(""));

		if(customer.containsKey("customer_firstname"))
		{
			String customer_firstname = (String)customer.get("customer_firstname");
			String customer_lastname = (String)customer.get("customer_lastname");
			String customer_email = (String)customer.get("customer_email");
			String customer_phone = (String)customer.get("customer_phone");
			
			if(customer_firstname == "" && customer_lastname == "" && customer_email == "" && customer_phone == "")			
			{
				paymentRedirectPayloadMap.remove("customer");
			}
			else {
			if(customer_firstname == "")			
			{
				customer.remove("customer_firstname");
			}
			if(customer_lastname == "")			
			{
				customer.remove("customer_lastname");
			}
			if(customer_email == "")			
			{
				customer.remove("customer_email");
			}
			if(customer_phone == "")			
			{
				customer.remove("customer_phone");
			}
			}
		}
		
		System.out.println("paymentRedirectPayloadMap : " + paymentRedirectPayloadMap);
			
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss+05:30");
		Calendar c = Calendar.getInstance();
		c.setTime(new Date()); // Using today's date
		c.add(Calendar.DATE, 1); // Adding 5 days
		String output = sdf.format(c.getTime());
		
		try {
			requestPayloadJSONString = objectMapper.writeValueAsString(paymentRedirectPayloadMap);
			requestPayloadJSONString = requestPayloadJSONString.substring(0, requestPayloadJSONString.length() - 1);
			if(offerArray!= "" && otherArray!= "") {
				requestPayloadJSONString = requestPayloadJSONString + ",\"order\": {\r\n"
						+"\"description\":\"" + description + "\",\r\n"
						+"\"descriptions\":" + jsonArray + "},"
						
						+"\"payment\": {\r\n"
						+"\"country\":\"IN\",\r\n"
						+"\"payment_option\":\"all\",\r\n"
						+"\"currency\":\"INR\",\r\n"
						+"\"expiry\":\""+output+"\",\r\n"
						+"\"amount\":" + Integer.parseInt(totalCost) + ",\r\n"
						+"\"offers\":" + offerArray + "},"
						
						+"\"other\": {\r\n"
						
						+"\"udfs\":" + otherArray + "}}";
			}
			else if (otherArray == "" && offerArray !="")
			{
				requestPayloadJSONString = requestPayloadJSONString + ",\"order\": {\r\n"
						+"\"description\":\"" + description + "\",\r\n"
						+"\"descriptions\":" + jsonArray + "},"
						
						+"\"payment\": {\r\n"
						+"\"country\":\"IN\",\r\n"
						+"\"payment_option\":\"all\",\r\n"
						+"\"currency\":\"INR\",\r\n"
						+"\"expiry\":\""+output+"\",\r\n"
						+"\"amount\":" + Integer.parseInt(totalCost) + ",\r\n"
						+"\"offers\":" + offerArray + "}"
						
						+"}";
			}
			else if(offerArray == "" && otherArray!= "") {
				requestPayloadJSONString = requestPayloadJSONString + ",\"order\": {\r\n"
						+"\"description\":\"" + description + "\",\r\n"
						+"\"descriptions\":" + jsonArray + "},"
						
						+"\"payment\": {\r\n"
						+"\"country\":\"IN\",\r\n"
						+"\"payment_option\":\"all\",\r\n"
						+"\"currency\":\"INR\",\r\n"
						+"\"expiry\":\""+output+"\",\r\n"
						+"\"amount\":" + Integer.parseInt(totalCost) + ",\r\n"
						+ "},"
						
						+"\"other\": {\r\n"
						
						+"\"udfs\":" + otherArray + "}}";
			}
			else {
				requestPayloadJSONString = requestPayloadJSONString + ",\"order\": {\r\n"
						+"\"description\":\"" + description + "\",\r\n"
						+"\"descriptions\":" + jsonArray + "},"
						
						+"\"payment\": {\r\n"
						+"\"country\":\"IN\",\r\n"
						+"\"payment_option\":\"all\",\r\n"
						+"\"currency\":\"INR\",\r\n"
						+"\"expiry\":\""+output+"\",\r\n"
						+"\"amount\":" + Integer.parseInt(totalCost) + "\r\n"
						+"}}";
			}
			
			System.out.println("Final Payload : " + requestPayloadJSONString);
			
			
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Map<String, Object> resMap = new HashMap<String, Object>();

		String requestMessage = "";
		try {
			requestMessage = encryptAndSignMessage(requestPayloadJSONString);
			resMap.put("requestMessage", requestMessage);
			System.out.println("encryptAndSignMessage: " + requestMessage);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// Call HSBC Omni Collection payment redirect services
		String hsbcResponseMessage = "";
		try {
			hsbcResponseMessage = HttpUtil.doPost(
					Constant.HSBC_OMNI_API_BASE_URL + Constant.HSBC_OMNI_PAYMENT_REDIRECT_ENDPOINT, requestMessage,
					MerchantID);
			resMap.put("hsbcResponseMessage", hsbcResponseMessage);
			System.out.println("hsbcResponseMessage: " + hsbcResponseMessage.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// Decrypt and verify HSBC response
		String hsbcResponseJSON = "";
		try {
			hsbcResponseJSON = decryptAndVerifyMessage(hsbcResponseMessage);
			resMap.put("hsbcResponseJSON", hsbcResponseJSON);
			System.out.println("hsbcResponseJSON: " + hsbcResponseJSON.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Gson gson = new Gson();

		DeserialisedData jsonArray1 = gson.fromJson(hsbcResponseJSON.toString(), DeserialisedData.class);

		Response1 response = jsonArray1.getResponse();

		ResponseSystem system1 = response.getSystem();

		String redirectUrlLink = system1.getRedirectUrlLink();
		String redirectLink = system1.getRedirectLink();
		try {
			if (redirectLink != null) {
				if (redirectUrlLink != null) {
					String redirectSuccessUrl = (String)system.get("redirectSuccessUrl");
					String inc = "<script src='https://checkout.razorpay.com/v1/checkout.js'></script><script> ";
					String lst = "var options = " + redirectLink + ";\n"+
                            "options.handler = function(response) {\n"+
                            "window.location.replace('" + redirectSuccessUrl + "');\n"+
                                "}\n" +
                            "var rzp1 = new Razorpay(options); rzp1.open(); </script>";
					redirectLink = inc + lst;
				}

				File htmlTemplateFile = new File("D:/WrapperWorkspace/OmniWrapper/src/main/webapp/Redirect.html");
				String htmlString = FileUtils.readFileToString(htmlTemplateFile);
				htmlString = htmlString.replace("$html", redirectLink);
				File newHtmlFile = new File("D:/WrapperWorkspace/OmniWrapper/src/main/webapp/new.html");
				FileUtils.writeStringToFile(newHtmlFile, htmlString);
				Runtime rTime = Runtime.getRuntime();
				String browser = "C:/Program Files/Google/Chrome/Application/chrome.exe ";
				Process pc = rTime.exec(browser + newHtmlFile);
				pc.waitFor();

				System.out.println("redirectLink: " + redirectLink);
			} else {
				System.out.println("Response Message: " + hsbcResponseJSON);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return resMap;
  }`;

    this.paymentEnquiryMethodCode = `
  public String paymentEnquiry() throws Exception {

		// Map<String, Object> resMap = new HashMap<String, Object>();

		// Build payment redirect request payload

		Map<String, Object> requestPayloadMap = buildPaymentEnquiryPayload();
		String requestPayloadJSONString = objectMapper.writeValueAsString(requestPayloadMap);
		// resMap.put("requestJSON", requestPayloadJSONString);
		System.out.println("buildPaymentRedirectPayload: " + requestPayloadJSONString.toString());

		// Encrypt and sign request payload
		String requestMessage = EncryptionActivity.encryptAndSignMessage(requestPayloadJSONString);
		// resMap.put("requestMessage", requestMessage);
		System.out.println("encryptAndSignMessage: " + requestMessage);

		// Call HSBC Omni Collection payment redirect services
		String hsbcResponseMessage = HttpUtil.doPost(
				Constant.OMNI_API_BASE_URL + Constant.OMNI_PAYMENT_ENQUIRY_ENDPOINT, requestMessage,
				merchantId);
		// resMap.put("hsbcResponseMessage", hsbcResponseMessage);
		System.out.println("hsbcResponseMessage: " + hsbcResponseMessage.toString());

		// Decrypt and verify HSBC response
		String hsbcResponseJSON = EncryptionActivity.decryptAndVerifyMessage(hsbcResponseMessage);
		// resMap.put("hsbcResponseJSON", hsbcResponseJSON);
		System.out.println("hsbcResponseJSON: " + hsbcResponseJSON.toString());

		return hsbcResponseJSON;
	}

	public Map<String, Object> buildPaymentEnquiryPayload() throws Exception {
		Map<String, Object> paymentEnquiryPayloadMap = new HashMap<String, Object>();

		Map<String, Object> transactionMap = new HashMap<>();
		transactionMap.put("txnRef", txnNo); // Unique transaction ID assigned by merchant * No duplicate
												// Transaction Reference is allowed
		paymentEnquiryPayloadMap.put("transaction", transactionMap);

		Map<String, Object> merchantMap = new HashMap<>();
		merchantMap.put("merId", merchantId); // Merchant ID which is assigned by HSBC
		paymentEnquiryPayloadMap.put("merchant", merchantMap);

		return paymentEnquiryPayloadMap;
  }`;
  
  this.paymentCancellationMethodCode = `
  public String paymentCancellation() throws Exception {

    //		Map<String, Object> resMap = new HashMap<String, Object>();
    
        // Build payment redirect request payload
    
        Map<String, Object> requestPayloadMap = buildPaymentCancelEnquiryPayload();
        String requestPayloadJSONString = objectMapper.writeValueAsString(requestPayloadMap);
    //		resMap.put("requestJSON", requestPayloadJSONString);
        System.out.println("buildPaymentRedirectPayload: " + requestPayloadJSONString.toString());
    
        // Encrypt and sign request payload
        String requestMessage = EncryptionActivity.encryptAndSignMessage(requestPayloadJSONString);
    //		resMap.put("requestMessage", requestMessage);
        System.out.println("encryptAndSignMessage: " + requestMessage);
    
        // Call HSBC Omni Collection payment redirect services
        String hsbcResponseMessage = HttpUtil.doPost(
            Constant.OMNI_API_BASE_URL + Constant.OMNI_PAYMENT_PAYMENT_CANCEL_ENDPOINT, requestMessage,
            merchantId);
    //		resMap.put("hsbcResponseMessage", hsbcResponseMessage);
        System.out.println("hsbcResponseMessage: " + hsbcResponseMessage.toString());
    
        // Decrypt and verify HSBC response
        String hsbcResponseJSON = EncryptionActivity.decryptAndVerifyMessage(hsbcResponseMessage);
    //		resMap.put("hsbcResponseJSON", hsbcResponseJSON);
        System.out.println("hsbcResponseJSON: " + hsbcResponseJSON.toString());
    
        return hsbcResponseJSON;
      }
    
      public Map<String, Object> buildPaymentCancelEnquiryPayload() throws Exception {
    
        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("HHmmss");
        String strDate = dateFormat.format(date);
    
        Map<String, Object> paymentEnquiryPayloadMap = new HashMap<String, Object>();
    
        Map<String, Object> systemMap = new HashMap<>();
        systemMap.put("refundNotificationUrl", "https://www.example.com/refundNotification"); // Merchant ID which is
                                                    // assigned by HSBC
        paymentEnquiryPayloadMap.put("system", systemMap);
    
        Map<String, Object> transactionMap = new HashMap<>();
        transactionMap.put("txnRef", txnNo); // Unique transaction ID assigned by merchant * No duplicate
                            // Transaction Reference is allowed
        transactionMap.put("rfdRef", "RFD" + strDate);
        transactionMap.put("amount", Integer.parseInt(totalCost));
        transactionMap.put("currency", "INR");
        paymentEnquiryPayloadMap.put("transaction", transactionMap);
    
        Map<String, Object> merchantMap = new HashMap<>();
        merchantMap.put("merId", merchantId); // Merchant ID which is assigned by HSBC
        paymentEnquiryPayloadMap.put("merchant", merchantMap);
    
        return paymentEnquiryPayloadMap;
      }`;

      this.webXmlCode = `
      <context-param>
      <param-name>log4j-config-location</param-name>
      <param-value>WEB-INF/log4j.properties</param-value>
      </context-param>`;

      this.commonMethodCode = `
      public static String encryptAndSignMessage(String message) throws Exception {
        // Get merchant private Key
        PrivateKey merchantPrivateKey = KeyProviderUtil.getMerchantPrivateKey();
        // Get HSBC public Key
        RSAPublicKey HSBCPubicKey = KeyProviderUtil.getHSBCPublicKey();
    
        // Build JWS Object
        Payload jwspayload = new Payload(message);
        JWSHeader jwsheader = new JWSHeader.Builder(JWSAlgorithm.RS256).keyID(Constant.MERCHANT_PRIVATEKEY_VERSION)
            .build();
        JWSObject jwsObject = new JWSObject(jwsheader, jwspayload);
    
        // Sign the JWS using merchant's private key
        JWSSigner signer = new RSASSASigner(merchantPrivateKey);
        jwsObject.sign(signer);
    
        // Build JWE Object
        Payload jwepayload = new Payload(jwsObject.serialize());
        System.out.println("SignMessage: " + jwepayload.toString());
        JWEHeader jweheader = new JWEHeader.Builder(JWEAlgorithm.RSA_OAEP_256, EncryptionMethod.A128GCM)
            .keyID(Constant.HSBC_PUBLICKEY__VERSION).build();
        JWEObject jweObject = new JWEObject(jweheader, jwepayload);
    
        // Encrypt the JWE using HSBC public Key
        JWEEncrypter encrypter = new RSAEncrypter(HSBCPubicKey);
        jweObject.encrypt(encrypter);
        String resStr = jweObject.serialize();
    
        return resStr;
      }
    
      public static String decryptAndVerifyMessage(String message) throws Exception {
        // Get merchant private Key
        PrivateKey merchantPrivateKey = KeyProviderUtil.getMerchantPrivateKey();
        // Get HSBC Pubic Key
        RSAPublicKey HSBCPubicKey = KeyProviderUtil.getHSBCPublicKey();
    
        // Parse JWE Object
        JWEObject jweObject = JWEObject.parse(message);
    
        // Decrypt JWE object using merchant's private key
        JWEDecrypter decrypter = new RSADecrypter(merchantPrivateKey);
        jweObject.decrypt(decrypter);
    
        // Parse JWS Object from JWE payload
        JWSObject jwsObject = JWSObject.parse(jweObject.getPayload().toString());
    
        // Verify HSBC signature using HSBC public Key
        boolean isSinatureValid = jwsObject.verify(new RSASSAVerifier(HSBCPubicKey));
    
        System.out.println("Signature verification result : " + isSinatureValid);
    
        String jwsPayload = jwsObject.getPayload().toString();
        return jwsPayload;
      }
    
    publicstatic PrivateKey getprivate(){
      InputStream cert=null;
      try {
        KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
        keystore.load(null, null);
      } catch (KeyStoreException e) {
        e.printStackTrace();
      } catch (CertificateException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      } catch (NoSuchAlgorithmException e) {
        e.printStackTrace();
      }return (PrivateKey) cert;
    }
    
        publicstatic PrivateKey getMerchantPrivateKey() throws Exception {
          InputStream certFis = null;
          try {
            Resource resource = new ClassPathResource(Constant.MERCHANT_PRIVATEKEY_PATH);
            File file = new File(Constant.MERCHANT_PRIVATEKEY_PATH);
            
            KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
            try (InputStream in = new FileInputStream(Constant.MERCHANT_PRIVATEKEY_PATH)) {
            keystore.load(in, Constant.MERCHANT_PRIVATEKEY_KEYSTORE_PASSWORD.toCharArray());
              }
            return (PrivateKey) keystore.getKey(Constant.MERCHANT_PRIVATEKEY_KEYSTORE_ALIAS, Constant.MERCHANT_PRIVATEKEY_KEYSTORE_PASSWORD.toCharArray());
          } catch (Exception e) {
            throwe;
          } finally {
            if (null != certFis) {
              certFis.close();
            }
          }
      }
    
    publicstatic RSAPublicKey getHSBCPublicKey() throws Exception {
        InputStream certFis = null;
        try {
          FileInputStream fis = new FileInputStream(Constant.HSBC_PUBLICKEY_PATH);
          CertificateFactory cf = CertificateFactory.getInstance("X.509");
          Certificate cert = cf.generateCertificate(fis);
          return (RSAPublicKey) cert.getPublicKey();
        } catch (Exception e) {
          throwe;
        } finally {
          if (null != certFis) {
            certFis.close();
          }
        }
      }`;

      this.httpUtilCode = `
      publicclass HttpUtil {

        privatestaticfinalintTIME_OUT = 300000;
        privatestatic PoolingHttpClientConnectionManager poolingHttpClientConnectionManager = null;
      
        static {
          SSLConnectionSocketFactory sslConnectionSocketFactory;
          try {
            sslConnectionSocketFactory = new SSLConnectionSocketFactory(SSLContexts.custom().build(),
                new String[] { "TLSv1.2" }, null, SSLConnectionSocketFactory.getDefaultHostnameVerifier());
            PoolingHttpClientConnectionManager clientConnectionManager = new PoolingHttpClientConnectionManager(
                RegistryBuilder.<ConnectionSocketFactory>create()
                    .register("http", PlainConnectionSocketFactory.getSocketFactory())
                    .register("https", sslConnectionSocketFactory).build());
            clientConnectionManager.setMaxTotal(100);
            clientConnectionManager.setDefaultMaxPerRoute(20);
            poolingHttpClientConnectionManager = clientConnectionManager;
          } catch (Exception e) {
          }
        }
      
        publicstatic String doPost(String url, final String payload, String MERCHANT_ID) throws Exception {
          if (StringUtils.isEmpty(url)) {
            thrownew Exception("url is empty");
          }
      
          HttpPost httpPost = new HttpPost(url);
          RequestConfig requestConfig = null;
          requestConfig = RequestConfig.custom().setConnectTimeout(TIME_OUT).setConnectionRequestTimeout(TIME_OUT)
              .setSocketTimeout(TIME_OUT).build();
      
          httpPost.setConfig(requestConfig);
          httpPost.setHeader("Authorization", "Basic WW91clVzZXJOYW1lOllvdXJQYXNzd29yZA==");
          httpPost.setHeader("x-hsbc-client-id", Constant.OMNI_API_CLIENT_ID);
          httpPost.setHeader("x-hsbc-client-secret", Constant.OMNI_API_CLIENT_SECRET);
          httpPost.setHeader("x-hsbc-msg-encrypt-id",
              MERCHANT_ID + "+" + Constant.MERCHNAT_KEY_VERSION + "+" + Constant.KEY_VERSION);
      
          StringEntity entity = new StringEntity(payload, "UTF-8");
          entity.setContentType("application/json");
          httpPost.setEntity(entity);
      
          StringBuffer headerSB = new StringBuffer();
          Header[] headers = httpPost.getAllHeaders();
          for (Header header : headers) {
            headerSB.append(header.getName() + " : " + header.getValue() + " ; ");
          }
      
          String resStr = "";
          CloseableHttpResponse response = null;
          try {
            CloseableHttpClient httpClient = getHttpClient();
            response = httpClient.execute(httpPost);
            resStr = EntityUtils.toString(response.getEntity());
          } catch (Exception e) {
            throwe;
          } finally {
            if (response != null) {
              try {
                EntityUtils.consume(response.getEntity());
                response.close();
              } catch (IOException e) {
                // logger.error("Close response failure:", e);
                e.printStackTrace();
              }
            }
          }
          returnresStr;
        }
      
        privatestatic CloseableHttpClient getHttpClient() {
          return HttpClients.custom().setConnectionManager(poolingHttpClientConnectionManager).build();
        }
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
