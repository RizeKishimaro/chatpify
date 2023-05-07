"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
let AppService = class AppService {
    streamMusic(params) {
        try {
            if (!params || !/^[a-zA-Z0-9-_]{11}$/.test(params)) {
                console.log('lee');
                throw new common_1.HttpException('Invalid ID Provided', 400);
            }
            const id = `https://www.youtube.com/watch?v=${params}`;
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
            video.on('error', (error) => {
                console.log(error);
                return new common_1.HttpException('Invalid ID Provided', 400);
            });
            let data;
            ffmpegProcess.pipe(data);
            console.log(data);
            return data;
        }
        catch (error) {
            console.log('this error works');
            throw new Error(error.message);
        }
    }
    async getMusic() {
        const youtube = googleapis_1.google.youtube({
            version: 'v3',
            auth: 'AIzaSyCHcTbM0mvsqKpDd01Jhbi08z8Cgf5fQhA',
        });
        const searchResult = await youtube.search.list({
            part: ['id', 'snippet'],
            q: 'Nandemonaiya - Kamishiraishi Mone (Maxone Remix) ♪',
            maxResults: 15,
        });
        return searchResult.data;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map