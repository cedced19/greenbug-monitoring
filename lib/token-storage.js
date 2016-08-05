var fs = require('fs');
var log = require('captains-log')();
var decodePayload = require('jwt-payload-decoder').getPayload;

var cacheFile = path.join(__dirname, '/.greenbug-cache/jwt');

module.export = {
  set: function (jwt, cb) {
    if (typeof cb == 'undefined') {
      return fs.writeFileSync(cacheFile, jwt);
    } else {
      fs.writeFile(cacheFile, jwt, function (err) {
        if (err) {
          log.error(err);
          return cb(err);
        }
        cb(null);
      });
    }
  },
  get: function (cb) {
    if (typeof cb == 'undefined') {
      return fs.readFileSync(cacheFile);
    } else {
      fs.readFile(cacheFile, function (err, data) {
        if (err) {
          log.error(err);
          return cb(err);
        }
        cb(null, data);
      });
    }
  },
  getPayload: function () {
    return decodePayload(this.get());
  }
}
