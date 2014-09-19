var akeypair = require('./');

var opts = {};
if(process.argv.indexOf('js') != -1) opts.purejs = true;
if(process.argv.indexOf('cert') != -1) opts.cert = true;

akeypair(opts,function(err, pair){
  console.log(JSON.stringify(pair,null,2));
});
