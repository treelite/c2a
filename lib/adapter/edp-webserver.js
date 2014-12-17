/**
 * @file edp-webserver handler
 * @author treelite(c.xinle@gmail.com)
 */

/**
 * 去掉多余的.js后缀名
 *
 * @inner
 * @param {string} file 文件路径
 * @return {string}
 */
function trimExtname(file) {
    var names = file.split('.');

    while (names.length > 2 && names[names.length - 1] === 'js') {
        names.pop();
    }

    return names.join('.');
}
/**
 * edp-webserver处理器
 *
 * @public
 * @param {Object=} options 选项
 * @return {Function}
 */
module.exports = function (options) {
    options = options || {};

    return function (context) {
        var fs = require('fs');
        var c2a = require('../../index');
        var docRoot  = context.conf.documentRoot;
        var pathname = context.request.pathname;
        // 需要去掉多余的.js后缀
        // 比如对require('xxx.json')时会产生xx.json.js的请求
        var file = docRoot + trimExtname(pathname);

        if (fs.existsSync(file)) {
            var encoding = options.encoding || 'utf8';
            var data = fs.readFileSync(file, encoding);
            context.content = c2a(data);
            context.start();
        }
        else {
            context.status = 404;
            context.start();
        }
    };
};
