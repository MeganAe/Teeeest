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
exports.PharmacyController = void 0;
var common_1 = require("@nestjs/common");
var roles_decorator_1 = require("../../common/decorators/roles.decorator");
var client_1 = require("@prisma/client");
var PharmacyController = function () {
    var _classDecorators = [(0, common_1.Controller)('pharmacy')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getAllMedications_decorators;
    var _getLowStock_decorators;
    var _getExpiring_decorators;
    var _getMedicationById_decorators;
    var _createMedication_decorators;
    var _updateStock_decorators;
    var _deleteMedication_decorators;
    var _sellMedication_decorators;
    var _getSales_decorators;
    var _getSalesStats_decorators;
    var PharmacyController = _classThis = /** @class */ (function () {
        function PharmacyController_1(pharmacyService) {
            this.pharmacyService = (__runInitializers(this, _instanceExtraInitializers), pharmacyService);
        }
        PharmacyController_1.prototype.getAllMedications = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.getAllMedications(query)];
                });
            });
        };
        PharmacyController_1.prototype.getLowStock = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.getLowStock()];
                });
            });
        };
        PharmacyController_1.prototype.getExpiring = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.getExpiring()];
                });
            });
        };
        PharmacyController_1.prototype.getMedicationById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.getMedicationById(id)];
                });
            });
        };
        PharmacyController_1.prototype.createMedication = function (createMedicationDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.createMedication(createMedicationDto)];
                });
            });
        };
        PharmacyController_1.prototype.updateStock = function (id, updateStockDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.updateStock(id, updateStockDto)];
                });
            });
        };
        PharmacyController_1.prototype.deleteMedication = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.deleteMedication(id)];
                });
            });
        };
        PharmacyController_1.prototype.sellMedication = function (sellMedicationDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.sellMedication(sellMedicationDto, userId)];
                });
            });
        };
        PharmacyController_1.prototype.getSales = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.getSales(query)];
                });
            });
        };
        PharmacyController_1.prototype.getSalesStats = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.pharmacyService.getSalesStats(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined)];
                });
            });
        };
        return PharmacyController_1;
    }());
    __setFunctionName(_classThis, "PharmacyController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllMedications_decorators = [(0, common_1.Get)('medications'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN, client_1.Role.MEDECIN_DIRECTEUR)];
        _getLowStock_decorators = [(0, common_1.Get)('medications/low-stock'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN)];
        _getExpiring_decorators = [(0, common_1.Get)('medications/expiring'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN)];
        _getMedicationById_decorators = [(0, common_1.Get)('medications/:id'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN)];
        _createMedication_decorators = [(0, common_1.Post)('medications'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN)];
        _updateStock_decorators = [(0, common_1.Put)('medications/:id/stock'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN)];
        _deleteMedication_decorators = [(0, common_1.Delete)('medications/:id'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN)];
        _sellMedication_decorators = [(0, common_1.Post)('sales'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN)];
        _getSales_decorators = [(0, common_1.Get)('sales'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN, client_1.Role.COMPTABLE)];
        _getSalesStats_decorators = [(0, common_1.Get)('sales/stats'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.PHARMACIEN, client_1.Role.COMPTABLE)];
        __esDecorate(_classThis, null, _getAllMedications_decorators, { kind: "method", name: "getAllMedications", static: false, private: false, access: { has: function (obj) { return "getAllMedications" in obj; }, get: function (obj) { return obj.getAllMedications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getLowStock_decorators, { kind: "method", name: "getLowStock", static: false, private: false, access: { has: function (obj) { return "getLowStock" in obj; }, get: function (obj) { return obj.getLowStock; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getExpiring_decorators, { kind: "method", name: "getExpiring", static: false, private: false, access: { has: function (obj) { return "getExpiring" in obj; }, get: function (obj) { return obj.getExpiring; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMedicationById_decorators, { kind: "method", name: "getMedicationById", static: false, private: false, access: { has: function (obj) { return "getMedicationById" in obj; }, get: function (obj) { return obj.getMedicationById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createMedication_decorators, { kind: "method", name: "createMedication", static: false, private: false, access: { has: function (obj) { return "createMedication" in obj; }, get: function (obj) { return obj.createMedication; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateStock_decorators, { kind: "method", name: "updateStock", static: false, private: false, access: { has: function (obj) { return "updateStock" in obj; }, get: function (obj) { return obj.updateStock; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteMedication_decorators, { kind: "method", name: "deleteMedication", static: false, private: false, access: { has: function (obj) { return "deleteMedication" in obj; }, get: function (obj) { return obj.deleteMedication; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sellMedication_decorators, { kind: "method", name: "sellMedication", static: false, private: false, access: { has: function (obj) { return "sellMedication" in obj; }, get: function (obj) { return obj.sellMedication; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSales_decorators, { kind: "method", name: "getSales", static: false, private: false, access: { has: function (obj) { return "getSales" in obj; }, get: function (obj) { return obj.getSales; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSalesStats_decorators, { kind: "method", name: "getSalesStats", static: false, private: false, access: { has: function (obj) { return "getSalesStats" in obj; }, get: function (obj) { return obj.getSalesStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PharmacyController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PharmacyController = _classThis;
}();
exports.PharmacyController = PharmacyController;
