import { HttpException, Injectable } from '@nestjs/common';
import { google } from 'googleapis';

import * as ytdl from 'ytdl-core';

import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class AppService {
  // googleLogin(req) {
  //   if (!req.user) {
  //     return 'User not authnicated!';
  //   }
  //   return {
  //     message: 'success login',
  //     user: req.user,
  //   };
  // }
  streamMusic(params) {
    try {
      if (!params || !/^[a-zA-Z0-9-_]{11}$/.test(params)) {
        console.log('lee');
        throw new HttpException('Invalid ID Provided', 400);
      }
      //  new HttpException('You need at least 1 id to play', 400);
      const id = `https://www.youtube.com/watch?v=${params}`;
      const video = ytdl(id, { quality: 'highestaudio' });
      const ffmpegProcess = ffmpeg(video).format('mp3');
      ffmpegProcess.on('error', (err) => {
        if (err.message.includes('SIGKILL')) {
          console.log('file stream closed');
        } else if (err.message.includes('Output stream closed')) {
          console.log('output stream is closed');
        }
      });
      video.on('error', (error) => {
        console.log(error);
        return new HttpException('Invalid ID Provided', 400);
      });
      // res.on('close', () => {
      //   ffmpegProcess.kill('SIGKILL');
      //   console.log('res ended');
      //   return false;
      // });
      // video.on('error', (error) => {
      //   if (error.name === 'TypeError') {
      //     ffmpegProcess.kill('SIGKILL');
      //   }
      // });
      let data;
      ffmpegProcess.pipe(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log('this error works');
      throw new Error(error.message);
    }
  }
  async getMusic() {
    const youtube = google.youtube({
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
}
