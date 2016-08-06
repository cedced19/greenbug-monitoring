var fs = require('fs');
var decodePayload = require('jwt-payload-decoder').getPayload;
var existsFile = require('exists-file');
var path = require('path');

var cacheFile = path.join(__dirname, '/.greenbug-cache/jwt');

module.exports = {
  set: function (jwt, cb) {
    if (typeof cb == 'undefined') {
      return fs.writeFileSync(cacheFile, jwt);
    } else {
      fs.writeFile(cacheFile, jwt, function (err) {
        if (err) return cb(err);
        cb(null);
      });
    }
  },
  get: function (cb) {
    if (typeof cb == 'undefined') {
      if (!existsFile.sync(cacheFile)) {
        return false;
      }
      return fs.readFileSync(cacheFile);
    } else {
      existsFile(cacheFile, function (err, exists) {
        if (err) return cb(err);
        if (!exists) return new Error('The file doesn\'t exists.');
        fs.readFile(cacheFile, function (err, data) {
          if (err) return cb(err);
          cb(null, data);
        });
      });
    }
  },
  getPayload: function () {
    var token = this.get();
    if (!token) return false;
    return decodePayload(token);
  }
}
