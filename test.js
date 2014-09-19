var keypair = require('./index.js');
var test = require('tape');

test('keypair', function (t) {
  var pair = keypair(function(err, pair){
    t.ok(pair.private, 'private key');
    t.assert(/BEGIN RSA PRIVATE KEY/.test(pair.private), 'private header');
    t.assert(/END RSA PRIVATE KEY/.test(pair.private), 'private footer');
    t.ok(pair.public, 'public key');
    t.assert(/BEGIN PUBLIC KEY/.test(pair.public), 'public header');
    t.assert(/END PUBLIC KEY/.test(pair.public), 'public footer');
    t.end();
  });
});

test('keypair-js', function (t) {
  var pair = keypair({purejs:true,bits:1024},function(err, pair){
    t.ok(pair.private, 'private key');
    t.assert(/BEGIN RSA PRIVATE KEY/.test(pair.private), 'private header');
    t.assert(/END RSA PRIVATE KEY/.test(pair.private), 'private footer');
    t.ok(pair.public, 'public key');
    t.assert(/BEGIN PUBLIC KEY/.test(pair.public), 'public header');
    t.assert(/END PUBLIC KEY/.test(pair.public), 'public footer');
    t.end();
  });
});

test('keypair-cert', function (t) {
  var pair = keypair({cert:true},function(err, pair){
    t.ok(pair.public, 'private key');
    t.ok(pair.key, 'private key');
    t.ok(pair.cert, 'self-signed cert');
    t.assert(/BEGIN CERTIFICATE/.test(pair.cert), 'public header');
    t.assert(/END CERTIFICATE/.test(pair.cert), 'public header');
    t.end();
  });
});
