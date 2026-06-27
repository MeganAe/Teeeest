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
exports.PharmacyService = void 0;
var common_1 = require("@nestjs/common");
var PharmacyService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PharmacyService = _classThis = /** @class */ (function () {
        function PharmacyService_1(prisma) {
            this.prisma = prisma;
        }
        PharmacyService_1.prototype.generateMedicationCode = function () {
            return __awaiter(this, void 0, void 0, function () {
                var count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.medication.count()];
                        case 1:
                            count = _a.sent();
                            return [2 /*return*/, "MED-".concat((count + 1).toString().padStart(6, '0'))];
                    }
                });
            });
        };
        PharmacyService_1.prototype.getAllMedications = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, search, category, skip, where, _c, medications, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, search = query.search, category = query.category;
                            skip = (page - 1) * limit;
                            where = {};
                            if (search) {
                                where.OR = [
                                    { name: { contains: search, mode: 'insensitive' } },
                                    { code: { contains: search, mode: 'insensitive' } },
                                ];
                            }
                            if (category) {
                                where.category = category;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.medication.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { name: 'asc' },
                                    }),
                                    this.prisma.medication.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), medications = _c[0], total = _c[1];
                            return [2 /*return*/, {
                                    medications: medications,
                                    total: total,
                                    page: parseInt(page),
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        PharmacyService_1.prototype.getLowStock = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.medication.findMany({
                            where: {
                                stock: { lte: this.prisma.medication.fields.threshold },
                            },
                            orderBy: { stock: 'asc' },
                        })];
                });
            });
        };
        PharmacyService_1.prototype.getExpiring = function () {
            return __awaiter(this, void 0, void 0, function () {
                var thirtyDaysFromNow;
                return __generator(this, function (_a) {
                    thirtyDaysFromNow = new Date();
                    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
                    return [2 /*return*/, this.prisma.medication.findMany({
                            where: {
                                expiryDate: { lte: thirtyDaysFromNow, not: null },
                            },
                            orderBy: { expiryDate: 'asc' },
                        })];
                });
            });
        };
        PharmacyService_1.prototype.getMedicationById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var medication;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.medication.findUnique({ where: { id: id } })];
                        case 1:
                            medication = _a.sent();
                            if (!medication) {
                                throw new common_1.NotFoundException("M\u00E9dicament avec ID ".concat(id, " non trouv\u00E9"));
                            }
                            return [2 /*return*/, medication];
                    }
                });
            });
        };
        PharmacyService_1.prototype.createMedication = function (createMedicationDto) {
            return __awaiter(this, void 0, void 0, function () {
                var code;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.generateMedicationCode()];
                        case 1:
                            code = _a.sent();
                            return [2 /*return*/, this.prisma.medication.create({
                                    data: {
                                        code: code,
                                        name: createMedicationDto.name,
                                        description: createMedicationDto.description,
                                        category: createMedicationDto.category,
                                        unit: createMedicationDto.unit,
                                        price: createMedicationDto.price,
                                        stock: createMedicationDto.stock || 0,
                                        threshold: createMedicationDto.threshold || 10,
                                        expiryDate: createMedicationDto.expiryDate ? new Date(createMedicationDto.expiryDate) : null,
                                    },
                                })];
                    }
                });
            });
        };
        PharmacyService_1.prototype.updateStock = function (id, updateStockDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getMedicationById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.medication.update({
                                    where: { id: id },
                                    data: { stock: updateStockDto.stock },
                                })];
                    }
                });
            });
        };
        PharmacyService_1.prototype.deleteMedication = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getMedicationById(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.medication.delete({ where: { id: id } })];
                    }
                });
            });
        };
        PharmacyService_1.prototype.sellMedication = function (sellMedicationDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var medication, totalPrice, sale;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getMedicationById(sellMedicationDto.medicationId)];
                        case 1:
                            medication = _a.sent();
                            if (medication.stock < sellMedicationDto.quantity) {
                                throw new common_1.BadRequestException("Stock insuffisant. Disponible: ".concat(medication.stock));
                            }
                            totalPrice = sellMedicationDto.quantity * medication.price;
                            // Update stock
                            return [4 /*yield*/, this.prisma.medication.update({
                                    where: { id: sellMedicationDto.medicationId },
                                    data: { stock: medication.stock - sellMedicationDto.quantity },
                                })
                                // Create sale record
                            ];
                        case 2:
                            // Update stock
                            _a.sent();
                            return [4 /*yield*/, this.prisma.sale.create({
                                    data: {
                                        medicationId: sellMedicationDto.medicationId,
                                        quantity: sellMedicationDto.quantity,
                                        unitPrice: medication.price,
                                        totalPrice: totalPrice,
                                        patientId: sellMedicationDto.patientId,
                                        prescriptionId: sellMedicationDto.prescriptionId,
                                        soldBy: userId,
                                    },
                                })];
                        case 3:
                            sale = _a.sent();
                            return [2 /*return*/, sale];
                    }
                });
            });
        };
        PharmacyService_1.prototype.getSales = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, startDate, endDate, skip, where, _c, sales, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 10 : _b, startDate = query.startDate, endDate = query.endDate;
                            skip = (page - 1) * limit;
                            where = {};
                            if (startDate || endDate) {
                                where.soldAt = {};
                                if (startDate)
                                    where.soldAt.gte = new Date(startDate);
                                if (endDate)
                                    where.soldAt.lte = new Date(endDate);
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.sale.findMany({
                                        where: where,
                                        skip: skip,
                                        take: parseInt(limit),
                                        orderBy: { soldAt: 'desc' },
                                        include: {
                                            medication: true,
                                        },
                                    }),
                                    this.prisma.sale.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), sales = _c[0], total = _c[1];
                            return [2 /*return*/, {
                                    sales: sales,
                                    total: total,
                                    page: parseInt(page),
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        PharmacyService_1.prototype.getSalesStats = function (startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var where, sales, total, byMedication, daily, _i, sales_1, sale, dateKey;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            where = {};
                            if (startDate || endDate) {
                                where.soldAt = {};
                                if (startDate)
                                    where.soldAt.gte = startDate;
                                if (endDate)
                                    where.soldAt.lte = endDate;
                            }
                            return [4 /*yield*/, this.prisma.sale.findMany({ where: where })];
                        case 1:
                            sales = _a.sent();
                            total = sales.reduce(function (sum, s) { return sum + s.totalPrice; }, 0);
                            byMedication = {};
                            daily = {};
                            for (_i = 0, sales_1 = sales; _i < sales_1.length; _i++) {
                                sale = sales_1[_i];
                                byMedication[sale.medicationId] = (byMedication[sale.medicationId] || 0) + sale.quantity;
                                dateKey = sale.soldAt.toISOString().split('T')[0];
                                daily[dateKey] = (daily[dateKey] || 0) + sale.totalPrice;
                            }
                            return [2 /*return*/, {
                                    total: total,
                                    count: sales.length,
                                    byMedication: byMedication,
                                    daily: Object.entries(daily).map(function (_a) {
                                        var date = _a[0], amount = _a[1];
                                        return ({ date: date, amount: amount });
                                    }),
                                }];
                    }
                });
            });
        };
        return PharmacyService_1;
    }());
    __setFunctionName(_classThis, "PharmacyService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PharmacyService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PharmacyService = _classThis;
}();
exports.PharmacyService = PharmacyService;
