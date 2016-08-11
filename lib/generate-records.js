var syncRequest = require('sync-request');
var os = require('os');

module.exports = function (config, cb) {
  var records = {};
  records.serverUptime = os.uptime();
  records.freeMem = os.freemem();
  records.totalMem = os.totalmem();

  if (typeof config.local_server_urls != 'undefined') {
    // Check if the local server is up
    var available = config.local_server_urls.map(function (value) {
      try {
        var res = syncRequest('GET', value);
        if (res.statusCode == 200) {
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    });
    if (available.includes(false))  {
      records.up = false
    } else {
      records.up = true;
    }
  }
  cb(null, records);

};
