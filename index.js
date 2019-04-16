var request = require('request'),
    sha512 = require('js-sha512');

module.exports = {

    mode: false,
    payUmoneyURL : 'https://sandboxsecure.payu.in/_payment',

    headers: {
        'authorization': 'YOUR-AUTHORIZATION-HEADER'
    },

    credentails: {
        'key': 'YOUR-MERCHANT-KEY',
        'salt': 'YOUR-SALT-KEY'
    },

    isProdMode: function(value) {
        if (value) {
            this.mode = 'prod';
            this.payUmoneyURL = 'https://secure.payu.in/_payment';
        } else {
            this.mode = 'test';
            this.payUmoneyURL = 'https://sandboxsecure.payu.in/_payment';
        }
    },

    setSandboxKeys: function(key, salt, authorization) {
        this.credentails.key = key;
        this.credentails.salt = salt;
        this.headers.authorization = authorization;
    },

    setProdKeys: function(key, salt, authorization) {
        this.credentails.key = key;
        this.credentails.salt = salt;
        this.headers.authorization = authorization;
    },

    pay: function(data, callback) {
        var hashData = { hashSequence: this.credentails.key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|||||||||||'  + this.credentails.salt};
        var hash = sha512(hashData.hashSequence);
        var payuData = {
            key: this.credentails.key,
            salt: this.credentails.salt,
            service_provider: 'payu_paisa',
            hash: hash
        };
        var params = Object.assign(payuData, data);
        request.post(this.payUmoneyURL, { form: params, headers: this.headers }, function(error, response, body) {
            if (!error) {
                var result = response.headers.location;
                callback(error, result);
            }
        });
    }
};