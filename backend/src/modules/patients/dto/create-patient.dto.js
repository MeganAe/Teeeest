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
exports.CreatePatientDto = void 0;
var class_validator_1 = require("class-validator");
var client_1 = require("@prisma/client");
var CreatePatientDto = function () {
    var _a;
    var _nom_decorators;
    var _nom_initializers = [];
    var _nom_extraInitializers = [];
    var _postnom_decorators;
    var _postnom_initializers = [];
    var _postnom_extraInitializers = [];
    var _prenom_decorators;
    var _prenom_initializers = [];
    var _prenom_extraInitializers = [];
    var _sexe_decorators;
    var _sexe_initializers = [];
    var _sexe_extraInitializers = [];
    var _dateNaissance_decorators;
    var _dateNaissance_initializers = [];
    var _dateNaissance_extraInitializers = [];
    var _telephone_decorators;
    var _telephone_initializers = [];
    var _telephone_extraInitializers = [];
    var _adresse_decorators;
    var _adresse_initializers = [];
    var _adresse_extraInitializers = [];
    var _contactUrgence_decorators;
    var _contactUrgence_initializers = [];
    var _contactUrgence_extraInitializers = [];
    var _typeHandicap_decorators;
    var _typeHandicap_initializers = [];
    var _typeHandicap_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePatientDto() {
                this.nom = __runInitializers(this, _nom_initializers, void 0);
                this.postnom = (__runInitializers(this, _nom_extraInitializers), __runInitializers(this, _postnom_initializers, void 0));
                this.prenom = (__runInitializers(this, _postnom_extraInitializers), __runInitializers(this, _prenom_initializers, void 0));
                this.sexe = (__runInitializers(this, _prenom_extraInitializers), __runInitializers(this, _sexe_initializers, void 0));
                this.dateNaissance = (__runInitializers(this, _sexe_extraInitializers), __runInitializers(this, _dateNaissance_initializers, void 0));
                this.telephone = (__runInitializers(this, _dateNaissance_extraInitializers), __runInitializers(this, _telephone_initializers, void 0));
                this.adresse = (__runInitializers(this, _telephone_extraInitializers), __runInitializers(this, _adresse_initializers, void 0));
                this.contactUrgence = (__runInitializers(this, _adresse_extraInitializers), __runInitializers(this, _contactUrgence_initializers, void 0));
                this.typeHandicap = (__runInitializers(this, _contactUrgence_extraInitializers), __runInitializers(this, _typeHandicap_initializers, void 0));
                __runInitializers(this, _typeHandicap_extraInitializers);
            }
            return CreatePatientDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nom_decorators = [(0, class_validator_1.IsString)()];
            _postnom_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _prenom_decorators = [(0, class_validator_1.IsString)()];
            _sexe_decorators = [(0, class_validator_1.IsEnum)(client_1.Sexe)];
            _dateNaissance_decorators = [(0, class_validator_1.IsDateString)()];
            _telephone_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsPhoneNumber)()];
            _adresse_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _contactUrgence_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _typeHandicap_decorators = [(0, class_validator_1.IsEnum)(client_1.HandicapType)];
            __esDecorate(null, null, _nom_decorators, { kind: "field", name: "nom", static: false, private: false, access: { has: function (obj) { return "nom" in obj; }, get: function (obj) { return obj.nom; }, set: function (obj, value) { obj.nom = value; } }, metadata: _metadata }, _nom_initializers, _nom_extraInitializers);
            __esDecorate(null, null, _postnom_decorators, { kind: "field", name: "postnom", static: false, private: false, access: { has: function (obj) { return "postnom" in obj; }, get: function (obj) { return obj.postnom; }, set: function (obj, value) { obj.postnom = value; } }, metadata: _metadata }, _postnom_initializers, _postnom_extraInitializers);
            __esDecorate(null, null, _prenom_decorators, { kind: "field", name: "prenom", static: false, private: false, access: { has: function (obj) { return "prenom" in obj; }, get: function (obj) { return obj.prenom; }, set: function (obj, value) { obj.prenom = value; } }, metadata: _metadata }, _prenom_initializers, _prenom_extraInitializers);
            __esDecorate(null, null, _sexe_decorators, { kind: "field", name: "sexe", static: false, private: false, access: { has: function (obj) { return "sexe" in obj; }, get: function (obj) { return obj.sexe; }, set: function (obj, value) { obj.sexe = value; } }, metadata: _metadata }, _sexe_initializers, _sexe_extraInitializers);
            __esDecorate(null, null, _dateNaissance_decorators, { kind: "field", name: "dateNaissance", static: false, private: false, access: { has: function (obj) { return "dateNaissance" in obj; }, get: function (obj) { return obj.dateNaissance; }, set: function (obj, value) { obj.dateNaissance = value; } }, metadata: _metadata }, _dateNaissance_initializers, _dateNaissance_extraInitializers);
            __esDecorate(null, null, _telephone_decorators, { kind: "field", name: "telephone", static: false, private: false, access: { has: function (obj) { return "telephone" in obj; }, get: function (obj) { return obj.telephone; }, set: function (obj, value) { obj.telephone = value; } }, metadata: _metadata }, _telephone_initializers, _telephone_extraInitializers);
            __esDecorate(null, null, _adresse_decorators, { kind: "field", name: "adresse", static: false, private: false, access: { has: function (obj) { return "adresse" in obj; }, get: function (obj) { return obj.adresse; }, set: function (obj, value) { obj.adresse = value; } }, metadata: _metadata }, _adresse_initializers, _adresse_extraInitializers);
            __esDecorate(null, null, _contactUrgence_decorators, { kind: "field", name: "contactUrgence", static: false, private: false, access: { has: function (obj) { return "contactUrgence" in obj; }, get: function (obj) { return obj.contactUrgence; }, set: function (obj, value) { obj.contactUrgence = value; } }, metadata: _metadata }, _contactUrgence_initializers, _contactUrgence_extraInitializers);
            __esDecorate(null, null, _typeHandicap_decorators, { kind: "field", name: "typeHandicap", static: false, private: false, access: { has: function (obj) { return "typeHandicap" in obj; }, get: function (obj) { return obj.typeHandicap; }, set: function (obj, value) { obj.typeHandicap = value; } }, metadata: _metadata }, _typeHandicap_initializers, _typeHandicap_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePatientDto = CreatePatientDto;
