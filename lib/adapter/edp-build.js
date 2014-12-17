/**
 * @file edp-build processor
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('../util/extend');
var Abstract;

function Processor(options) {
    options = options || {};
    this.extnames = options.extnames || ['js'];
    this.filters = options.filters;
    this.clear = options.clear;
    Abstract.call(this);
}

var prototype = {};

prototype.name = 'c2a';

prototype.isExclude = function (file) {
    var res = Abstract.prototype.isExclude.call(this, file);
    return res || !this.filters || this.extnames.indexOf(file.extname) < 0;
};

prototype.process = function (file, context, callback) {
    var fs = require('fs');
    var c2a = require('../../index');

    for (var i = 0, filter; filter = this.filters[i]; i++) {
        if (filter.test(file.fullPath)) {
            var path = file.fullPath;
            if (this.clear) {
                fs.writeFileSync(path, file.rawData, 'utf8');
                file.setData(file.rawData);
            }
            else {
                // 改变自身内容 不是必要的
                // 只是为了让modelCompile不报错
                file.setData(c2a(file.data));
                // 产生用于combine的文件
                fs.writeFileSync(path, file.data, 'utf8');
            }
            break;
        }
    }

    callback();
};

module.exports = function (baseClass, options) {
    if (!Abstract) {
        Abstract = baseClass;
        Processor.prototype = new Abstract();
        extend(Processor.prototype, prototype);
    }

    var clearOptions = extend({}, options);
    clearOptions.clear = true;

    return {
        builder: new Processor(options),
        clear: new Processor(clearOptions)
    };
};
