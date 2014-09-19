# akeypair

Async generate a RSA PEM key pair and self-signed cert (X.509) from pure JS (slower) or compiled (faster).

> This is a fork of the [keypair](https://github.com/juliangruber/keypair) module, making it async so that it doesn't block (using web-workers when available) and also will try to use a compiled OpenSSL binding in node (still falling back to pure-JS if not).

[![Build Status](https://travis-ci.org/quartzjer/akeypair.svg?branch=master)](https://travis-ci.org/quartzjer/akeypair)
[![downloads](https://img.shields.io/npm/dm/akeypair.svg)](https://www.npmjs.org/package/akeypair)

[![browser support](https://ci.testling.com/quartzjer/akeypair.png)](https://ci.testling.com/quartzjer/akeypair)

## Usage

```js
var akeypair = require('akeypair');

akeypair(function(err, pair){
  console.log(pair); // 2048 by default
});
```

outputs

```
$ node example.js
{
  "public": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqqD8i9HQ2STKLUtwHvHG\nsmfA2AW5U7v4O/iZ7wYfhW+T2fFAVlUoRK+z+JdWudsv/OAGLgn8FQ7IjlvRlvQW\nonVgH7pyIPXy2Xun0v592PgRkQu8AsBdwOCudQ1Dq+9eqs6sgFFrd2Nzrc6mApcp\nEppU1V9oJBPsCSL4SLctMQg5Btx3hzFBmn2Gc6fmIAECc7gMcskJsxbUVSQmp+sD\nnTBj5VSVa/ij6jjSTLNLfUHkeE/u8wlD2pf/gPyiYsqBteROpFqbJtmHIj9lVH6R\nOrwcghXTxcG8tQzcr+M8YXVSbanYXDq2MormAbUO2Y3V9fj5YV0ZVH6UF3zrUjWY\nZQIDAQAB\n-----END PUBLIC KEY-----\n\n",
  "private": "-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEAqqD8i9HQ2STKLUtwHvHGsmfA2AW5U7v4O/iZ7wYfhW+T2fFA\nVlUoRK+z+JdWudsv/OAGLgn8FQ7IjlvRlvQWonVgH7pyIPXy2Xun0v592PgRkQu8\nAsBdwOCudQ1Dq+9eqs6sgFFrd2Nzrc6mApcpEppU1V9oJBPsCSL4SLctMQg5Btx3\nhzFBmn2Gc6fmIAECc7gMcskJsxbUVSQmp+sDnTBj5VSVa/ij6jjSTLNLfUHkeE/u\n8wlD2pf/gPyiYsqBteROpFqbJtmHIj9lVH6ROrwcghXTxcG8tQzcr+M8YXVSbanY\nXDq2MormAbUO2Y3V9fj5YV0ZVH6UF3zrUjWYZQIDAQABAoIBAEZVvCTKpYONFcYc\nDajD0zshZ63kliN9HXNjI9kSthWkC9dQCkxMKCBAKTi08awFPT/I/OMnfIEVqfh8\nwuWt0lK/fZM2oOsTVzrtLR3dh/TTNTKMGsErmLn0JBXeFOIf9u8D6LmwVlNNbJbd\n0zLIKscfVQ7rmBsfFzIg9yXKVFecNnHU8+6pBrzlzjoAIZ2BvwAW4T3h9UTnupBv\nQA951O73xI3kyDNmZdJ1pUgjySAM5mFB8OmAwvTIN4KWwEVHr/i7Kck6wn+tpvTx\ntm01NHwCYdCkJEyEvRNWEP93RX7Cdh7Xzw9D3bINhw3Trujyfrdh1TuG5Gv1ZKPN\n77a899UCgYEA3w1QQOXa2pL1811+vs7/5NPWVL01JqWey0XFhO2C2hudW8JNeH5j\naQgqO5LXf6gkHlM+uONsXvZJ6L+SLyfNwQJq8Qzz/uy3OdwM5B5qChH1SuD0/l9k\nHYsnJ9Dy73WIH4yrSSTaCCacsIOniQCuo8DZolRgMRrg2pgfsqGWdisCgYEAw9VM\nIzBOOu2FjhDl543sbKEa82llf9juyXHUTX8kxdsswAHPeiwcXkTBv6MKCaNPHz+I\nAOBR9hhxCM7yBKlgTEqPxZ4a1N8rnGeJqdiU89vjS+t1ydeT5VgERg0JtOKGzMUP\nJMw2Og74YqmDY/kicUq2qPDXpapgGFfVWLaQ868CgYBPW7hC7sS34XOaO5h9oL5Q\nlsH58jt33ZMqtU86JRraKNsKq43OogESfHIyMeN0Ksl29J0rQNbszmmrYoVLO7kr\nw4Vy7+3btDLYZh88Bkop/QutsW3ZFu1SyZCLzP6yDbn5p53Fb1QXdE1pS94Ok2yP\nHG0SITz8G5kGjPsyHeWfcwKBgCHiqoX8Oc0ghFeMvPtQJ3S0e8Fan2F72/WnaKDw\nOyCxSBEBPzFYqJ/3Lb9HKtl4FJzHlXTxW71FhWmMxXvhAvSwgigjr2jeJOGvWLa2\n7y8zASWF3J/MWZ75l+O3JdLSz5hnELPBUjDBnmEUC9Qkq70GvIyHAAl+bZpIuHXd\nQT+pAoGAbjxA3k0lRukuUSsXjKNKWxR09IbQmG3XueaUiHaHAdG5LWlDgeWsNti4\nT/4CjBh2je9X4r2phKsiw6f1BqysWd3r5AkTcafbEZI5USDXXmV8tCi2bcayy94R\nDjGa/Kngjt/ivWcgakHpWcdJCtZrOsqK+XircqwiHM+Z80d45Nk=\n-----END RSA PRIVATE KEY-----\n\n"
}
```

## Self-Signed Certificate

To use this module for generating a keypair for a TLS/HTTPS server with a self-signed certificate, pass options of `{cert:true}` and it will return an object that can be used as the first argument to [https.createServer()](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener):

````js
akeypair({cert:true},function(err, options){
  https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("encryption is awesome\n");
  }).listen(8443);
});
````

Then in any `https.request` make sure you either provide the cert as the `ca` for trust or have `rejectUnauthorized:false` (encryption only), or for the [request](https://github.com/mikeal/request) module set `strictSSL:false`:

````js
var request = require('request');
request.get({url:'https://localhost:8443/',strictSSL:false},function(err,res,body){
  console.log(body);
});
````

## Performance

When using node and the [ursa](https://github.com/Medium/ursa) dependency is available, it's really fast :)

In the browser performance greatly depends on the bit size of the generated private key. With 1024 bits you get a key in 0.5s-2s, with 2048 bits it takes 8s-20s, on the same machine. 

## API

### akeypair([opts, ]callback)

Get an RSA PEM key pair.

`opts` can be

* `bits`: the size for the private key in bits. Default: **2048**.
* `e`: the public exponent to use. Default: **65537**.
* `cert`: defaults to `false` but can be `true` or `{expire:new Date()}` to include a self-signed certificate in the result

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install akeypair
```

## Kudos

To [digitalbazaar](https://github.com/digitalbazaar) for their
[forge](https://github.com/digitalbazaar/forge) project, this library is merely a
wrapper around some of forge's functions.

## License

BSD / GPL
