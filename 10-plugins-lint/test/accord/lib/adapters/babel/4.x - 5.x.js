// Generated by CoffeeScript 1.10.0
(function() {
  var Adapter, SixtoFive, W, path, sourcemaps,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Adapter = require('../../adapter_base');

  path = require('path');

  W = require('when');

  sourcemaps = require('../../sourcemaps');

  SixtoFive = (function(superClass) {
    var compile;

    extend(SixtoFive, superClass);

    function SixtoFive() {
      return SixtoFive.__super__.constructor.apply(this, arguments);
    }

    SixtoFive.prototype.name = 'babel';

    SixtoFive.prototype.extensions = ['jsx', 'js'];

    SixtoFive.prototype.output = 'js';

    SixtoFive.prototype.isolated = true;

    SixtoFive.prototype._render = function(str, options) {
      var filename;
      filename = options.filename;
      if (options.sourcemap === true) {
        options.sourceMap = true;
      }
      options.sourceMapName = filename;
      delete options.sourcemap;
      return compile((function(_this) {
        return function() {
          return _this.engine.transform(str, options);
        };
      })(this));
    };

    compile = function(fn) {
      var data, err, error, res;
      try {
        res = fn();
      } catch (error) {
        err = error;
        return W.reject(err);
      }
      data = {
        result: res.code
      };
      if (res.map) {
        return sourcemaps.inline_sources(res.map).then(function(map) {
          data.sourcemap = map;
          return data;
        });
      } else {
        return W.resolve(data);
      }
    };

    return SixtoFive;

  })(Adapter);

  module.exports = SixtoFive;

}).call(this);
