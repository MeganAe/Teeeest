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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
var common_1 = require("@nestjs/common");
var AuditService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuditService = _classThis = /** @class */ (function () {
        function AuditService_1(prisma) {
            this.prisma = prisma;
        }
        AuditService_1.prototype.log = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.auditLog.create({
                            data: {
                                userId: data.userId,
                                action: data.action,
                                entity: data.entity,
                                entityId: data.entityId,
                                oldValues: data.oldValues,
                                newValues: data.newValues,
                                ipAddress: data.ipAddress,
                                userAgent: data.userAgent,
                            },
                        })];
                });
            });
        };
        AuditService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, userId, entity, action, startDate, endDate, skip, where, _c, logs, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 50 : _b, userId = query.userId, entity = query.entity, action = query.action, startDate = query.startDate, endDate = query.endDate;
                            skip = (page - 1) * limit;
                            where = {};
                            if (userId)
                                where.userId = userId;
                            if (entity)
                                where.entity = entity;
                            if (action)
                                where.action = { contains: action, mode: 'insensitive' };
                            if (startDate || endDate) {
                                where.createdAt = {};
                                if (startDate)
                                    where.createdAt.gte = new Date(startDate);
                                if (endDate)
                                    where.createdAt.lte = new Date(endDate);
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.auditLog.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { createdAt: 'desc' },
                                        include: {
                                            user: {
                                                select: { id: true, email: true, firstName: true, lastName: true, role: true },
                                            },
                                        },
                                    }),
                                    this.prisma.auditLog.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), logs = _c[0], total = _c[1];
                            return [2 /*return*/, { logs: logs, total: total, page: parseInt(page), totalPages: Math.ceil(total / limit) }];
                    }
                });
            });
        };
        AuditService_1.prototype.getByUser = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, skip, _c, logs, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 50 : _b;
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.auditLog.findMany({
                                        where: { userId: userId },
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { createdAt: 'desc' },
                                        include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
                                    }),
                                    this.prisma.auditLog.count({ where: { userId: userId } }),
                                ])];
                        case 1:
                            _c = _d.sent(), logs = _c[0], total = _c[1];
                            return [2 /*return*/, { logs: logs, total: total, page: parseInt(page), totalPages: Math.ceil(total / limit) }];
                    }
                });
            });
        };
        AuditService_1.prototype.getByEntity = function (entity, entityId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.auditLog.findMany({
                            where: { entity: entity, entityId: entityId },
                            orderBy: { createdAt: 'desc' },
                            include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
                        })];
                });
            });
        };
        AuditService_1.prototype.getStats = function (days) {
            return __awaiter(this, void 0, void 0, function () {
                var startDate, logs, byAction, byEntity, byUser, byDay, _i, logs_1, log, dayKey;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            startDate = new Date();
                            startDate.setDate(startDate.getDate() - days);
                            return [4 /*yield*/, this.prisma.auditLog.findMany({
                                    where: { createdAt: { gte: startDate } },
                                })];
                        case 1:
                            logs = _a.sent();
                            byAction = {};
                            byEntity = {};
                            byUser = {};
                            byDay = {};
                            for (_i = 0, logs_1 = logs; _i < logs_1.length; _i++) {
                                log = logs_1[_i];
                                byAction[log.action] = (byAction[log.action] || 0) + 1;
                                byEntity[log.entity] = (byEntity[log.entity] || 0) + 1;
                                byUser[log.userId] = (byUser[log.userId] || 0) + 1;
                                dayKey = log.createdAt.toISOString().split('T')[0];
                                byDay[dayKey] = (byDay[dayKey] || 0) + 1;
                            }
                            return [2 /*return*/, {
                                    period: "".concat(days, " jours"),
                                    total: logs.length,
                                    byAction: byAction,
                                    byEntity: byEntity,
                                    byUser: byUser,
                                    byDay: Object.entries(byDay).map(function (_a) {
                                        var date = _a[0], count = _a[1];
                                        return ({ date: date, count: count });
                                    }),
                                }];
                    }
                });
            });
        };
        AuditService_1.prototype.export = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var logs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.auditLog.findMany({
                                where: { createdAt: { gte: startDate, lte: endDate } },
                                orderBy: { createdAt: 'desc' },
                                include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
                            })];
                        case 1:
                            logs = _a.sent();
                            return [2 /*return*/, logs];
                    }
                });
            });
        };
        return AuditService_1;
    }());
    __setFunctionName(_classThis, "AuditService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuditService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuditService = _classThis;
}();
exports.AuditService = AuditService;
