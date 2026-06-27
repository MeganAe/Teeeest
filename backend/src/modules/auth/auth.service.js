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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(prisma, jwtService, configService) {
            this.prisma = prisma;
            this.jwtService = jwtService;
            this.configService = configService;
        }
        AuthService_1.prototype.validateUser = function (email, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, _, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email } })];
                        case 1:
                            user = _b.sent();
                            _a = user;
                            if (!_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, bcrypt.compare(password, user.password)];
                        case 2:
                            _a = (_b.sent());
                            _b.label = 3;
                        case 3:
                            if (_a) {
                                _ = user.password, result = __rest(user, ["password"]);
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (loginDto, response) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, user, payload, token, refreshToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = loginDto.email, password = loginDto.password;
                            return [4 /*yield*/, this.validateUser(email, password)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
                            }
                            if (!user.isActive) {
                                throw new common_1.UnauthorizedException('Compte désactivé');
                            }
                            payload = { sub: user.id, email: user.email, role: user.role };
                            token = this.jwtService.sign(payload);
                            refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d') });
                            // Update last login
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: { lastLogin: new Date() },
                                })
                                // Store refresh token in cookie
                            ];
                        case 2:
                            // Update last login
                            _a.sent();
                            // Store refresh token in cookie
                            response.cookie('refresh_token', refreshToken, {
                                httpOnly: true,
                                secure: this.configService.get('NODE_ENV') === 'production',
                                sameSite: 'strict',
                                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                            });
                            return [2 /*return*/, {
                                    user: {
                                        id: user.id,
                                        email: user.email,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        role: user.role,
                                    },
                                    token: token,
                                    refreshToken: refreshToken,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshToken = function (refreshTokenDto) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, user, newPayload, newToken, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            payload = this.jwtService.verify(refreshTokenDto.refreshToken);
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: payload.sub } })];
                        case 1:
                            user = _a.sent();
                            if (!user || !user.isActive) {
                                throw new common_1.UnauthorizedException('Token invalide');
                            }
                            newPayload = { sub: user.id, email: user.email, role: user.role };
                            newToken = this.jwtService.sign(newPayload);
                            return [2 /*return*/, { token: newToken }];
                        case 2:
                            error_1 = _a.sent();
                            throw new common_1.UnauthorizedException('Refresh token invalide');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.logout = function (userId, response) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    response.clearCookie('refresh_token');
                    return [2 /*return*/, { message: 'Déconnexion réussie' }];
                });
            });
        };
        AuthService_1.prototype.changePassword = function (userId, changePasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isPasswordValid, hashedPassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('Utilisateur non trouvé');
                            }
                            return [4 /*yield*/, bcrypt.compare(changePasswordDto.currentPassword, user.password)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!isPasswordValid) {
                                throw new common_1.BadRequestException('Mot de passe actuel incorrect');
                            }
                            return [4 /*yield*/, bcrypt.hash(changePasswordDto.newPassword, 10)];
                        case 3:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: { password: hashedPassword },
                                })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, { message: 'Mot de passe modifié avec succès' }];
                    }
                });
            });
        };
        AuthService_1.prototype.forgotPassword = function (forgotPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, resetToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { email: forgotPasswordDto.email },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                // Don't reveal that user doesn't exist
                                return [2 /*return*/, { message: 'Si un compte existe, un email de réinitialisation a été envoyé' }];
                            }
                            resetToken = this.jwtService.sign({ sub: user.id, type: 'reset' }, { expiresIn: '1h' });
                            // Here you would send email with reset link
                            // For now, just return token (in production, send email)
                            return [2 /*return*/, { message: 'Email de réinitialisation envoyé', resetToken: resetToken }];
                    }
                });
            });
        };
        AuthService_1.prototype.resetPassword = function (resetPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, hashedPassword, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            payload = this.jwtService.verify(resetPasswordDto.token);
                            if (payload.type !== 'reset') {
                                throw new Error();
                            }
                            return [4 /*yield*/, bcrypt.hash(resetPasswordDto.newPassword, 10)];
                        case 1:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: payload.sub },
                                    data: { password: hashedPassword },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Mot de passe réinitialisé avec succès' }];
                        case 3:
                            error_2 = _a.sent();
                            throw new common_1.BadRequestException('Token invalide ou expiré');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.getProfile = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                                select: {
                                    id: true,
                                    email: true,
                                    firstName: true,
                                    lastName: true,
                                    role: true,
                                    isActive: true,
                                    lastLogin: true,
                                    createdAt: true,
                                },
                            })];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
