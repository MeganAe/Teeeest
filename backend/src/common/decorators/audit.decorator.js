"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audit = exports.AUDIT_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.AUDIT_KEY = 'audit';
var Audit = function (config) { return (0, common_1.SetMetadata)(exports.AUDIT_KEY, config); };
exports.Audit = Audit;
