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
exports.CreatePrescriptionDto = void 0;
var class_validator_1 = require("class-validator");
var CreatePrescriptionDto = function () {
    var _a;
    var _medicament_decorators;
    var _medicament_initializers = [];
    var _medicament_extraInitializers = [];
    var _dosage_decorators;
    var _dosage_initializers = [];
    var _dosage_extraInitializers = [];
    var _duree_decorators;
    var _duree_initializers = [];
    var _duree_extraInitializers = [];
    var _instructions_decorators;
    var _instructions_initializers = [];
    var _instructions_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePrescriptionDto() {
                this.medicament = __runInitializers(this, _medicament_initializers, void 0);
                this.dosage = (__runInitializers(this, _medicament_extraInitializers), __runInitializers(this, _dosage_initializers, void 0));
                this.duree = (__runInitializers(this, _dosage_extraInitializers), __runInitializers(this, _duree_initializers, void 0));
                this.instructions = (__runInitializers(this, _duree_extraInitializers), __runInitializers(this, _instructions_initializers, void 0));
                __runInitializers(this, _instructions_extraInitializers);
            }
            return CreatePrescriptionDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _medicament_decorators = [(0, class_validator_1.IsString)()];
            _dosage_decorators = [(0, class_validator_1.IsString)()];
            _duree_decorators = [(0, class_validator_1.IsString)()];
            _instructions_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _medicament_decorators, { kind: "field", name: "medicament", static: false, private: false, access: { has: function (obj) { return "medicament" in obj; }, get: function (obj) { return obj.medicament; }, set: function (obj, value) { obj.medicament = value; } }, metadata: _metadata }, _medicament_initializers, _medicament_extraInitializers);
            __esDecorate(null, null, _dosage_decorators, { kind: "field", name: "dosage", static: false, private: false, access: { has: function (obj) { return "dosage" in obj; }, get: function (obj) { return obj.dosage; }, set: function (obj, value) { obj.dosage = value; } }, metadata: _metadata }, _dosage_initializers, _dosage_extraInitializers);
            __esDecorate(null, null, _duree_decorators, { kind: "field", name: "duree", static: false, private: false, access: { has: function (obj) { return "duree" in obj; }, get: function (obj) { return obj.duree; }, set: function (obj, value) { obj.duree = value; } }, metadata: _metadata }, _duree_initializers, _duree_extraInitializers);
            __esDecorate(null, null, _instructions_decorators, { kind: "field", name: "instructions", static: false, private: false, access: { has: function (obj) { return "instructions" in obj; }, get: function (obj) { return obj.instructions; }, set: function (obj, value) { obj.instructions = value; } }, metadata: _metadata }, _instructions_initializers, _instructions_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePrescriptionDto = CreatePrescriptionDto;
