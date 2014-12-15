/**
 * @file edp-webserver handler
 * @author treelite(c.xinle@gmail.com)
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
