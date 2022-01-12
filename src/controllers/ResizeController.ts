import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export class ResizeController {
  static async getResizedImage(req: Request, res: Response, next: NextFunction) {
    const fileName = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const thumbNailFilePath = __dirname + '../../../assets/thumb/' + `${fileName}-${width}-${height}_thumb.jpg`;
    try {
      res.writeHead(200, {
        'Content-Type': 'image/jpg',
      });
      fs.readFile(thumbNailFilePath, (err, content) => {
        res.end(content);
      });
    } catch (error) {
      next(error);
    }
  }
}
