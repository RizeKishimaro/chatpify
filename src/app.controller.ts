import {
  Controller,
  Get,
  Req,
  Res,
  Query,
  UseGuards,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { google } from 'googleapis';
import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';
import { AppService } from './app.service';

import { AuthGuard } from '@nestjs/passport';
import {
  HandleValidateError,
  MongoExceptionFilter,
} from './user/error/handlers/handlers.filter';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // @Get()
  // @UseGuards(AuthGuard('google'))
  // googleAuthController(@Req() req: any): void {}

  // @Get('/auth/Chatpify/Oauth/callback')
  // @UseGuards(AuthGuard('google'))
  // AuthGoogleUserRoute(@Req() req: any) {
  //   this.appService.googleLogin(req);
  //   return req.user;
  // }
  // @Get('profile')
  // aboutMe(@Req() req: any) {
  //   console.log(req.user);
  // }
  @UseFilters(HandleValidateError, MongoExceptionFilter)
  @Get('stream')
  async streamMusic(@Query('url') url: string, @Res() res) {
    try {
      if (!url) return new HttpException('You need at least 1 id to play', 400);
      const id = `https://www.youtube.com/watch?v=${url}`;
      const video = ytdl(id, { quality: 'highestaudio' });
      const ffmpegProcess = ffmpeg(video).format('mp3');
      ffmpegProcess.on('error', (err) => {
        if (err.message.includes('SIGKILL')) {
          console.log('file stream closed');
        } else if (err.message.includes('Output stream closed')) {
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
    } catch (error) {
      console.log('hello', error.name);
    }
  }
  @Get('music')
  @UseFilters(MongoExceptionFilter, HandleValidateError)
  async getMusic(@Res() res: any) {
    // Example usage
    const youtube = google.youtube({
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
}
