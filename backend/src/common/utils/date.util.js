"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    DateUtil.formatDate = function (date, format) {
        if (format === void 0) { format = 'dd/MM/yyyy'; }
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear();
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        return format
            .replace('dd', day)
            .replace('MM', month)
            .replace('yyyy', year.toString())
            .replace('HH', hours)
            .replace('mm', minutes);
    };
    DateUtil.startOfDay = function (date) {
        var result = new Date(date);
        result.setHours(0, 0, 0, 0);
        return result;
    };
    DateUtil.endOfDay = function (date) {
        var result = new Date(date);
        result.setHours(23, 59, 59, 999);
        return result;
    };
    DateUtil.getDaysBetween = function (start, end) {
        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    };
    return DateUtil;
}());
exports.DateUtil = DateUtil;
