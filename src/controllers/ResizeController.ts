import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export class ResizeController {
  static async getResizedImage(req:Request, res: Response, next: NextFunction) {
    const fileName = req.query.filename as string;
    const thumbNailFilePath = __dirname + '\\..\\..\\assets\\thumb\\' + `${fileName}_thumb.jpg`;
    try {
      res.writeHead(200, {
        "Content-Type": "image/jpg" });
      fs.readFile(thumbNailFilePath, (err, content)=> {
        res.end(content);
      })
    } catch (error) {
      next(error);
    }
  }
}