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
    if(keypair) return cb(undefined, keypair);
  }
  forge.rsa.generateKeyPair(opts, function(err, pair){
    if (err) return cb(err);
    var keypair = {
      public: fix(forge.pki.publicKeyToPem(pair.publicKey, 72)),
      private: fix(forge.pki.privateKeyToPem(pair.privateKey, 72))
    };
    cb(undefined, keypair);
  });
};

function fix (str) {
  return str.replace(/\r/g, '') + '\n'
}

