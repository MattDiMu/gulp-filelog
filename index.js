'use strict';

var through = require('through2');
var gutil = require('gulp-util');

module.exports = function filelog (taskParam) {
  var count = 0;

  function decorate (color, text) {
    return text ? '[' + gutil.colors[color](text) + ']' : '';
  }

  return through.obj(function (file, enc, callback) {
    var items = [];
    count++;

    if (taskParam) {
      items.push(decorate('cyan', taskParam));
    }

    items.push(decorate('yellow', file.path));

    if (file.isNull()) {
      items.push(decorate('magenta', 'EMPTY'));
    }

    gutil.log(items.join(' '));

    this.push(file);
    return callback();
  }, function (cb) {
    var task = taskParam ? decorate('blue', taskParam) + ' ' : '';
    cb();
  });
};
