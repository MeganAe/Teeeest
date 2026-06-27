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
exports.AddDailyFollowupDto = void 0;
var class_validator_1 = require("class-validator");
var AddDailyFollowupDto = function () {
    var _a;
    var _temperature_decorators;
    var _temperature_initializers = [];
    var _temperature_extraInitializers = [];
    var _tension_decorators;
    var _tension_initializers = [];
    var _tension_extraInitializers = [];
    var _poids_decorators;
    var _poids_initializers = [];
    var _poids_extraInitializers = [];
    var _observations_decorators;
    var _observations_initializers = [];
    var _observations_extraInitializers = [];
    var _treatment_decorators;
    var _treatment_initializers = [];
    var _treatment_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AddDailyFollowupDto() {
                this.temperature = __runInitializers(this, _temperature_initializers, void 0);
                this.tension = (__runInitializers(this, _temperature_extraInitializers), __runInitializers(this, _tension_initializers, void 0));
                this.poids = (__runInitializers(this, _tension_extraInitializers), __runInitializers(this, _poids_initializers, void 0));
                this.observations = (__runInitializers(this, _poids_extraInitializers), __runInitializers(this, _observations_initializers, void 0));
                this.treatment = (__runInitializers(this, _observations_extraInitializers), __runInitializers(this, _treatment_initializers, void 0));
                __runInitializers(this, _treatment_extraInitializers);
            }
            return AddDailyFollowupDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _temperature_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(30), (0, class_validator_1.Max)(45)];
            _tension_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _poids_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(300)];
            _observations_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _treatment_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _temperature_decorators, { kind: "field", name: "temperature", static: false, private: false, access: { has: function (obj) { return "temperature" in obj; }, get: function (obj) { return obj.temperature; }, set: function (obj, value) { obj.temperature = value; } }, metadata: _metadata }, _temperature_initializers, _temperature_extraInitializers);
            __esDecorate(null, null, _tension_decorators, { kind: "field", name: "tension", static: false, private: false, access: { has: function (obj) { return "tension" in obj; }, get: function (obj) { return obj.tension; }, set: function (obj, value) { obj.tension = value; } }, metadata: _metadata }, _tension_initializers, _tension_extraInitializers);
            __esDecorate(null, null, _poids_decorators, { kind: "field", name: "poids", static: false, private: false, access: { has: function (obj) { return "poids" in obj; }, get: function (obj) { return obj.poids; }, set: function (obj, value) { obj.poids = value; } }, metadata: _metadata }, _poids_initializers, _poids_extraInitializers);
            __esDecorate(null, null, _observations_decorators, { kind: "field", name: "observations", static: false, private: false, access: { has: function (obj) { return "observations" in obj; }, get: function (obj) { return obj.observations; }, set: function (obj, value) { obj.observations = value; } }, metadata: _metadata }, _observations_initializers, _observations_extraInitializers);
            __esDecorate(null, null, _treatment_decorators, { kind: "field", name: "treatment", static: false, private: false, access: { has: function (obj) { return "treatment" in obj; }, get: function (obj) { return obj.treatment; }, set: function (obj, value) { obj.treatment = value; } }, metadata: _metadata }, _treatment_initializers, _treatment_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AddDailyFollowupDto = AddDailyFollowupDto;
