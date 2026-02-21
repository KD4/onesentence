"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sentence_service_1 = require("./sentence.service");
const client_1 = require("@prisma/client");
let SentenceController = class SentenceController {
    sentenceService;
    constructor(sentenceService) {
        this.sentenceService = sentenceService;
    }
    getToday(level) {
        return this.sentenceService.getToday(level);
    }
    getArchive(level, page = '1', size = '10') {
        return this.sentenceService.getArchive(level, +page, +size);
    }
    getByIds(ids) {
        const idArray = ids.split(',').map(Number).filter(Boolean);
        return this.sentenceService.getByIds(idArray);
    }
};
exports.SentenceController = SentenceController;
__decorate([
    (0, common_1.Get)('today'),
    (0, swagger_1.ApiQuery)({ name: 'level', enum: client_1.Level }),
    __param(0, (0, common_1.Query)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SentenceController.prototype, "getToday", null);
__decorate([
    (0, common_1.Get)('archive'),
    (0, swagger_1.ApiQuery)({ name: 'level', enum: client_1.Level }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false }),
    __param(0, (0, common_1.Query)('level')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SentenceController.prototype, "getArchive", null);
__decorate([
    (0, common_1.Get)('by-ids'),
    (0, swagger_1.ApiQuery)({ name: 'ids', description: 'Comma-separated sentence IDs' }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SentenceController.prototype, "getByIds", null);
exports.SentenceController = SentenceController = __decorate([
    (0, swagger_1.ApiTags)('sentences'),
    (0, common_1.Controller)('sentences'),
    __metadata("design:paramtypes", [sentence_service_1.SentenceService])
], SentenceController);
//# sourceMappingURL=sentence.controller.js.map