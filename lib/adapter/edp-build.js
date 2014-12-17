/**
 * @file edp-build processor
 * @author treelite(c.xinle@gmail.com)
 */

var extend = require('../util/extend');

var defaultOptions = {
    files: ['tpl/**/*.js']
};

function process(file, context, callback) {
    var fs = require('fs');
    var c2a = require('../../index');
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

    callback();
}

function createProcessor(options) {
    var res = extend({}, defaultOptions);

    res = extend(res, options);
    res.process = process;

    return res;
}

module.exports = function (options) {
    options = options || {};

    return {
        builder: createProcessor(extend(options, {name: 'C2A'})),
        clear: createProcessor(extend(options, {clear: true, name: 'C2A-Clear'}))
    };
};
