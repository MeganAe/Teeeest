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
exports.HospitalizationsService = void 0;
var common_1 = require("@nestjs/common");
var HospitalizationsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HospitalizationsService = _classThis = /** @class */ (function () {
        function HospitalizationsService_1(prisma) {
            this.prisma = prisma;
        }
        HospitalizationsService_1.prototype.findAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, status, startDate, endDate, skip, where, _c, hospitalizations, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, status = query.status, startDate = query.startDate, endDate = query.endDate;
                            skip = (page - 1) * limit;
                            where = {};
                            if (status)
                                where.status = status;
                            if (startDate || endDate) {
                                where.dateAdmission = {};
                                if (startDate)
                                    where.dateAdmission.gte = new Date(startDate);
                                if (endDate)
                                    where.dateAdmission.lte = new Date(endDate);
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.hospitalization.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { dateAdmission: 'desc' },
                                        include: {
                                            patient: {
                                                select: { id: true, nom: true, prenom: true, numeroDossier: true },
                                            },
                                            dailyFollowups: {
                                                orderBy: { date: 'desc' },
                                                take: 5,
                                            },
                                        },
                                    }),
                                    this.prisma.hospitalization.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), hospitalizations = _c[0], total = _c[1];
                            return [2 /*return*/, {
                                    hospitalizations: hospitalizations,
                                    total: total,
                                    page: parseInt(page),
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        HospitalizationsService_1.prototype.getActive = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.hospitalization.findMany({
                            where: { status: 'ACTIVE' },
                            include: {
                                patient: {
                                    select: { id: true, nom: true, prenom: true, numeroDossier: true, telephone: true },
                                },
                            },
                            orderBy: { dateAdmission: 'asc' },
                        })];
                });
            });
        };
        HospitalizationsService_1.prototype.getBedOccupancy = function () {
            return __awaiter(this, void 0, void 0, function () {
                var totalBeds, activeHospitalizations, beds, i, bedNumber, hospitalization;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            totalBeds = 50 // Configuration - à mettre en base de données
                            ;
                            return [4 /*yield*/, this.prisma.hospitalization.count({
                                    where: { status: 'ACTIVE' },
                                })];
                        case 1:
                            activeHospitalizations = _a.sent();
                            beds = [];
                            i = 1;
                            _a.label = 2;
                        case 2:
                            if (!(i <= totalBeds)) return [3 /*break*/, 5];
                            bedNumber = "LIT-".concat(i.toString().padStart(3, '0'));
                            return [4 /*yield*/, this.prisma.hospitalization.findFirst({
                                    where: { litNumber: bedNumber, status: 'ACTIVE' },
                                    include: {
                                        patient: {
                                            select: { nom: true, prenom: true },
                                        },
                                    },
                                })];
                        case 3:
                            hospitalization = _a.sent();
                            beds.push({
                                number: bedNumber,
                                isOccupied: !!hospitalization,
                                patient: (hospitalization === null || hospitalization === void 0 ? void 0 : hospitalization.patient) || null,
                                hospitalizationId: (hospitalization === null || hospitalization === void 0 ? void 0 : hospitalization.id) || null,
                            });
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, {
                                totalBeds: totalBeds,
                                occupied: activeHospitalizations,
                                available: totalBeds - activeHospitalizations,
                                occupancyRate: (activeHospitalizations / totalBeds) * 100,
                                beds: beds,
                            }];
                    }
                });
            });
        };
        HospitalizationsService_1.prototype.getByPatient = function (patientId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.hospitalization.findMany({
                            where: { patientId: patientId },
                            orderBy: { dateAdmission: 'desc' },
                            include: {
                                dailyFollowups: {
                                    orderBy: { date: 'desc' },
                                },
                            },
                        })];
                });
            });
        };
        HospitalizationsService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var hospitalization;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.hospitalization.findUnique({
                                where: { id: id },
                                include: {
                                    patient: true,
                                    dailyFollowups: {
                                        orderBy: { date: 'desc' },
                                        include: {
                                            user: {
                                                select: { id: true, firstName: true, lastName: true },
                                            },
                                        },
                                    },
                                },
                            })];
                        case 1:
                            hospitalization = _a.sent();
                            if (!hospitalization) {
                                throw new common_1.NotFoundException("Hospitalisation avec ID ".concat(id, " non trouv\u00E9e"));
                            }
                            return [2 /*return*/, hospitalization];
                    }
                });
            });
        };
        HospitalizationsService_1.prototype.create = function (createHospitalizationDto) {
            return __awaiter(this, void 0, void 0, function () {
                var patient, activeHospitalization, bedOccupied;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.patient.findUnique({
                                where: { id: createHospitalizationDto.patientId },
                            })];
                        case 1:
                            patient = _a.sent();
                            if (!patient) {
                                throw new common_1.NotFoundException('Patient non trouvé');
                            }
                            return [4 /*yield*/, this.prisma.hospitalization.findFirst({
                                    where: {
                                        patientId: createHospitalizationDto.patientId,
                                        status: 'ACTIVE',
                                    },
                                })];
                        case 2:
                            activeHospitalization = _a.sent();
                            if (activeHospitalization) {
                                throw new common_1.BadRequestException('Ce patient a déjà une hospitalisation active');
                            }
                            return [4 /*yield*/, this.prisma.hospitalization.findFirst({
                                    where: {
                                        litNumber: createHospitalizationDto.litNumber,
                                        status: 'ACTIVE',
                                    },
                                })];
                        case 3:
                            bedOccupied = _a.sent();
                            if (bedOccupied) {
                                throw new common_1.BadRequestException("Le lit ".concat(createHospitalizationDto.litNumber, " est d\u00E9j\u00E0 occup\u00E9"));
                            }
                            return [2 /*return*/, this.prisma.hospitalization.create({
                                    data: {
                                        patientId: createHospitalizationDto.patientId,
                                        litNumber: createHospitalizationDto.litNumber,
                                        diagnostic: createHospitalizationDto.diagnostic,
                                        status: 'ACTIVE',
                                    },
                                    include: {
                                        patient: true,
                                    },
                                })];
                    }
                });
            });
        };
        HospitalizationsService_1.prototype.update = function (id, updateHospitalizationDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.hospitalization.update({
                                    where: { id: id },
                                    data: {
                                        diagnostic: updateHospitalizationDto.diagnostic,
                                    },
                                })];
                    }
                });
            });
        };
        HospitalizationsService_1.prototype.discharge = function (id, dischargeSummary) {
            return __awaiter(this, void 0, void 0, function () {
                var hospitalization;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            hospitalization = _a.sent();
                            if (hospitalization.status !== 'ACTIVE') {
                                throw new common_1.BadRequestException('Cette hospitalisation n\'est pas active');
                            }
                            return [2 /*return*/, this.prisma.hospitalization.update({
                                    where: { id: id },
                                    data: {
                                        dateSortie: new Date(),
                                        status: 'DISCHARGED',
                                    },
                                })];
                    }
                });
            });
        };
        HospitalizationsService_1.prototype.addDailyFollowup = function (id, addDailyFollowupDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.dailyFollowup.create({
                                    data: {
                                        hospitalizationId: id,
                                        temperature: addDailyFollowupDto.temperature,
                                        tension: addDailyFollowupDto.tension,
                                        poids: addDailyFollowupDto.poids,
                                        observations: addDailyFollowupDto.observations,
                                        treatment: addDailyFollowupDto.treatment,
                                        createdBy: userId,
                                    },
                                })];
                    }
                });
            });
        };
        HospitalizationsService_1.prototype.getDailyFollowups = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.dailyFollowup.findMany({
                                    where: { hospitalizationId: id },
                                    orderBy: { date: 'desc' },
                                    include: {
                                        user: {
                                            select: { id: true, firstName: true, lastName: true },
                                        },
                                    },
                                })];
                    }
                });
            });
        };
        return HospitalizationsService_1;
    }());
    __setFunctionName(_classThis, "HospitalizationsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HospitalizationsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HospitalizationsService = _classThis;
}();
exports.HospitalizationsService = HospitalizationsService;
