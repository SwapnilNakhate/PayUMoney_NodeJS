#Quick start for PayUMoney Gateway Integration :

**Steps for Installation** : -

Install the package with :

      npm install payumoney_nodejs --save
      

**Set Merchent Key and Salt Key**

      var payUMoney = require('payumoney_nodejs');
      payumoney.setProdKeys(MERCHANT_KEY, MERCHANT_SALT, PAYUMONEY_AUTHORIZATION_HEADER);
      payumoney.setSandboxKeys(MERCHANT_KEY, MERCHANT_SALT, PAYUMONEY_AUTHORIZATION_HEADER);

Set Production / SandBox Mode :

      payUMoney.setProdMode(true); //set false for use of sandbox mode


# Introduction


**How to make PayUMoney request**


      var requestBody = {
        "firstname" : "",
        "lastname" : "",
        "email" : "",
        "phone" : 9911223344,
        "amount" : 100,
        "productinfo" : "",
        "txnid" : "",
        "surl" : "",
        "furl" : ""
      };
      
      payUMoney.pay(requestBody, function(error, response) {
        if (error) {
          // Some error
          console.log(response);
        } else {
          // You will get a link in response to redirect to payUMoney
          console.log(response);
        }
      });



This API will return you PayUMoney link. You need to redirect to that link in front-end.

Parameters **surl** and **furl** must be backend API's, after paymnet success or failure, payUMoney will send POST request to these URLs with details regarding your payment.

You can handle db related operations (like update payment status in your database) on these API's.
  

**Submit Issues**

Email me regarding any issue me at swapnil.nakhate1010@gmail.com

