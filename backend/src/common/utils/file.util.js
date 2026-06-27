"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtil = void 0;
var fs = require("fs");
var path = require("path");
var FileUtil = /** @class */ (function () {
    function FileUtil() {
    }
    FileUtil.ensureDirectoryExists = function (dirPath) {
        if (!fs.existsSync(dirPath))
            fs.mkdirSync(dirPath, { recursive: true });
    };
    FileUtil.deleteFile = function (filePath) {
        if (fs.existsSync(filePath))
            fs.unlinkSync(filePath);
    };
    FileUtil.getFileSize = function (filePath) {
        return fs.statSync(filePath).size;
    };
    FileUtil.getExtension = function (filename) {
        return path.extname(filename).toLowerCase();
    };
    FileUtil.generateUniqueFilename = function (originalName) {
        var timestamp = Date.now();
        var random = Math.random().toString(36).substring(2, 8);
        var ext = this.getExtension(originalName);
        return "".concat(timestamp, "-").concat(random).concat(ext);
    };
    return FileUtil;
}());
exports.FileUtil = FileUtil;
