"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
var common_1 = require("@nestjs/common");
var DashboardService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DashboardService = _classThis = /** @class */ (function () {
        function DashboardService_1(prisma) {
            this.prisma = prisma;
        }
        DashboardService_1.prototype.getStats = function (date) {
            return __awaiter(this, void 0, void 0, function () {
                var startOfDay, endOfDay, _a, patientsJour, consultationsJour, recettesJour, examensRealises, hospitalisations, ventesPharmacie;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            startOfDay = new Date(date);
                            startOfDay.setHours(0, 0, 0, 0);
                            endOfDay = new Date(date);
                            endOfDay.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.patient.count({
                                        where: { createdAt: { gte: startOfDay, lte: endOfDay } },
                                    }),
                                    this.prisma.consultation.count({
                                        where: { dateConsultation: { gte: startOfDay, lte: endOfDay } },
                                    }),
                                    this.prisma.payment.aggregate({
                                        where: { createdAt: { gte: startOfDay, lte: endOfDay }, status: 'COMPLETED' },
                                        _sum: { montant: true },
                                    }),
                                    this.prisma.examRequest.count({
                                        where: { requestedAt: { gte: startOfDay, lte: endOfDay }, status: 'COMPLETED' },
                                    }),
                                    this.prisma.hospitalization.count({
                                        where: { status: 'ACTIVE' },
                                    }),
                                    this.prisma.sale.aggregate({
                                        where: { soldAt: { gte: startOfDay, lte: endOfDay } },
                                        _sum: { totalPrice: true },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), patientsJour = _a[0], consultationsJour = _a[1], recettesJour = _a[2], examensRealises = _a[3], hospitalisations = _a[4], ventesPharmacie = _a[5];
                            return [2 /*return*/, {
                                    patientsJour: patientsJour,
                                    consultationsJour: consultationsJour,
                                    recettesJour: recettesJour._sum.montant || 0,
                                    examensRealises: examensRealises,
                                    hospitalisations: hospitalisations,
                                    ventesPharmacie: ventesPharmacie._sum.totalPrice || 0,
                                }];
                    }
                });
            });
        };
        DashboardService_1.prototype.getRecentActivities = function (limit) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, consultations, payments, patients, activities;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.consultation.findMany({
                                    take: limit,
                                    orderBy: { createdAt: 'desc' },
                                    include: {
                                        patient: { select: { nom: true, prenom: true } },
                                        medecin: { select: { firstName: true, lastName: true } },
                                    },
                                }),
                                this.prisma.payment.findMany({
                                    take: limit,
                                    orderBy: { createdAt: 'desc' },
                                    include: {
                                        patient: { select: { nom: true, prenom: true } },
                                        collector: { select: { firstName: true, lastName: true } },
                                    },
                                }),
                                this.prisma.patient.findMany({
                                    take: limit,
                                    orderBy: { createdAt: 'desc' },
                                    include: {
                                        creator: { select: { firstName: true, lastName: true } },
                                    },
                                }),
                            ])];
                        case 1:
                            _a = _b.sent(), consultations = _a[0], payments = _a[1], patients = _a[2];
                            activities = __spreadArray(__spreadArray(__spreadArray([], consultations.map(function (c) { return ({
                                type: 'consultation',
                                action: 'Nouvelle consultation',
                                patient: "".concat(c.patient.nom, " ").concat(c.patient.prenom),
                                user: "".concat(c.medecin.firstName, " ").concat(c.medecin.lastName),
                                time: c.createdAt,
                            }); }), true), payments.map(function (p) { return ({
                                type: 'payment',
                                action: "Paiement de ".concat(p.montant.toLocaleString(), " FC"),
                                patient: "".concat(p.patient.nom, " ").concat(p.patient.prenom),
                                user: "".concat(p.collector.firstName, " ").concat(p.collector.lastName),
                                time: p.createdAt,
                            }); }), true), patients.map(function (p) { return ({
                                type: 'patient',
                                action: 'Nouveau patient enregistré',
                                patient: "".concat(p.nom, " ").concat(p.prenom),
                                user: "".concat(p.creator.firstName, " ").concat(p.creator.lastName),
                                time: p.createdAt,
                            }); }), true);
                            return [2 /*return*/, activities.sort(function (a, b) { return new Date(b.time).getTime() - new Date(a.time).getTime(); }).slice(0, limit)];
                    }
                });
            });
        };
        DashboardService_1.prototype.getPatientsTimeline = function (days) {
            return __awaiter(this, void 0, void 0, function () {
                var timeline, i, date, nextDate, count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            timeline = [];
                            i = days - 1;
                            _a.label = 1;
                        case 1:
                            if (!(i >= 0)) return [3 /*break*/, 4];
                            date = new Date();
                            date.setDate(date.getDate() - i);
                            date.setHours(0, 0, 0, 0);
                            nextDate = new Date(date);
                            nextDate.setDate(nextDate.getDate() + 1);
                            return [4 /*yield*/, this.prisma.patient.count({
                                    where: {
                                        createdAt: { gte: date, lt: nextDate },
                                    },
                                })];
                        case 2:
                            count = _a.sent();
                            timeline.push({
                                date: date.toISOString().split('T')[0],
                                count: count,
                            });
                            _a.label = 3;
                        case 3:
                            i--;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, timeline];
                    }
                });
            });
        };
        DashboardService_1.prototype.getRevenueTimeline = function (days) {
            return __awaiter(this, void 0, void 0, function () {
                var timeline, i, date, nextDate, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            timeline = [];
                            i = days - 1;
                            _a.label = 1;
                        case 1:
                            if (!(i >= 0)) return [3 /*break*/, 4];
                            date = new Date();
                            date.setDate(date.getDate() - i);
                            date.setHours(0, 0, 0, 0);
                            nextDate = new Date(date);
                            nextDate.setDate(nextDate.getDate() + 1);
                            return [4 /*yield*/, this.prisma.payment.aggregate({
                                    where: {
                                        createdAt: { gte: date, lt: nextDate },
                                        status: 'COMPLETED',
                                    },
                                    _sum: { montant: true },
                                })];
                        case 2:
                            result = _a.sent();
                            timeline.push({
                                date: date.toISOString().split('T')[0],
                                amount: result._sum.montant || 0,
                            });
                            _a.label = 3;
                        case 3:
                            i--;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, timeline];
                    }
                });
            });
        };
        DashboardService_1.prototype.getConsultationsStats = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, total, byMedecin, byStatus;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = {};
                            if (startDate || endDate) {
                                where.dateConsultation = {};
                                if (startDate)
                                    where.dateConsultation.gte = startDate;
                                if (endDate)
                                    where.dateConsultation.lte = endDate;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.consultation.count({ where: where }),
                                    this.prisma.consultation.groupBy({
                                        by: ['medecinId'],
                                        where: where,
                                        _count: true,
                                    }),
                                    this.prisma.consultation.groupBy({
                                        by: ['status'],
                                        where: where,
                                        _count: true,
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), total = _a[0], byMedecin = _a[1], byStatus = _a[2];
                            return [2 /*return*/, { total: total, byMedecin: byMedecin, byStatus: byStatus }];
                    }
                });
            });
        };
        DashboardService_1.prototype.getHospitalizationStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, active, available;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.hospitalization.count({ where: { status: 'ACTIVE' } }),
                                this.prisma.hospitalization.count({ where: { status: 'DISCHARGED' } }),
                            ])];
                        case 1:
                            _a = _b.sent(), active = _a[0], available = _a[1];
                            return [2 /*return*/, {
                                    active: active,
                                    discharged: available,
                                    occupancyRate: active + available > 0 ? (active / (active + available)) * 100 : 0,
                                }];
                    }
                });
            });
        };
        DashboardService_1.prototype.getAlerts = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, lowStock, expiring, waitingConsultations;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.medication.findMany({
                                    where: {
                                        stock: { lte: this.prisma.medication.fields.threshold },
                                    },
                                    select: { name: true, stock: true, threshold: true },
                                }),
                                this.prisma.medication.findMany({
                                    where: {
                                        expiryDate: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
                                    },
                                    select: { name: true, expiryDate: true },
                                }),
                                this.prisma.consultation.count({
                                    where: { status: 'EN_ATTENTE' },
                                }),
                            ])];
                        case 1:
                            _a = _b.sent(), lowStock = _a[0], expiring = _a[1], waitingConsultations = _a[2];
                            return [2 /*return*/, {
                                    lowStock: lowStock,
                                    expiring: expiring,
                                    waitingConsultations: waitingConsultations,
                                }];
                    }
                });
            });
        };
        return DashboardService_1;
    }());
    __setFunctionName(_classThis, "DashboardService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardService = _classThis;
}();
exports.DashboardService = DashboardService;
