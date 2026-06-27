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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellMedicationDto = void 0;
var class_validator_1 = require("class-validator");
var SellMedicationDto = function () {
    var _a;
    var _medicationId_decorators;
    var _medicationId_initializers = [];
    var _medicationId_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _patientId_decorators;
    var _patientId_initializers = [];
    var _patientId_extraInitializers = [];
    var _prescriptionId_decorators;
    var _prescriptionId_initializers = [];
    var _prescriptionId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SellMedicationDto() {
                this.medicationId = __runInitializers(this, _medicationId_initializers, void 0);
                this.quantity = (__runInitializers(this, _medicationId_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
                this.patientId = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _patientId_initializers, void 0));
                this.prescriptionId = (__runInitializers(this, _patientId_extraInitializers), __runInitializers(this, _prescriptionId_initializers, void 0));
                __runInitializers(this, _prescriptionId_extraInitializers);
            }
            return SellMedicationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _medicationId_decorators = [(0, class_validator_1.IsString)()];
            _quantity_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _patientId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _prescriptionId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _medicationId_decorators, { kind: "field", name: "medicationId", static: false, private: false, access: { has: function (obj) { return "medicationId" in obj; }, get: function (obj) { return obj.medicationId; }, set: function (obj, value) { obj.medicationId = value; } }, metadata: _metadata }, _medicationId_initializers, _medicationId_extraInitializers);
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            __esDecorate(null, null, _patientId_decorators, { kind: "field", name: "patientId", static: false, private: false, access: { has: function (obj) { return "patientId" in obj; }, get: function (obj) { return obj.patientId; }, set: function (obj, value) { obj.patientId = value; } }, metadata: _metadata }, _patientId_initializers, _patientId_extraInitializers);
            __esDecorate(null, null, _prescriptionId_decorators, { kind: "field", name: "prescriptionId", static: false, private: false, access: { has: function (obj) { return "prescriptionId" in obj; }, get: function (obj) { return obj.prescriptionId; }, set: function (obj, value) { obj.prescriptionId = value; } }, metadata: _metadata }, _prescriptionId_initializers, _prescriptionId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SellMedicationDto = SellMedicationDto;
