import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { Utils } from '../utility/Utils';

export class ResizeMiddleware {
  static async resizeImage(req: Request, res: Response, next: NextFunction) {
    const fileName = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const ERROR_MESSAGE = 'The following error ocurred processing your request';
    if (isNaN(width) || isNaN(height)) {
      return res.status(401).send(`${ERROR_MESSAGE}: Width and height should be a valid Integer`);
    }
    const filePath = __dirname + '../../../assets/full/' + `${fileName}.jpg`;
    const thumbnailFilePath = __dirname + '../../../assets/thumb/' + `${fileName}-${width}-${height}_thumb.jpg`;

    if (!fileName) return res.status(401).send(`${ERROR_MESSAGE}: Image name is missing`);
    if ((width && !height) || (!width && height))
      return res.status(401).send(`${ERROR_MESSAGE}: When thumbnail is required both width and height are mandatory`);
    try {
      fs.exists(filePath, (exists: boolean) => {
        if (!exists) {
          res.writeHead(404, {
            'Content-Type': 'text/plain',
          });
          res.end('404 Not Found');
          return;
        }
      });
      if (fs.existsSync(thumbnailFilePath)) {
        res.writeHead(200, {
          'Content-Type': 'image/jpg',
        });
        fs.readFile(thumbnailFilePath, (err, content) => {
          res.end(content);
        });
        return;
      }
      await Utils.resizeFile(filePath, thumbnailFilePath, width, height);
      next();
    } catch (error) {
      next(new Error('Error happened while resizing'));
    }
  }
}
