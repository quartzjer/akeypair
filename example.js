var akeypair = require('./');

akeypair({purejs:process.argv[2]},function(err, pair){
  console.log(JSON.stringify(pair,null,2));
});
