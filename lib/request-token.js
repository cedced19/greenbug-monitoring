var log = require('captains-log')();
var syncRequest = require('sync-request');
var tokenStorage = require('./token-storage');

module.exports = function (config) {
  try {
    var res = syncRequest('POST', config.url + '/api/servers/setup/' + config.id, {
      json: {
        password: config.password
      }
    });
    var jwt = {
      token: JSON.parse(res.body.toString('utf8')).token,
      payload: tokenStorage.getPayload(this.token)
    };
    log.info('The token has just been downloaded.');
    tokenStorage.set(jwt.token, function (err) {
      if (err) return log.warn('Cannot write the json web token.');
      log.info('The token has just been written.');
    });
    return jwt;
  } catch (err) {
    log.error('Cannot get a json web token.');
    process.exit(1);
  }
}
