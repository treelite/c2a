/**
 * @file c2a
 * @author treelite(c.xinle@gmail.com)
 */

var BEGIN_WRAPPER = ['define(', 'define(function (require, exports, module) {'];
var END_WRAPPER = [');', '});'];

/**
 * 缩进
 *
 * @inner
 * @param {string} code
 * @param {number} num 缩进数量
 * @return {string}
 */
function indent(code, num) {
    var strIndent = new Array(num + 1);
    strIndent = strIndent.join(' ');

    code = code.replace(/\n([^\n])/g, function ($0, $1) {
        return '\n' + strIndent + $1;
    });

    return strIndent + code;
}

/**
 * 删除前后多余的空行
 *
 * @inner
 * @param {string} str
 * @return {string}
 */
function trimLine(str) {
    return str.replace(/^(:?\r?\n)+|(:?\r?\n)+$/g, '');
}

/**
 * 判断是否是JSON数据
 *
 * @param {string} data
 * @return {boolean}
 */
function isJSON(data) {
    var res;
    try {
        res = JSON.parse(data) && true;
    }
    catch (e) {
        res = false;
    }
    return res;
}

/**
 * 转化代码
 *
 * @public
 * @param {string} code
 * @return {string}
 */
module.exports = function (code) {
    var index = isJSON(code) ? 0 : 1;

    code = indent(trimLine(code), 4);
    var res = [BEGIN_WRAPPER[index]];
    res.push(code);
    res.push(END_WRAPPER[index]);

    return res.join('\n');
};

// 导出edp-webserver与edp-build的处理器
module.exports.edpWebserver = require('./lib/adapter/edp-webserver');
module.exports.edpBuild = require('./lib/adapter/edp-build');
