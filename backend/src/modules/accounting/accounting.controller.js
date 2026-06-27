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
exports.AccountingController = void 0;
var common_1 = require("@nestjs/common");
var roles_decorator_1 = require("../../common/decorators/roles.decorator");
var client_1 = require("@prisma/client");
var AccountingController = function () {
    var _classDecorators = [(0, common_1.Controller)('accounting')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getCashJournal_decorators;
    var _getLedger_decorators;
    var _getBalanceSheet_decorators;
    var _getIncomeStatement_decorators;
    var _getTreasury_decorators;
    var _createExpense_decorators;
    var _getExpenses_decorators;
    var AccountingController = _classThis = /** @class */ (function () {
        function AccountingController_1(accountingService) {
            this.accountingService = (__runInitializers(this, _instanceExtraInitializers), accountingService);
        }
        AccountingController_1.prototype.getCashJournal = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.accountingService.getCashJournal(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined)];
                });
            });
        };
        AccountingController_1.prototype.getLedger = function (account) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.accountingService.getLedger(account)];
                });
            });
        };
        AccountingController_1.prototype.getBalanceSheet = function (date) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.accountingService.getBalanceSheet(date ? new Date(date) : new Date())];
                });
            });
        };
        AccountingController_1.prototype.getIncomeStatement = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.accountingService.getIncomeStatement(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined)];
                });
            });
        };
        AccountingController_1.prototype.getTreasury = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.accountingService.getTreasury()];
                });
            });
        };
        AccountingController_1.prototype.createExpense = function (dto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.accountingService.createExpense(dto, userId)];
                });
            });
        };
        AccountingController_1.prototype.getExpenses = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.accountingService.getExpenses(query)];
                });
            });
        };
        return AccountingController_1;
    }());
    __setFunctionName(_classThis, "AccountingController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getCashJournal_decorators = [(0, common_1.Get)('cash-journal'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE)];
        _getLedger_decorators = [(0, common_1.Get)('ledger'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE)];
        _getBalanceSheet_decorators = [(0, common_1.Get)('balance-sheet'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE)];
        _getIncomeStatement_decorators = [(0, common_1.Get)('income-statement'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE)];
        _getTreasury_decorators = [(0, common_1.Get)('treasury'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE, client_1.Role.PERCEPTEUR)];
        _createExpense_decorators = [(0, common_1.Post)('expenses'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE)];
        _getExpenses_decorators = [(0, common_1.Get)('expenses'), (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.COMPTABLE)];
        __esDecorate(_classThis, null, _getCashJournal_decorators, { kind: "method", name: "getCashJournal", static: false, private: false, access: { has: function (obj) { return "getCashJournal" in obj; }, get: function (obj) { return obj.getCashJournal; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getLedger_decorators, { kind: "method", name: "getLedger", static: false, private: false, access: { has: function (obj) { return "getLedger" in obj; }, get: function (obj) { return obj.getLedger; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBalanceSheet_decorators, { kind: "method", name: "getBalanceSheet", static: false, private: false, access: { has: function (obj) { return "getBalanceSheet" in obj; }, get: function (obj) { return obj.getBalanceSheet; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getIncomeStatement_decorators, { kind: "method", name: "getIncomeStatement", static: false, private: false, access: { has: function (obj) { return "getIncomeStatement" in obj; }, get: function (obj) { return obj.getIncomeStatement; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTreasury_decorators, { kind: "method", name: "getTreasury", static: false, private: false, access: { has: function (obj) { return "getTreasury" in obj; }, get: function (obj) { return obj.getTreasury; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createExpense_decorators, { kind: "method", name: "createExpense", static: false, private: false, access: { has: function (obj) { return "createExpense" in obj; }, get: function (obj) { return obj.createExpense; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getExpenses_decorators, { kind: "method", name: "getExpenses", static: false, private: false, access: { has: function (obj) { return "getExpenses" in obj; }, get: function (obj) { return obj.getExpenses; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AccountingController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AccountingController = _classThis;
}();
exports.AccountingController = AccountingController;
