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
exports.CreateConsultationDto = void 0;
var class_validator_1 = require("class-validator");
var CreateConsultationDto = function () {
    var _a;
    var _patientId_decorators;
    var _patientId_initializers = [];
    var _patientId_extraInitializers = [];
    var _motif_decorators;
    var _motif_initializers = [];
    var _motif_extraInitializers = [];
    var _diagnostic_decorators;
    var _diagnostic_initializers = [];
    var _diagnostic_extraInitializers = [];
    var _tension_decorators;
    var _tension_initializers = [];
    var _tension_extraInitializers = [];
    var _temperature_decorators;
    var _temperature_initializers = [];
    var _temperature_extraInitializers = [];
    var _poids_decorators;
    var _poids_initializers = [];
    var _poids_extraInitializers = [];
    var _taille_decorators;
    var _taille_initializers = [];
    var _taille_extraInitializers = [];
    var _traitement_decorators;
    var _traitement_initializers = [];
    var _traitement_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateConsultationDto() {
                this.patientId = __runInitializers(this, _patientId_initializers, void 0);
                this.motif = (__runInitializers(this, _patientId_extraInitializers), __runInitializers(this, _motif_initializers, void 0));
                this.diagnostic = (__runInitializers(this, _motif_extraInitializers), __runInitializers(this, _diagnostic_initializers, void 0));
                this.tension = (__runInitializers(this, _diagnostic_extraInitializers), __runInitializers(this, _tension_initializers, void 0));
                this.temperature = (__runInitializers(this, _tension_extraInitializers), __runInitializers(this, _temperature_initializers, void 0));
                this.poids = (__runInitializers(this, _temperature_extraInitializers), __runInitializers(this, _poids_initializers, void 0));
                this.taille = (__runInitializers(this, _poids_extraInitializers), __runInitializers(this, _taille_initializers, void 0));
                this.traitement = (__runInitializers(this, _taille_extraInitializers), __runInitializers(this, _traitement_initializers, void 0));
                this.notes = (__runInitializers(this, _traitement_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
                __runInitializers(this, _notes_extraInitializers);
            }
            return CreateConsultationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _patientId_decorators = [(0, class_validator_1.IsString)()];
            _motif_decorators = [(0, class_validator_1.IsString)()];
            _diagnostic_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tension_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _temperature_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(30), (0, class_validator_1.Max)(45)];
            _poids_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(300)];
            _taille_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(50), (0, class_validator_1.Max)(250)];
            _traitement_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _notes_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _patientId_decorators, { kind: "field", name: "patientId", static: false, private: false, access: { has: function (obj) { return "patientId" in obj; }, get: function (obj) { return obj.patientId; }, set: function (obj, value) { obj.patientId = value; } }, metadata: _metadata }, _patientId_initializers, _patientId_extraInitializers);
            __esDecorate(null, null, _motif_decorators, { kind: "field", name: "motif", static: false, private: false, access: { has: function (obj) { return "motif" in obj; }, get: function (obj) { return obj.motif; }, set: function (obj, value) { obj.motif = value; } }, metadata: _metadata }, _motif_initializers, _motif_extraInitializers);
            __esDecorate(null, null, _diagnostic_decorators, { kind: "field", name: "diagnostic", static: false, private: false, access: { has: function (obj) { return "diagnostic" in obj; }, get: function (obj) { return obj.diagnostic; }, set: function (obj, value) { obj.diagnostic = value; } }, metadata: _metadata }, _diagnostic_initializers, _diagnostic_extraInitializers);
            __esDecorate(null, null, _tension_decorators, { kind: "field", name: "tension", static: false, private: false, access: { has: function (obj) { return "tension" in obj; }, get: function (obj) { return obj.tension; }, set: function (obj, value) { obj.tension = value; } }, metadata: _metadata }, _tension_initializers, _tension_extraInitializers);
            __esDecorate(null, null, _temperature_decorators, { kind: "field", name: "temperature", static: false, private: false, access: { has: function (obj) { return "temperature" in obj; }, get: function (obj) { return obj.temperature; }, set: function (obj, value) { obj.temperature = value; } }, metadata: _metadata }, _temperature_initializers, _temperature_extraInitializers);
            __esDecorate(null, null, _poids_decorators, { kind: "field", name: "poids", static: false, private: false, access: { has: function (obj) { return "poids" in obj; }, get: function (obj) { return obj.poids; }, set: function (obj, value) { obj.poids = value; } }, metadata: _metadata }, _poids_initializers, _poids_extraInitializers);
            __esDecorate(null, null, _taille_decorators, { kind: "field", name: "taille", static: false, private: false, access: { has: function (obj) { return "taille" in obj; }, get: function (obj) { return obj.taille; }, set: function (obj, value) { obj.taille = value; } }, metadata: _metadata }, _taille_initializers, _taille_extraInitializers);
            __esDecorate(null, null, _traitement_decorators, { kind: "field", name: "traitement", static: false, private: false, access: { has: function (obj) { return "traitement" in obj; }, get: function (obj) { return obj.traitement; }, set: function (obj, value) { obj.traitement = value; } }, metadata: _metadata }, _traitement_initializers, _traitement_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateConsultationDto = CreateConsultationDto;
