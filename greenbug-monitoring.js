var fs = require('fs');
var path = require('path');
var existsFile = require('exists-file');
var log = require('captains-log')();

var tokenStorage = require('token-storage');

var cachePath = path.join(__dirname, '/.greenbug-cache');

if (!existsFile.sync(cachePath)) {
  log.info('No cache directory, create it.');
  fs.mkdirSync(cachePath);
}

if ()
