var fs = require('fs');
var path = require('path');
var existsFile = require('exists-file');
var log = require('captains-log')();

var configFile = path.join(__dirname, '/config.json');

// Check if config.json exists
if (!existsFile.sync(configFile)) {
  log.error('No config.json file. Please create it and fill it with the url of the Greenbug server and the password.');
  return process.exit(1);
}

var config = require(configFile);

// Check for password
if (typeof config.password == 'undefined' || config.password === '') {
  log.error('No password defined.');
  return process.exit(1);
}

// Check for url
if (typeof config.url == 'undefined' || config.url === '' || !require('is-url')(config.url)) {
  log.error('No valid url defined.');
  return process.exit(1);
}

var cachePath = path.join(__dirname, '/.greenbug-cache');

// Check if cache directory exists
if (!existsFile.sync(cachePath)) {
  log.info('No cache directory. Creating it...');
  fs.mkdirSync(cachePath);
}

var tokenStorage = require('./lib/token-storage');
var payload = tokenStorage.getPayload();

// Check if jwt is valid
if (!payload || payload.exp <= (Date.now() - 86400000)) {
  log.info('No valid json web token, trying to get it from server.');
}
