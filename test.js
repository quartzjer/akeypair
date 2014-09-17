var keypair = require('./index.js');
var test = require('tape');

test('keypair', function (t) {
  var pair = keypair(function(err, pair){
    t.ok(pair.private, 'private key');
    t.assert(/BEGIN RSA PRIVATE KEY/.test(pair.private), 'private header');
    t.ok(pair.public, 'public key');
    t.assert(/BEGIN RSA PUBLIC KEY/.test(pair.public), 'public header');
    t.assert(/END RSA PUBLIC KEY/.test(pair.public), 'public footer');
    t.end();
  });
});

test('keypair-js', function (t) {
  var pair = keypair({purejs:true,bits:1024},function(err, pair){
    t.ok(pair.private, 'private key');
    t.assert(/BEGIN RSA PRIVATE KEY/.test(pair.private), 'private header');
    t.ok(pair.public, 'public key');
    t.assert(/BEGIN RSA PUBLIC KEY/.test(pair.public), 'public header');
    t.assert(/END RSA PUBLIC KEY/.test(pair.public), 'public footer');
    t.end();
  });
});
