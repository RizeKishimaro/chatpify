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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const app_service_1 = require("./app.service");
const handlers_filter_1 = require("./user/error/handlers/handlers.filter");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async streamMusic(url, res) {
        try {
            if (!url)
                return new common_1.HttpException('You need at least 1 id to play', 400);
            const id = `https://www.youtube.com/watch?v=${url}`;
            const video = ytdl(id, { quality: 'highestaudio' });
            const ffmpegProcess = ffmpeg(video).format('mp3');
            ffmpegProcess.on('error', (err) => {
                if (err.message.includes('SIGKILL')) {
                    console.log('file stream closed');
                }
                else if (err.message.includes('Output stream closed')) {
                    console.log('output stream is closed');
                }
            });
            res.set({
                'Content-Type': 'audio/mp3',
                'Transfer-Encoding': 'chunked',
            });
            res.on('close', () => {
                ffmpegProcess.kill('SIGKILL');
                console.log('res ended');
                return false;
            });
            video.on('error', (error) => {
                if (error.name === 'TypeError') {
                    res.set({
                        'Content-Type': 'Application/json',
                        'Transfer-Encoding': 'chunked',
                    });
                    ffmpegProcess.kill('SIGKILL');
                    return res.json({ status: 400, message: 'Invalid video ID' });
                }
            });
            ffmpegProcess.pipe(res);
        }
        catch (error) {
            console.log('hello', error.name);
        }
    }
    async getMusic(res) {
        const youtube = googleapis_1.google.youtube({
            version: 'v3',
            auth: 'AIzaSyCHcTbM0mvsqKpDd01Jhbi08z8Cgf5fQhA',
        });
        const searchResult = await youtube.search.list({
            part: ['id', 'snippet'],
            q: 'Nandemonaiya - Kamishiraishi Mone (Maxone Remix) ♪',
            maxResults: 15,
        });
        return res.send(searchResult.data).json();
    }
};
__decorate([
    (0, common_1.UseFilters)(handlers_filter_1.HandleValidateError, handlers_filter_1.MongoExceptionFilter),
    (0, common_1.Get)('stream'),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "streamMusic", null);
__decorate([
    (0, common_1.Get)('music'),
    (0, common_1.UseFilters)(handlers_filter_1.MongoExceptionFilter, handlers_filter_1.HandleValidateError),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMusic", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map