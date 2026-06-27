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
exports.ConsultationsService = void 0;
var common_1 = require("@nestjs/common");
var ConsultationsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ConsultationsService = _classThis = /** @class */ (function () {
        function ConsultationsService_1(prisma) {
            this.prisma = prisma;
        }
        ConsultationsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, patientId, medecinId, status, startDate, endDate, skip, where, _c, consultations, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, patientId = query.patientId, medecinId = query.medecinId, status = query.status, startDate = query.startDate, endDate = query.endDate;
                            skip = (page - 1) * limit;
                            where = {};
                            if (patientId)
                                where.patientId = patientId;
                            if (medecinId)
                                where.medecinId = medecinId;
                            if (status)
                                where.status = status;
                            if (startDate || endDate) {
                                where.dateConsultation = {};
                                if (startDate)
                                    where.dateConsultation.gte = new Date(startDate);
                                if (endDate)
                                    where.dateConsultation.lte = new Date(endDate);
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.consultation.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { dateConsultation: 'desc' },
                                        include: {
                                            patient: {
                                                select: { id: true, nom: true, prenom: true, numeroDossier: true, sexe: true, dateNaissance: true },
                                            },
                                            medecin: {
                                                select: { id: true, firstName: true, lastName: true, role: true },
                                            },
                                            prescriptions: true,
                                        },
                                    }),
                                    this.prisma.consultation.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), consultations = _c[0], total = _c[1];
                            return [2 /*return*/, {
                                    consultations: consultations,
                                    total: total,
                                    page: parseInt(page),
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        ConsultationsService_1.prototype.getWaitingQueue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var consultations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.consultation.findMany({
                                where: { status: 'EN_ATTENTE' },
                                orderBy: { dateConsultation: 'asc' },
                                include: {
                                    patient: {
                                        select: { id: true, nom: true, prenom: true, numeroDossier: true },
                                    },
                                },
                            })];
                        case 1:
                            consultations = _a.sent();
                            return [2 /*return*/, consultations.map(function (c, index) { return (__assign(__assign({}, c), { position: index + 1, estimatedWaitTime: index * 15 })); })];
                    }
                });
            });
        };
        ConsultationsService_1.prototype.getByPatient = function (patientId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.consultation.findMany({
                            where: { patientId: patientId },
                            orderBy: { dateConsultation: 'desc' },
                            include: {
                                medecin: {
                                    select: { id: true, firstName: true, lastName: true },
                                },
                                prescriptions: true,
                                examRequests: true,
                            },
                        })];
                });
            });
        };
        ConsultationsService_1.prototype.getToday = function (medecinId) {
            return __awaiter(this, void 0, void 0, function () {
                var startOfDay, endOfDay;
                return __generator(this, function (_a) {
                    startOfDay = new Date();
                    startOfDay.setHours(0, 0, 0, 0);
                    endOfDay = new Date();
                    endOfDay.setHours(23, 59, 59, 999);
                    return [2 /*return*/, this.prisma.consultation.findMany({
                            where: {
                                medecinId: medecinId,
                                dateConsultation: { gte: startOfDay, lte: endOfDay },
                            },
                            orderBy: { dateConsultation: 'asc' },
                            include: {
                                patient: {
                                    select: { id: true, nom: true, prenom: true, numeroDossier: true },
                                },
                            },
                        })];
                });
            });
        };
        ConsultationsService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var consultation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.consultation.findUnique({
                                where: { id: id },
                                include: {
                                    patient: true,
                                    medecin: {
                                        select: { id: true, firstName: true, lastName: true, role: true },
                                    },
                                    prescriptions: true,
                                    examRequests: {
                                        include: {
                                            examResult: true,
                                        },
                                    },
                                },
                            })];
                        case 1:
                            consultation = _a.sent();
                            if (!consultation) {
                                throw new common_1.NotFoundException("Consultation avec ID ".concat(id, " non trouv\u00E9e"));
                            }
                            return [2 /*return*/, consultation];
                    }
                });
            });
        };
        ConsultationsService_1.prototype.create = function (createConsultationDto, medecinId) {
            return __awaiter(this, void 0, void 0, function () {
                var patient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.patient.findUnique({
                                where: { id: createConsultationDto.patientId },
                            })];
                        case 1:
                            patient = _a.sent();
                            if (!patient) {
                                throw new common_1.NotFoundException('Patient non trouvé');
                            }
                            return [2 /*return*/, this.prisma.consultation.create({
                                    data: {
                                        patientId: createConsultationDto.patientId,
                                        medecinId: medecinId,
                                        motif: createConsultationDto.motif,
                                        diagnostic: createConsultationDto.diagnostic,
                                        tension: createConsultationDto.tension,
                                        temperature: createConsultationDto.temperature,
                                        poids: createConsultationDto.poids,
                                        taille: createConsultationDto.taille,
                                        traitement: createConsultationDto.traitement,
                                        notes: createConsultationDto.notes,
                                        status: 'EN_ATTENTE',
                                    },
                                    include: {
                                        patient: true,
                                        medecin: true,
                                    },
                                })];
                    }
                });
            });
        };
        ConsultationsService_1.prototype.update = function (id, updateConsultationDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.consultation.update({
                                    where: { id: id },
                                    data: {
                                        diagnostic: updateConsultationDto.diagnostic,
                                        tension: updateConsultationDto.tension,
                                        temperature: updateConsultationDto.temperature,
                                        poids: updateConsultationDto.poids,
                                        taille: updateConsultationDto.taille,
                                        traitement: updateConsultationDto.traitement,
                                        notes: updateConsultationDto.notes,
                                    },
                                })];
                    }
                });
            });
        };
        ConsultationsService_1.prototype.updateStatus = function (id, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.consultation.update({
                                    where: { id: id },
                                    data: { status: status },
                                })];
                    }
                });
            });
        };
        ConsultationsService_1.prototype.addPrescription = function (consultationId, createPrescriptionDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(consultationId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.prescription.create({
                                    data: {
                                        consultationId: consultationId,
                                        medicament: createPrescriptionDto.medicament,
                                        dosage: createPrescriptionDto.dosage,
                                        duree: createPrescriptionDto.duree,
                                        instructions: createPrescriptionDto.instructions,
                                    },
                                })];
                    }
                });
            });
        };
        ConsultationsService_1.prototype.getPrescriptions = function (consultationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(consultationId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.prescription.findMany({
                                    where: { consultationId: consultationId },
                                    orderBy: { createdAt: 'desc' },
                                })];
                    }
                });
            });
        };
        ConsultationsService_1.prototype.generateReport = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var consultation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            consultation = _a.sent();
                            return [2 /*return*/, {
                                    consultation: consultation,
                                    reportDate: new Date(),
                                    generatedBy: consultation.medecin,
                                    summary: {
                                        patientName: "".concat(consultation.patient.nom, " ").concat(consultation.patient.prenom),
                                        patientDossier: consultation.patient.numeroDossier,
                                        consultationDate: consultation.dateConsultation,
                                        medecinName: "".concat(consultation.medecin.firstName, " ").concat(consultation.medecin.lastName),
                                        diagnostic: consultation.diagnostic,
                                        treatment: consultation.traitement,
                                        prescriptions: consultation.prescriptions,
                                    },
                                }];
                    }
                });
            });
        };
        return ConsultationsService_1;
    }());
    __setFunctionName(_classThis, "ConsultationsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConsultationsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConsultationsService = _classThis;
}();
exports.ConsultationsService = ConsultationsService;
