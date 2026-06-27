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
exports.TreatmentsService = void 0;
var common_1 = require("@nestjs/common");
var TreatmentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TreatmentsService = _classThis = /** @class */ (function () {
        function TreatmentsService_1(prisma) {
            this.prisma = prisma;
        }
        // ==================== KINÉSITHÉRAPIE ====================
        TreatmentsService_1.prototype.getAllKineSessions = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, patientId, status, skip, where, _c, sessions, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, patientId = query.patientId, status = query.status;
                            skip = (page - 1) * limit;
                            where = {};
                            if (patientId)
                                where.patientId = patientId;
                            if (status)
                                where.status = status;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.kineSession.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { createdAt: 'desc' },
                                        include: {
                                            patient: { select: { id: true, nom: true, prenom: true, numeroDossier: true } },
                                            therapist: { select: { id: true, firstName: true, lastName: true } },
                                        },
                                    }),
                                    this.prisma.kineSession.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), sessions = _c[0], total = _c[1];
                            return [2 /*return*/, { sessions: sessions, total: total, page: parseInt(page), totalPages: Math.ceil(total / limit) }];
                    }
                });
            });
        };
        TreatmentsService_1.prototype.getKineSessionsByPatient = function (patientId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.kineSession.findMany({
                            where: { patientId: patientId },
                            orderBy: { date: 'desc' },
                            include: { therapist: { select: { id: true, firstName: true, lastName: true } } },
                        })];
                });
            });
        };
        TreatmentsService_1.prototype.createKineSession = function (dto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var patient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.patient.findUnique({ where: { id: dto.patientId } })];
                        case 1:
                            patient = _a.sent();
                            if (!patient)
                                throw new common_1.NotFoundException('Patient non trouvé');
                            return [2 /*return*/, this.prisma.kineSession.create({
                                    data: {
                                        patientId: dto.patientId,
                                        date: new Date(dto.date),
                                        duration: dto.duration,
                                        exercises: dto.exercises,
                                        observations: dto.observations,
                                        status: dto.status || 'PLANIFIE',
                                        createdBy: userId,
                                    },
                                    include: { patient: true, therapist: true },
                                })];
                    }
                });
            });
        };
        TreatmentsService_1.prototype.updateKineSession = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.kineSession.findUnique({ where: { id: id } })];
                        case 1:
                            session = _a.sent();
                            if (!session)
                                throw new common_1.NotFoundException('Session non trouvée');
                            return [2 /*return*/, this.prisma.kineSession.update({ where: { id: id }, data: dto })];
                    }
                });
            });
        };
        // ==================== CHIRURGIE ====================
        TreatmentsService_1.prototype.getAllSurgeries = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, patientId, status, skip, where, _c, surgeries, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, patientId = query.patientId, status = query.status;
                            skip = (page - 1) * limit;
                            where = {};
                            if (patientId)
                                where.patientId = patientId;
                            if (status)
                                where.status = status;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.surgery.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { scheduledDate: 'desc' },
                                        include: {
                                            patient: { select: { id: true, nom: true, prenom: true, numeroDossier: true } },
                                            surgeon: { select: { id: true, firstName: true, lastName: true } },
                                        },
                                    }),
                                    this.prisma.surgery.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), surgeries = _c[0], total = _c[1];
                            return [2 /*return*/, { surgeries: surgeries, total: total, page: parseInt(page), totalPages: Math.ceil(total / limit) }];
                    }
                });
            });
        };
        TreatmentsService_1.prototype.getSurgeriesByPatient = function (patientId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.surgery.findMany({
                            where: { patientId: patientId },
                            orderBy: { scheduledDate: 'desc' },
                            include: { surgeon: { select: { id: true, firstName: true, lastName: true } } },
                        })];
                });
            });
        };
        TreatmentsService_1.prototype.createSurgery = function (dto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var patient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.patient.findUnique({ where: { id: dto.patientId } })];
                        case 1:
                            patient = _a.sent();
                            if (!patient)
                                throw new common_1.NotFoundException('Patient non trouvé');
                            return [2 /*return*/, this.prisma.surgery.create({
                                    data: {
                                        patientId: dto.patientId,
                                        type: dto.type,
                                        scheduledDate: new Date(dto.scheduledDate),
                                        description: dto.description,
                                        status: dto.status || 'PLANIFIE',
                                        createdBy: userId,
                                    },
                                    include: { patient: true, surgeon: true },
                                })];
                    }
                });
            });
        };
        TreatmentsService_1.prototype.updateSurgery = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var surgery;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.surgery.findUnique({ where: { id: id } })];
                        case 1:
                            surgery = _a.sent();
                            if (!surgery)
                                throw new common_1.NotFoundException('Chirurgie non trouvée');
                            return [2 /*return*/, this.prisma.surgery.update({ where: { id: id }, data: dto })];
                    }
                });
            });
        };
        // ==================== SOINS INFIRMIERS ====================
        TreatmentsService_1.prototype.getAllNursingCares = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, patientId, type, skip, where, _c, cares, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, patientId = query.patientId, type = query.type;
                            skip = (page - 1) * limit;
                            where = {};
                            if (patientId)
                                where.patientId = patientId;
                            if (type)
                                where.type = type;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.nursingCare.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { createdAt: 'desc' },
                                        include: {
                                            patient: { select: { id: true, nom: true, prenom: true, numeroDossier: true } },
                                            nurse: { select: { id: true, firstName: true, lastName: true } },
                                        },
                                    }),
                                    this.prisma.nursingCare.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), cares = _c[0], total = _c[1];
                            return [2 /*return*/, { cares: cares, total: total, page: parseInt(page), totalPages: Math.ceil(total / limit) }];
                    }
                });
            });
        };
        TreatmentsService_1.prototype.getNursingCaresByPatient = function (patientId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.nursingCare.findMany({
                            where: { patientId: patientId },
                            orderBy: { createdAt: 'desc' },
                            include: { nurse: { select: { id: true, firstName: true, lastName: true } } },
                        })];
                });
            });
        };
        TreatmentsService_1.prototype.createNursingCare = function (dto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var patient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.patient.findUnique({ where: { id: dto.patientId } })];
                        case 1:
                            patient = _a.sent();
                            if (!patient)
                                throw new common_1.NotFoundException('Patient non trouvé');
                            return [2 /*return*/, this.prisma.nursingCare.create({
                                    data: {
                                        patientId: dto.patientId,
                                        type: dto.type,
                                        description: dto.description,
                                        products: dto.products,
                                        observations: dto.observations,
                                        createdBy: userId,
                                    },
                                    include: { patient: true, nurse: true },
                                })];
                    }
                });
            });
        };
        TreatmentsService_1.prototype.updateNursingCare = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var care;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.nursingCare.findUnique({ where: { id: id } })];
                        case 1:
                            care = _a.sent();
                            if (!care)
                                throw new common_1.NotFoundException('Soin non trouvé');
                            return [2 /*return*/, this.prisma.nursingCare.update({ where: { id: id }, data: dto })];
                    }
                });
            });
        };
        return TreatmentsService_1;
    }());
    __setFunctionName(_classThis, "TreatmentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TreatmentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TreatmentsService = _classThis;
}();
exports.TreatmentsService = TreatmentsService;
