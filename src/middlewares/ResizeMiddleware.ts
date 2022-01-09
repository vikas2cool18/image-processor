import sharp from "sharp";
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

export class ResizeMiddleware {
  static async resizeImage(req: Request, res: Response, next: NextFunction) {
  const fileName = req.query.filename as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const filePath = __dirname + '\\..\\..\\assets\\full\\' + `${fileName}.jpg`;
  console.log(filePath);
  try {
  fs.exists(filePath, (exists: boolean)=> {
    if(!exists) {
      res.writeHead(404, {
        "Content-Type": "text/plain"
      });
      res.end("404 Not Found");
      return;
    }
  })
      await sharp(__dirname + '\\..\\..\\assets\\full\\' + `${fileName}.jpg`)
            .resize({
              width: width,
              height: height
            })
            .toFile(__dirname + '\\..\\..\\assets\\thumb\\' + `${fileName}_thumb.jpg`);
            next();
    } catch (error) {
      console.log(error);
      next(new Error('Error happened while resizing'))
    }
    
  }
}