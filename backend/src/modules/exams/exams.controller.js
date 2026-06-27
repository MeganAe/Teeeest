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
exports.ExamsController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var roles_decorator_1 = require("../../common/decorators/roles.decorator");
var client_1 = require("@prisma/client");
var multer_1 = require("multer");
var path_1 = require("path");
var ExamsController = function () {
    var _classDecorators = [(0, common_1.Controller)('exams')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _findAll_decorators;
    var _getPending_decorators;
    var _getByPatient_decorators;
    var _findById_decorators;
    var _requestExam_decorators;
    var _submitResult_decorators;
    var _validateResult_decorators;
    var _getStats_decorators;
    var ExamsController = _classThis = /** @class */ (function () {
        function ExamsController_1(examsService) {
            this.examsService = (__runInitializers(this, _instanceExtraInitializers), examsService);
        }
        ExamsController_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.examsService.findAll(query)];
                });
            });
        };
        ExamsController_1.prototype.getPending = function (userId, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.examsService.getPending(userId, type)];
                });
            });
        };
        ExamsController_1.prototype.getByPatient = function (patientId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.examsService.getByPatient(patientId)];
                });
            });
        };
        ExamsController_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.examsService.findById(id)];
                });
            });
        };
        ExamsController_1.prototype.requestExam = function (requestExamDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.examsService.requestExam(requestExamDto, userId)];
                });
            });
        };
        ExamsController_1.prototype.submitResult = function (id, submitResultDto, userId, file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.examsService.submitResult(id, submitResultDto, userId, file)];
                });
            });
        };
        ExamsController_1.prototype.validateResult = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.examsService.validateResult(id)];
                });
            });
        };
        ExamsController_1.prototype.getStats = function (type, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.examsService.getStats(type, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined)];
                });
            });
        };
        return ExamsController_1;
    }());
    __setFunctionName(_classThis, "ExamsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _findAll_decorators = [(0, common_1.Get)(), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MEDECIN_DIRECTEUR, client_1.Role.MEDECIN_PSYCHIATRE, client_1.Role.MEDECIN_ORTHOPEDIEN, client_1.Role.LABORANTIN, client_1.Role.TECHNICIEN_EEG, client_1.Role.TECHNICIEN_ECG, client_1.Role.RADIOLOGUE)];
        _getPending_decorators = [(0, common_1.Get)('pending'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.LABORANTIN, client_1.Role.TECHNICIEN_EEG, client_1.Role.TECHNICIEN_ECG, client_1.Role.RADIOLOGUE)];
        _getByPatient_decorators = [(0, common_1.Get)('patient/:patientId'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MEDECIN_DIRECTEUR, client_1.Role.MEDECIN_PSYCHIATRE, client_1.Role.MEDECIN_ORTHOPEDIEN)];
        _findById_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MEDECIN_DIRECTEUR, client_1.Role.MEDECIN_PSYCHIATRE, client_1.Role.MEDECIN_ORTHOPEDIEN, client_1.Role.LABORANTIN, client_1.Role.TECHNICIEN_EEG, client_1.Role.TECHNICIEN_ECG, client_1.Role.RADIOLOGUE)];
        _requestExam_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MEDECIN_DIRECTEUR, client_1.Role.MEDECIN_PSYCHIATRE, client_1.Role.MEDECIN_ORTHOPEDIEN)];
        _submitResult_decorators = [(0, common_1.Post)(':id/result'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.LABORANTIN, client_1.Role.TECHNICIEN_EEG, client_1.Role.TECHNICIEN_ECG, client_1.Role.RADIOLOGUE), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/exams',
                    filename: function (req, file, callback) {
                        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        callback(null, "exam-".concat(uniqueSuffix).concat((0, path_1.extname)(file.originalname)));
                    },
                }),
            }))];
        _validateResult_decorators = [(0, common_1.Put)(':id/validate'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MEDECIN_DIRECTEUR)];
        _getStats_decorators = [(0, common_1.Get)('type/:type/stats'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MEDECIN_DIRECTEUR)];
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPending_decorators, { kind: "method", name: "getPending", static: false, private: false, access: { has: function (obj) { return "getPending" in obj; }, get: function (obj) { return obj.getPending; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getByPatient_decorators, { kind: "method", name: "getByPatient", static: false, private: false, access: { has: function (obj) { return "getByPatient" in obj; }, get: function (obj) { return obj.getByPatient; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findById_decorators, { kind: "method", name: "findById", static: false, private: false, access: { has: function (obj) { return "findById" in obj; }, get: function (obj) { return obj.findById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _requestExam_decorators, { kind: "method", name: "requestExam", static: false, private: false, access: { has: function (obj) { return "requestExam" in obj; }, get: function (obj) { return obj.requestExam; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _submitResult_decorators, { kind: "method", name: "submitResult", static: false, private: false, access: { has: function (obj) { return "submitResult" in obj; }, get: function (obj) { return obj.submitResult; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _validateResult_decorators, { kind: "method", name: "validateResult", static: false, private: false, access: { has: function (obj) { return "validateResult" in obj; }, get: function (obj) { return obj.validateResult; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: function (obj) { return "getStats" in obj; }, get: function (obj) { return obj.getStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExamsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExamsController = _classThis;
}();
exports.ExamsController = ExamsController;
