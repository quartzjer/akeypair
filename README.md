# akeypair

Async generate a RSA PEM key pair and self-signed cert (X509) from pure JS (slower) or compiled (faster).

> This is a fork of the [keypair](https://github.com/juliangruber/keypair) module, making it async so that it doesn't block (using web-workers when available) and also will try to use a compiled OpenSSL binding in node (still falling back to pure-JS if not).

[![Build Status](https://travis-ci.org/quartzjer/akeypair.svg?branch=master)](https://travis-ci.org/quartzjer/akeypair)
[![downloads](https://img.shields.io/npm/dm/akeypair.svg)](https://www.npmjs.org/package/akeypair)

[![browser support](https://ci.testling.com/quartzjer/akeypair.png)](https://ci.testling.com/quartzjer/akeypair)

## Usage

```js
var akeypair = require('akeypair');

akeypair(function(err, pair){
  console.log(pair);
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

By default it generates a 2048 bit key, this can be changed by passing options as the first argument: `akeypair({bits:4096}, callback)`

## Self-Signed Certificate

To use this module for generating a keypair for a TLS/HTTPS server with a self-signed certificate, pass options of `{cert:true}` and it will return an object that can be used as the first argument to [https.createServer()](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener):

````json
{
  "public": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlfMDv+21MpZZVFEsiJ8xT7IgT6Og\nJCRnIL8dpjLZeIhmYNyaanXfMIAUya1P7Va9foejVSCP7RwFAQamYvtS/j4GDi1AJhV0uBju\nCeOWa4uTRF6xLxG+5h35FzG6XVOVibrIO/84xz1/LV8W9cuvTg3qgXqdGb/tRHlxRJPiazV+\nhvw+l4Q73seSEmPxTRtOt6BsktdhoEPVLN7ax9cKIQ2YPEr0deqGZso8b6QjrB4HNf8c1WUb\n75sSKmz07Ho1FW9hFbc/vLURaetOZE6y0+xlQBJR4Ey8LST08nScC1nEQuSpFBpPsqIF/TLD\n4Czin5WJ5iSqbeYf4i/lW/eV3QIDAQAB\n-----END PUBLIC KEY-----\n\n",
  "key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAlfMDv+21MpZZVFEsiJ8xT7IgT6OgJCRnIL8dpjLZeIhmYNyaanXfMIAU\nya1P7Va9foejVSCP7RwFAQamYvtS/j4GDi1AJhV0uBjuCeOWa4uTRF6xLxG+5h35FzG6XVOV\nibrIO/84xz1/LV8W9cuvTg3qgXqdGb/tRHlxRJPiazV+hvw+l4Q73seSEmPxTRtOt6Bsktdh\noEPVLN7ax9cKIQ2YPEr0deqGZso8b6QjrB4HNf8c1WUb75sSKmz07Ho1FW9hFbc/vLURaetO\nZE6y0+xlQBJR4Ey8LST08nScC1nEQuSpFBpPsqIF/TLD4Czin5WJ5iSqbeYf4i/lW/eV3QID\nAQABAoIBAFhylLakPypMtvpeOzeHNy38MsTnDjHjaxVMxe9ftRk806600TyUtIbGNfzUBv5H\nGNVGqpgu8dZ5nZYCVyixeD3RVf8Mv/b21vc0dUxN+08KcF52wGq0O/c+nMwKoBQmlmE8VJnX\nLKWRZ6/alA9+CrSuzrF7IqmqpQir3Z0G4ho79MH69hltXdUMmm4M4UoJ4YPy2MQyi8a16ke7\nZWSZ3AwhaHbDRfhKgTs3YfvbrSbRH0toSqQsyS8roHSVmJQoNUpEaf/2NBwpaiPcaBoKJ3NH\n8W9vqk5h2YSwNZtCafF7wmBKalLQ+EvPJdOatm+5aBoSfSUDdFtd5XpU6pLN/KECgYEA5FGs\nsh4SX3jaD1hRM6XdqanMQ7hFimUeWp2hqvsHwDlMOpned2g/Luy75L77b9WidQqj5sk5hHW5\nmAF2XLKapkehMg4CIqKq5fKV4pzc29VP6bSw4sbV/vd1qzJ2QlJDX8fH+6Dz1fcjzQzHfmgF\nCKx07o539czZKlspvHD+8kkCgYEAqCD7ZDU89283TpCfNISvLK/5dxOefwhvPQ2zktSiurDG\nCzffOqCmLD3IMNJqU5lALKbka07XWmRR1ZmW0jnoZUxtNgA+JIyn4rRhpxleNu363btAvAtP\nk0DrA1g/bUru8AAJgHTAPuGOK+Nc4XgTxgh8tX2kqC/YuRqIwMvsBvUCgYEAy+sah9cN59FD\nSPNDSxK4QEFUG6OoEGwxyRMCgnhEOu2x5KDqrdEgpWNwiWP9o6u1tj0zl/te8KxIf7fGpBIs\nx5gwI0mZpJ+ObWPVdJlPNNR21C+60EBwfpE7uhSOxLs+S3xeY6IkRZS+l/Py9TYoUM/ee/Yo\ntBMqXocfZpuxSGkCgYAHk1zgegmiOI+saZXS3vuprtA1zluA69dfT+O8hPpEITz7OmxDjwON\n0MbZdFG4LJqYqHh4YVgQyZ5qWn5SQKu5DMWK/l3OdcwGygvwZJM7NGPuY8aZ8oSGZRFx2CMb\ngJndlJLZB+m1q6IlVhxUSH3TmYRNBTlLHsTMKmbpEQc0lQKBgHgaPaKzwvDts0WzP84zy3uq\nylePshV8qHqHrjcP1nkMnMmBRHE5CgsuJGN3mST4QDZSOfEOR+56QCnGCjtCP5uZBAhE6657\nC3LOfzhAOTco+C0LcSaFAJULXWs5DSZk3D0AGrO8/0kFwqTw+r+ZTCtV8F9GbpjiLhTM/nJa\n7bym\n-----END RSA PRIVATE KEY-----\n\n",
  "cert": "-----BEGIN CERTIFICATE-----\r\nMIIC1TCCAb2gAwIBAgIBATANBgkqhkiG9w0BAQUFADAAMB4XDTE0MDkxOTE5NDEw\r\nMVoXDTE1MDkxOTE5NDExMVowADCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\r\nggEBAJXzA7/ttTKWWVRRLIifMU+yIE+joCQkZyC/HaYy2XiIZmDcmmp13zCAFMmt\r\nT+1WvX6Ho1Ugj+0cBQEGpmL7Uv4+Bg4tQCYVdLgY7gnjlmuLk0ResS8RvuYd+Rcx\r\nul1TlYm6yDv/OMc9fy1fFvXLr04N6oF6nRm/7UR5cUST4ms1fob8PpeEO97HkhJj\r\n8U0bTregbJLXYaBD1Sze2sfXCiENmDxK9HXqhmbKPG+kI6weBzX/HNVlG++bEips\r\n9Ox6NRVvYRW3P7y1EWnrTmROstPsZUASUeBMvC0k9PJ0nAtZxELkqRQaT7KiBf0y\r\nw+As4p+VieYkqm3mH+Iv5Vv3ld0CAwEAAaNaMFgwDAYDVR0TBAUwAwEB/zALBgNV\r\nHQ8EBAMCAvQwOwYDVR0lBDQwMgYIKwYBBQUHAwEGCCsGAQUFBwMCBggrBgEFBQcD\r\nAwYIKwYBBQUHAwQGCCsGAQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQBhfEaLkW0W\r\nojBlV3JI6l9zYOdQrzQysSKhHz0TMxJWiJwVQHbHSvkC3FC1lsqdvGzoCUTElBBH\r\nDZbOAi7DmoHzuf0ujKA6911DtMD8qRTdKDbGVCvK8LNJs65in8RypYkdYbTAar2u\r\ny0KeKVGmcaGEiw8D1MIPhL5m3ka92Cu2wgbwKPwbdNn6R67KkLpr0SuzNId/dVII\r\nAJwuiDRpVJ1opTwfEYV0JhsabH4LS3o5pn4TD9JrtF9H+k6nB8gJy9nxOAzjwVeD\r\n5yYpa8EWxr3N1Hef//VbdrG5jhMwXmynpsjn0qpwneWTgX0DmTcM6NJkTCHUMsmG\r\nF0ClX2baU0TC\r\n-----END CERTIFICATE-----\r\n"
}
````

Then in any `https.request` make sure you either provide the cert as the `ca` for trust or have `rejectUnauthorized:false` (encryption only).

## Performance

When using node and the ursa dependency works, it's really fast :)

In the browser performance greatly depends on the bit size of the generated private key. With 1024 bits you get a key in 0.5s-2s, with 2048 bits it takes 8s-20s, on the same machine. 

## API

### akeypair([opts, ]callback)

Get an RSA PEM key pair.

`opts` can be

* `bits`: the size for the private key in bits. Default: **2048**.
* `e`: the public exponent to use. Default: **65537**.

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
