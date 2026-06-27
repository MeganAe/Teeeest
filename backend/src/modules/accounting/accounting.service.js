"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.AccountingService = void 0;
var common_1 = require("@nestjs/common");
var AccountingService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AccountingService = _classThis = /** @class */ (function () {
        function AccountingService_1(prisma) {
            this.prisma = prisma;
        }
        AccountingService_1.prototype.getCashJournal = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, incomes, expenses, totalIncome, totalExpense;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = {};
                            if (startDate || endDate) {
                                where.createdAt = {};
                                if (startDate)
                                    where.createdAt.gte = startDate;
                                if (endDate)
                                    where.createdAt.lte = endDate;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.payment.findMany({ where: __assign(__assign({}, where), { status: 'COMPLETED' }) }),
                                    this.prisma.expense.findMany({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), incomes = _a[0], expenses = _a[1];
                            totalIncome = incomes.reduce(function (sum, i) { return sum + i.montant; }, 0);
                            totalExpense = expenses.reduce(function (sum, e) { return sum + e.amount; }, 0);
                            return [2 /*return*/, {
                                    period: { startDate: startDate, endDate: endDate },
                                    incomes: { total: totalIncome, items: incomes },
                                    expenses: { total: totalExpense, items: expenses },
                                    balance: totalIncome - totalExpense,
                                }];
                    }
                });
            });
        };
        AccountingService_1.prototype.getLedger = function (account) {
            return __awaiter(this, void 0, void 0, function () {
                var where, expenses, grouped;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            where = {};
                            if (account)
                                where.account = account;
                            return [4 /*yield*/, this.prisma.expense.findMany({
                                    where: where,
                                    orderBy: { date: 'desc' },
                                })];
                        case 1:
                            expenses = _a.sent();
                            grouped = expenses.reduce(function (acc, e) {
                                if (!acc[e.account])
                                    acc[e.account] = { total: 0, items: [] };
                                acc[e.account].total += e.amount;
                                acc[e.account].items.push(e);
                                return acc;
                            }, {});
                            return [2 /*return*/, grouped];
                    }
                });
            });
        };
        AccountingService_1.prototype.getBalanceSheet = function (date) {
            return __awaiter(this, void 0, void 0, function () {
                var endDate, _a, totalIncome, totalExpenses, pendingPayments, assets, liabilities;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            endDate = new Date(date);
                            endDate.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.payment.aggregate({
                                        where: { createdAt: { lte: endDate }, status: 'COMPLETED' },
                                        _sum: { montant: true },
                                    }),
                                    this.prisma.expense.aggregate({
                                        where: { date: { lte: endDate } },
                                        _sum: { amount: true },
                                    }),
                                    this.prisma.payment.aggregate({
                                        where: { createdAt: { lte: endDate }, status: 'PENDING' },
                                        _sum: { montant: true },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), totalIncome = _a[0], totalExpenses = _a[1], pendingPayments = _a[2];
                            assets = (totalIncome._sum.montant || 0) - (totalExpenses._sum.amount || 0);
                            liabilities = pendingPayments._sum.montant || 0;
                            return [2 /*return*/, {
                                    date: date,
                                    assets: assets,
                                    liabilities: liabilities,
                                    equity: assets - liabilities,
                                    details: { totalIncome: totalIncome._sum.montant || 0, totalExpenses: totalExpenses._sum.amount || 0, pendingPayments: liabilities },
                                }];
                    }
                });
            });
        };
        AccountingService_1.prototype.getIncomeStatement = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, incomes, expenses, byType, byCategory, totalIncome, totalExpense;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = {};
                            if (startDate || endDate) {
                                where.createdAt = {};
                                if (startDate)
                                    where.createdAt.gte = startDate;
                                if (endDate)
                                    where.createdAt.lte = endDate;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.payment.findMany({ where: __assign(__assign({}, where), { status: 'COMPLETED' }) }),
                                    this.prisma.expense.findMany({ where: __assign({}, where) }),
                                ])];
                        case 1:
                            _a = _b.sent(), incomes = _a[0], expenses = _a[1];
                            byType = incomes.reduce(function (acc, i) {
                                acc[i.type] = (acc[i.type] || 0) + i.montant;
                                return acc;
                            }, {});
                            byCategory = expenses.reduce(function (acc, e) {
                                acc[e.category] = (acc[e.category] || 0) + e.amount;
                                return acc;
                            }, {});
                            totalIncome = incomes.reduce(function (sum, i) { return sum + i.montant; }, 0);
                            totalExpense = expenses.reduce(function (sum, e) { return sum + e.amount; }, 0);
                            return [2 /*return*/, {
                                    period: { startDate: startDate, endDate: endDate },
                                    revenue: { total: totalIncome, byType: byType },
                                    expenses: { total: totalExpense, byCategory: byCategory },
                                    netIncome: totalIncome - totalExpense,
                                }];
                    }
                });
            });
        };
        AccountingService_1.prototype.getTreasury = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, totalIncome, totalExpenses, last30DaysIncome, last30DaysExpenses;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { montant: true } }),
                                this.prisma.expense.aggregate({ _sum: { amount: true } }),
                            ])];
                        case 1:
                            _a = _b.sent(), totalIncome = _a[0], totalExpenses = _a[1];
                            return [4 /*yield*/, this.prisma.payment.aggregate({
                                    where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, status: 'COMPLETED' },
                                    _sum: { montant: true },
                                })];
                        case 2:
                            last30DaysIncome = _b.sent();
                            return [4 /*yield*/, this.prisma.expense.aggregate({
                                    where: { date: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
                                    _sum: { amount: true },
                                })];
                        case 3:
                            last30DaysExpenses = _b.sent();
                            return [2 /*return*/, {
                                    currentBalance: (totalIncome._sum.montant || 0) - (totalExpenses._sum.amount || 0),
                                    last30Days: {
                                        income: last30DaysIncome._sum.montant || 0,
                                        expenses: last30DaysExpenses._sum.amount || 0,
                                        balance: (last30DaysIncome._sum.montant || 0) - (last30DaysExpenses._sum.amount || 0),
                                    },
                                }];
                    }
                });
            });
        };
        AccountingService_1.prototype.createExpense = function (dto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.expense.create({
                            data: {
                                description: dto.description,
                                amount: dto.amount,
                                category: dto.category,
                                account: dto.account,
                                date: new Date(dto.date),
                                createdBy: userId,
                            },
                        })];
                });
            });
        };
        AccountingService_1.prototype.getExpenses = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, category, startDate, endDate, skip, where, _c, expenses, total, totalAmount;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, category = query.category, startDate = query.startDate, endDate = query.endDate;
                            skip = (page - 1) * limit;
                            where = {};
                            if (category)
                                where.category = category;
                            if (startDate || endDate) {
                                where.date = {};
                                if (startDate)
                                    where.date.gte = new Date(startDate);
                                if (endDate)
                                    where.date.lte = new Date(endDate);
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.expense.findMany({ where: where, skip: skip, take: parseInt(limit), orderBy: { date: 'desc' } }),
                                    this.prisma.expense.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), expenses = _c[0], total = _c[1];
                            totalAmount = expenses.reduce(function (sum, e) { return sum + e.amount; }, 0);
                            return [2 /*return*/, { expenses: expenses, total: total, totalAmount: totalAmount, page: parseInt(page), totalPages: Math.ceil(total / limit) }];
                    }
                });
            });
        };
        return AccountingService_1;
    }());
    __setFunctionName(_classThis, "AccountingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AccountingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AccountingService = _classThis;
}();
exports.AccountingService = AccountingService;
