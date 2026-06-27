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
exports.CreatePaymentDto = void 0;
var class_validator_1 = require("class-validator");
var client_1 = require("@prisma/client");
var CreatePaymentDto = function () {
    var _a;
    var _patientId_decorators;
    var _patientId_initializers = [];
    var _patientId_extraInitializers = [];
    var _montant_decorators;
    var _montant_initializers = [];
    var _montant_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _modePaiement_decorators;
    var _modePaiement_initializers = [];
    var _modePaiement_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePaymentDto() {
                this.patientId = __runInitializers(this, _patientId_initializers, void 0);
                this.montant = (__runInitializers(this, _patientId_extraInitializers), __runInitializers(this, _montant_initializers, void 0));
                this.type = (__runInitializers(this, _montant_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.modePaiement = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _modePaiement_initializers, void 0));
                __runInitializers(this, _modePaiement_extraInitializers);
            }
            return CreatePaymentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _patientId_decorators = [(0, class_validator_1.IsString)()];
            _montant_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _type_decorators = [(0, class_validator_1.IsString)()];
            _modePaiement_decorators = [(0, class_validator_1.IsEnum)(client_1.PaymentMethod)];
            __esDecorate(null, null, _patientId_decorators, { kind: "field", name: "patientId", static: false, private: false, access: { has: function (obj) { return "patientId" in obj; }, get: function (obj) { return obj.patientId; }, set: function (obj, value) { obj.patientId = value; } }, metadata: _metadata }, _patientId_initializers, _patientId_extraInitializers);
            __esDecorate(null, null, _montant_decorators, { kind: "field", name: "montant", static: false, private: false, access: { has: function (obj) { return "montant" in obj; }, get: function (obj) { return obj.montant; }, set: function (obj, value) { obj.montant = value; } }, metadata: _metadata }, _montant_initializers, _montant_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _modePaiement_decorators, { kind: "field", name: "modePaiement", static: false, private: false, access: { has: function (obj) { return "modePaiement" in obj; }, get: function (obj) { return obj.modePaiement; }, set: function (obj, value) { obj.modePaiement = value; } }, metadata: _metadata }, _modePaiement_initializers, _modePaiement_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePaymentDto = CreatePaymentDto;
