"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtil = void 0;
var crypto = require("crypto");
var CryptoUtil = /** @class */ (function () {
    function CryptoUtil() {
    }
    CryptoUtil.generateRandomString = function (length) {
        if (length === void 0) { length = 32; }
        return crypto.randomBytes(length).toString('hex');
    };
    CryptoUtil.generateToken = function () {
        return crypto.randomBytes(32).toString('hex');
    };
    CryptoUtil.hashSHA256 = function (data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    };
    CryptoUtil.generateOTP = function () {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    return CryptoUtil;
}());
exports.CryptoUtil = CryptoUtil;
