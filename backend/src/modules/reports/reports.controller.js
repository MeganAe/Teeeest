"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
var common_1 = require("@nestjs/common");
var roles_decorator_1 = require("../../common/decorators/roles.decorator");
var client_1 = require("@prisma/client");
var ReportsController = function () {
    var _classDecorators = [(0, common_1.Controller)('reports')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getFinancialReport_decorators;
    var _getMedicalReport_decorators;
    var _getActivityReport_decorators;
    var _getPharmacyReport_decorators;
    var _exportToPDF_decorators;
    var _exportToExcel_decorators;
    var ReportsController = _classThis = /** @class */ (function () {
        function ReportsController_1(reportsService) {
            this.reportsService = (__runInitializers(this, _instanceExtraInitializers), reportsService);
        }
        ReportsController_1.prototype.getFinancialReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reportsService.getFinancialReport(new Date(startDate), new Date(endDate))];
                });
            });
        };
        ReportsController_1.prototype.getMedicalReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reportsService.getMedicalReport(new Date(startDate), new Date(endDate))];
                });
            });
        };
        ReportsController_1.prototype.getActivityReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reportsService.getActivityReport(new Date(startDate), new Date(endDate))];
                });
            });
        };
        ReportsController_1.prototype.getPharmacyReport = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reportsService.getPharmacyReport(new Date(startDate), new Date(endDate))];
                });
            });
        };
        ReportsController_1.prototype.exportToPDF = function (data, res) {
            return __awaiter(this, void 0, void 0, function () {
                var pdf;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.reportsService.generatePDF(data)];
                        case 1:
                            pdf = _a.sent();
                            res.set({
                                'Content-Type': 'application/pdf',
                                'Content-Disposition': "attachment; filename=rapport-".concat(Date.now(), ".pdf"),
                            });
                            res.send(pdf);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ReportsController_1.prototype.exportToExcel = function (data, res) {
            return __awaiter(this, void 0, void 0, function () {
                var buffer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.reportsService.generateExcel(data)];
                        case 1:
                            buffer = _a.sent();
                            res.set({
                                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'Content-Disposition': "attachment; filename=rapport-".concat(Date.now(), ".xlsx"),
                            });
                            res.send(buffer);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ReportsController_1;
    }());
    __setFunctionName(_classThis, "ReportsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getFinancialReport_decorators = [(0, common_1.Get)('financial'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE)];
        _getMedicalReport_decorators = [(0, common_1.Get)('medical'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MEDECIN_DIRECTEUR)];
        _getActivityReport_decorators = [(0, common_1.Get)('activity'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MEDECIN_DIRECTEUR)];
        _getPharmacyReport_decorators = [(0, common_1.Get)('pharmacy'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN)];
        _exportToPDF_decorators = [(0, common_1.Post)('export/pdf'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE, client_1.Role.MEDECIN_DIRECTEUR)];
        _exportToExcel_decorators = [(0, common_1.Post)('export/excel'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE)];
        __esDecorate(_classThis, null, _getFinancialReport_decorators, { kind: "method", name: "getFinancialReport", static: false, private: false, access: { has: function (obj) { return "getFinancialReport" in obj; }, get: function (obj) { return obj.getFinancialReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMedicalReport_decorators, { kind: "method", name: "getMedicalReport", static: false, private: false, access: { has: function (obj) { return "getMedicalReport" in obj; }, get: function (obj) { return obj.getMedicalReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getActivityReport_decorators, { kind: "method", name: "getActivityReport", static: false, private: false, access: { has: function (obj) { return "getActivityReport" in obj; }, get: function (obj) { return obj.getActivityReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPharmacyReport_decorators, { kind: "method", name: "getPharmacyReport", static: false, private: false, access: { has: function (obj) { return "getPharmacyReport" in obj; }, get: function (obj) { return obj.getPharmacyReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _exportToPDF_decorators, { kind: "method", name: "exportToPDF", static: false, private: false, access: { has: function (obj) { return "exportToPDF" in obj; }, get: function (obj) { return obj.exportToPDF; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _exportToExcel_decorators, { kind: "method", name: "exportToExcel", static: false, private: false, access: { has: function (obj) { return "exportToExcel" in obj; }, get: function (obj) { return obj.exportToExcel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReportsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReportsController = _classThis;
}();
exports.ReportsController = ReportsController;
