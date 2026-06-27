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
exports.PaymentsService = void 0;
var common_1 = require("@nestjs/common");
var PaymentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PaymentsService = _classThis = /** @class */ (function () {
        function PaymentsService_1(prisma) {
            this.prisma = prisma;
        }
        PaymentsService_1.prototype.generateReceiptNumber = function () {
            return __awaiter(this, void 0, void 0, function () {
                var year, month, lastPayment, sequence, lastNumber;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            year = new Date().getFullYear();
                            month = (new Date().getMonth() + 1).toString().padStart(2, '0');
                            return [4 /*yield*/, this.prisma.payment.findFirst({
                                    orderBy: { receiptNumber: 'desc' },
                                    where: { receiptNumber: { startsWith: "REC-".concat(year).concat(month) } },
                                })];
                        case 1:
                            lastPayment = _a.sent();
                            sequence = 1;
                            if (lastPayment) {
                                lastNumber = parseInt(lastPayment.receiptNumber.split('-')[2]);
                                sequence = lastNumber + 1;
                            }
                            return [2 /*return*/, "REC-".concat(year).concat(month, "-").concat(sequence.toString().padStart(6, '0'))];
                    }
                });
            });
        };
        PaymentsService_1.prototype.generateReference = function () {
            return __awaiter(this, void 0, void 0, function () {
                var timestamp, random;
                return __generator(this, function (_a) {
                    timestamp = Date.now();
                    random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                    return [2 /*return*/, "PAY-".concat(timestamp, "-").concat(random)];
                });
            });
        };
        PaymentsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, startDate, endDate, type, status, skip, where, _c, payments, total, totalAmount;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, startDate = query.startDate, endDate = query.endDate, type = query.type, status = query.status;
                            skip = (page - 1) * limit;
                            where = {};
                            if (startDate || endDate) {
                                where.createdAt = {};
                                if (startDate)
                                    where.createdAt.gte = new Date(startDate);
                                if (endDate)
                                    where.createdAt.lte = new Date(endDate);
                            }
                            if (type)
                                where.type = type;
                            if (status)
                                where.status = status;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.payment.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { createdAt: 'desc' },
                                        include: {
                                            patient: {
                                                select: { id: true, nom: true, prenom: true, numeroDossier: true },
                                            },
                                            collector: {
                                                select: { id: true, firstName: true, lastName: true },
                                            },
                                        },
                                    }),
                                    this.prisma.payment.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), payments = _c[0], total = _c[1];
                            return [4 /*yield*/, this.prisma.payment.aggregate({
                                    where: __assign(__assign({}, where), { status: 'COMPLETED' }),
                                    _sum: { montant: true },
                                })];
                        case 2:
                            totalAmount = _d.sent();
                            return [2 /*return*/, {
                                    payments: payments,
                                    total: total,
                                    totalAmount: totalAmount._sum.montant || 0,
                                    page: parseInt(page),
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        PaymentsService_1.prototype.getDailyClosure = function (date) {
            return __awaiter(this, void 0, void 0, function () {
                var startOfDay, endOfDay, payments, byMethod, byType, _i, payments_1, payment, total;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startOfDay = new Date(date);
                            startOfDay.setHours(0, 0, 0, 0);
                            endOfDay = new Date(date);
                            endOfDay.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.prisma.payment.findMany({
                                    where: {
                                        createdAt: { gte: startOfDay, lte: endOfDay },
                                        status: 'COMPLETED',
                                    },
                                    include: {
                                        collector: {
                                            select: { id: true, firstName: true, lastName: true },
                                        },
                                    },
                                })];
                        case 1:
                            payments = _a.sent();
                            byMethod = {
                                ESPECES: 0,
                                MOBILE_MONEY: 0,
                                CARTE: 0,
                                VIREMENT: 0,
                            };
                            byType = {};
                            for (_i = 0, payments_1 = payments; _i < payments_1.length; _i++) {
                                payment = payments_1[_i];
                                byMethod[payment.modePaiement] += payment.montant;
                                byType[payment.type] = (byType[payment.type] || 0) + payment.montant;
                            }
                            total = payments.reduce(function (sum, p) { return sum + p.montant; }, 0);
                            return [2 /*return*/, {
                                    date: date,
                                    total: total,
                                    byMethod: byMethod,
                                    byType: byType,
                                    count: payments.length,
                                    payments: payments,
                                }];
                    }
                });
            });
        };
        PaymentsService_1.prototype.getStats = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var where, payments, total, byType, byMethod, daily, _i, payments_2, payment, dateKey;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            where = { status: 'COMPLETED' };
                            if (startDate || endDate) {
                                where.createdAt = {};
                                if (startDate)
                                    where.createdAt.gte = startDate;
                                if (endDate)
                                    where.createdAt.lte = endDate;
                            }
                            return [4 /*yield*/, this.prisma.payment.findMany({ where: where })];
                        case 1:
                            payments = _a.sent();
                            total = payments.reduce(function (sum, p) { return sum + p.montant; }, 0);
                            byType = {};
                            byMethod = {};
                            daily = {};
                            for (_i = 0, payments_2 = payments; _i < payments_2.length; _i++) {
                                payment = payments_2[_i];
                                byType[payment.type] = (byType[payment.type] || 0) + payment.montant;
                                byMethod[payment.modePaiement] = (byMethod[payment.modePaiement] || 0) + payment.montant;
                                dateKey = payment.createdAt.toISOString().split('T')[0];
                                daily[dateKey] = (daily[dateKey] || 0) + payment.montant;
                            }
                            return [2 /*return*/, {
                                    total: total,
                                    count: payments.length,
                                    byType: byType,
                                    byMethod: byMethod,
                                    daily: Object.entries(daily).map(function (_a) {
                                        var date = _a[0], amount = _a[1];
                                        return ({ date: date, amount: amount });
                                    }),
                                }];
                    }
                });
            });
        };
        PaymentsService_1.prototype.getByReceiptNumber = function (receiptNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var payment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.payment.findUnique({
                                where: { receiptNumber: receiptNumber },
                                include: {
                                    patient: true,
                                    collector: true,
                                },
                            })];
                        case 1:
                            payment = _a.sent();
                            if (!payment) {
                                throw new common_1.NotFoundException("Re\u00E7u ".concat(receiptNumber, " non trouv\u00E9"));
                            }
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        PaymentsService_1.prototype.getByPatient = function (patientId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.payment.findMany({
                            where: { patientId: patientId },
                            orderBy: { createdAt: 'desc' },
                            include: {
                                collector: {
                                    select: { id: true, firstName: true, lastName: true },
                                },
                            },
                        })];
                });
            });
        };
        PaymentsService_1.prototype.create = function (createPaymentDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var receiptNumber, reference;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.generateReceiptNumber()];
                        case 1:
                            receiptNumber = _a.sent();
                            return [4 /*yield*/, this.generateReference()];
                        case 2:
                            reference = _a.sent();
                            return [2 /*return*/, this.prisma.payment.create({
                                    data: {
                                        patientId: createPaymentDto.patientId,
                                        montant: createPaymentDto.montant,
                                        type: createPaymentDto.type,
                                        reference: reference,
                                        modePaiement: createPaymentDto.modePaiement,
                                        receiptNumber: receiptNumber,
                                        collectedBy: userId,
                                    },
                                    include: {
                                        patient: {
                                            select: { id: true, nom: true, prenom: true, numeroDossier: true },
                                        },
                                        collector: {
                                            select: { id: true, firstName: true, lastName: true },
                                        },
                                    },
                                })];
                    }
                });
            });
        };
        PaymentsService_1.prototype.update = function (id, updatePaymentDto) {
            return __awaiter(this, void 0, void 0, function () {
                var payment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.payment.findUnique({ where: { id: id } })];
                        case 1:
                            payment = _a.sent();
                            if (!payment) {
                                throw new common_1.NotFoundException("Paiement avec ID ".concat(id, " non trouv\u00E9"));
                            }
                            return [2 /*return*/, this.prisma.payment.update({
                                    where: { id: id },
                                    data: updatePaymentDto,
                                })];
                    }
                });
            });
        };
        PaymentsService_1.prototype.refund = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var payment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.payment.findUnique({ where: { id: id } })];
                        case 1:
                            payment = _a.sent();
                            if (!payment) {
                                throw new common_1.NotFoundException("Paiement avec ID ".concat(id, " non trouv\u00E9"));
                            }
                            if (payment.status === 'REFUNDED') {
                                throw new common_1.BadRequestException('Ce paiement a déjà été remboursé');
                            }
                            return [2 /*return*/, this.prisma.payment.update({
                                    where: { id: id },
                                    data: { status: 'REFUNDED' },
                                })];
                    }
                });
            });
        };
        return PaymentsService_1;
    }());
    __setFunctionName(_classThis, "PaymentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentsService = _classThis;
}();
exports.PaymentsService = PaymentsService;
