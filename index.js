/**
 * @file c2a
 * @author treelite(c.xinle@gmail.com)
 */

var BEGIN_WRAPPER = ['define(', 'define(function (require, exports, module) {'];
var END_WRAPPER = [');', '});'];

function indent(data, num) {
    var strIndent = new Array(num + 1);
    strIndent = strIndent.join(' ');

    data = data.replace(/\n([^\n])/g, function ($0, $1) {
        return '\n' + strIndent + $1;
    });

    return strIndent + data;
}

function trimLine(data) {
    return data.replace(/^\n+|\n+$/g, '');
}

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

module.exports = function (file) {
    var index = isJSON(file) ? 0 : 1;

    file = indent(trimLine(file), 4);
    var res = [BEGIN_WRAPPER[index]];
    res.push(file);
    res.push(END_WRAPPER[index]);

    return res.join('\n');
};
