"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtil = void 0;
var StringUtil = /** @class */ (function () {
    function StringUtil() {
    }
    StringUtil.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    StringUtil.slugify = function (str) {
        return str
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };
    StringUtil.truncate = function (str, length) {
        return str.length > length ? str.substring(0, length) + '...' : str;
    };
    StringUtil.generateReference = function (prefix) {
        var timestamp = Date.now().toString();
        var random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return "".concat(prefix, "-").concat(timestamp, "-").concat(random);
    };
    return StringUtil;
}());
exports.StringUtil = StringUtil;
