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
exports.PatientsService = void 0;
var common_1 = require("@nestjs/common");
var PatientsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PatientsService = _classThis = /** @class */ (function () {
        function PatientsService_1(prisma) {
            this.prisma = prisma;
        }
        PatientsService_1.prototype.generateNumeroDossier = function () {
            return __awaiter(this, void 0, void 0, function () {
                var year, lastPatient, sequence, lastNumber;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            year = new Date().getFullYear();
                            return [4 /*yield*/, this.prisma.patient.findFirst({
                                    orderBy: { numeroDossier: 'desc' },
                                    where: { numeroDossier: { startsWith: "AMKA-".concat(year) } },
                                })];
                        case 1:
                            lastPatient = _a.sent();
                            sequence = 1;
                            if (lastPatient) {
                                lastNumber = parseInt(lastPatient.numeroDossier.split('-')[2]);
                                sequence = lastNumber + 1;
                            }
                            return [2 /*return*/, "AMKA-".concat(year, "-").concat(sequence.toString().padStart(5, '0'))];
                    }
                });
            });
        };
        PatientsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, search, skip, where, _c, patients, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, search = query.search;
                            skip = (page - 1) * limit;
                            where = {};
                            if (search) {
                                where.OR = [
                                    { nom: { contains: search, mode: 'insensitive' } },
                                    { prenom: { contains: search, mode: 'insensitive' } },
                                    { numeroDossier: { contains: search } },
                                ];
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.patient.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { createdAt: 'desc' },
                                        include: {
                                            creator: {
                                                select: { id: true, firstName: true, lastName: true },
                                            },
                                        },
                                    }),
                                    this.prisma.patient.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), patients = _c[0], total = _c[1];
                            return [2 /*return*/, {
                                    patients: patients,
                                    total: total,
                                    page: parseInt(page),
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        PatientsService_1.prototype.search = function (searchDto) {
            return __awaiter(this, void 0, void 0, function () {
                var q, type, where;
                return __generator(this, function (_a) {
                    q = searchDto.q, type = searchDto.type;
                    where = {
                        OR: [
                            { nom: { contains: q, mode: 'insensitive' } },
                            { prenom: { contains: q, mode: 'insensitive' } },
                            { numeroDossier: { contains: q } },
                            { telephone: { contains: q } },
                        ],
                    };
                    if (type) {
                        where.typeHandicap = type;
                    }
                    return [2 /*return*/, this.prisma.patient.findMany({
                            where: where,
                            take: 20,
                            orderBy: { createdAt: 'desc' },
                        })];
                });
            });
        };
        PatientsService_1.prototype.findByNumeroDossier = function (numeroDossier) {
            return __awaiter(this, void 0, void 0, function () {
                var patient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.patient.findUnique({
                                where: { numeroDossier: numeroDossier },
                                include: {
                                    consultations: {
                                        orderBy: { dateConsultation: 'desc' },
                                        take: 10,
                                        include: {
                                            medecin: {
                                                select: { id: true, firstName: true, lastName: true },
                                            },
                                        },
                                    },
                                    payments: {
                                        orderBy: { createdAt: 'desc' },
                                        take: 10,
                                    },
                                    hospitalizations: {
                                        where: { status: 'ACTIVE' },
                                    },
                                },
                            })];
                        case 1:
                            patient = _a.sent();
                            if (!patient) {
                                throw new common_1.NotFoundException("Patient avec dossier ".concat(numeroDossier, " non trouv\u00E9"));
                            }
                            return [2 /*return*/, patient];
                    }
                });
            });
        };
        PatientsService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var patient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.patient.findUnique({
                                where: { id: id },
                                include: {
                                    creator: {
                                        select: { id: true, firstName: true, lastName: true },
                                    },
                                    consultations: {
                                        orderBy: { dateConsultation: 'desc' },
                                        take: 20,
                                        include: {
                                            medecin: {
                                                select: { id: true, firstName: true, lastName: true },
                                            },
                                            prescriptions: true,
                                        },
                                    },
                                    payments: {
                                        orderBy: { createdAt: 'desc' },
                                    },
                                    hospitalizations: {
                                        include: {
                                            dailyFollowups: true,
                                        },
                                    },
                                },
                            })];
                        case 1:
                            patient = _a.sent();
                            if (!patient) {
                                throw new common_1.NotFoundException("Patient avec ID ".concat(id, " non trouv\u00E9"));
                            }
                            return [2 /*return*/, patient];
                    }
                });
            });
        };
        PatientsService_1.prototype.getHistory = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var patient, stats;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            patient = _b.sent();
                            stats = {
                                totalConsultations: patient.consultations.length,
                                totalPayments: patient.payments.reduce(function (sum, p) { return sum + p.montant; }, 0),
                                totalHospitalizations: patient.hospitalizations.length,
                                lastVisit: (_a = patient.consultations[0]) === null || _a === void 0 ? void 0 : _a.dateConsultation,
                            };
                            return [2 /*return*/, {
                                    patient: patient,
                                    stats: stats,
                                    timeline: __spreadArray(__spreadArray(__spreadArray([], patient.consultations.map(function (c) { return ({ type: 'consultation', data: c, date: c.dateConsultation }); }), true), patient.payments.map(function (p) { return ({ type: 'payment', data: p, date: p.createdAt }); }), true), patient.hospitalizations.map(function (h) { return ({ type: 'hospitalization', data: h, date: h.dateAdmission }); }), true).sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); }),
                                }];
                    }
                });
            });
        };
        PatientsService_1.prototype.create = function (createPatientDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var numeroDossier;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.generateNumeroDossier()];
                        case 1:
                            numeroDossier = _a.sent();
                            return [2 /*return*/, this.prisma.patient.create({
                                    data: {
                                        numeroDossier: numeroDossier,
                                        nom: createPatientDto.nom,
                                        postnom: createPatientDto.postnom,
                                        prenom: createPatientDto.prenom,
                                        sexe: createPatientDto.sexe,
                                        dateNaissance: new Date(createPatientDto.dateNaissance),
                                        telephone: createPatientDto.telephone,
                                        adresse: createPatientDto.adresse,
                                        contactUrgence: createPatientDto.contactUrgence,
                                        typeHandicap: createPatientDto.typeHandicap,
                                        createdBy: userId,
                                    },
                                })];
                    }
                });
            });
        };
        PatientsService_1.prototype.update = function (id, updatePatientDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.patient.update({
                                    where: { id: id },
                                    data: __assign(__assign({}, updatePatientDto), { dateNaissance: updatePatientDto.dateNaissance ? new Date(updatePatientDto.dateNaissance) : undefined }),
                                })];
                    }
                });
            });
        };
        PatientsService_1.prototype.delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.patient.update({
                                    where: { id: id },
                                    data: { isActive: false },
                                })];
                    }
                });
            });
        };
        PatientsService_1.prototype.uploadPhoto = function (id, file) {
            return __awaiter(this, void 0, void 0, function () {
                var photoUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            photoUrl = "/uploads/patients/".concat(file.filename);
                            return [2 /*return*/, this.prisma.patient.update({
                                    where: { id: id },
                                    data: { photo: photoUrl },
                                })];
                    }
                });
            });
        };
        return PatientsService_1;
    }());
    __setFunctionName(_classThis, "PatientsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PatientsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PatientsService = _classThis;
}();
exports.PatientsService = PatientsService;
