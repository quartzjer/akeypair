// optionally try to use compiled ursa generation
try {
  var ursa = require('ursa');
}catch(E){}

var forge = require('node-forge');

/**
 * Expose `akeypair`.
 */

module.exports = function (opts, cb) {
  if (typeof opts == 'function') cb = opts;
  if (typeof opts != 'object') opts = {};
  if (typeof opts.bits == 'undefined') opts.bits = 2048;
  if (typeof opts.e == 'undefined') opts.e = 65537;
  
  // optionally add a cert
  function cert(pair)
  {
    if (!opts.cert) return cb(undefined, pair);
    if (typeof opts.cert != 'object') opts.cert = {};
    
    // rename private to key to match options args for https.createServer
    var ret = {public:pair.public, key:pair.private};

    // self-sign the cert w/ forge (TODO find a compiled way to do it faster?)

    // create the certificate
    var cert = forge.pki.createCertificate();
    cert.serialNumber = opts.cert.serial || '01';
    cert.validity.notBefore = new Date();
    cert.validity.notBefore.setTime(cert.validity.notBefore.getTime()-10000); // allow for some clock skew
    cert.validity.notAfter = opts.cert.expire;
    if(!cert.validity.notAfter)
    {
      cert.validity.notAfter = new Date();
      cert.validity.notAfter.setFullYear(cert.validity.notAfter.getFullYear() + 1);
    }
    cert.setExtensions([{
      name: 'basicConstraints',
      cA: true
    }, {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    }, {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true
    }]);
    cert.publicKey = forge.pki.publicKeyFromPem(pair.public);
    cert.sign(forge.pki.privateKeyFromPem(pair.private));

    ret.cert = forge.pki.certificateToPem(cert);
    cb(undefined, ret);
  }
  if (!opts.purejs)
  {
    try {
      var pair = ursa.generatePrivateKey(opts.bits, opts.e);
      var keypair = {
        public: fix(pair.toPublicPem("utf8")),
        private: fix(pair.toPrivatePem("utf8"))
      };
    }catch(E){}
    // bad form to cb from inside a try
    if(keypair) return cert(keypair);
  }
  forge.rsa.generateKeyPair(opts, function(err, pair){
    if (err) return cb(err);
    var keypair = {
      public: fix(forge.pki.publicKeyToPem(pair.publicKey, 72)),
      private: fix(forge.pki.privateKeyToPem(pair.privateKey, 72))
    };
    cert(keypair);
  });
};

function fix (str) {
  return str.replace(/\r/g, '') + '\n'
}

