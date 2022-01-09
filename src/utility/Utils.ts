import sharp from 'sharp';

export class Utils {
  static async resizeFile(filePath: string, thumbnailFilePath: string, width: number, height: number) {
    try {
      await sharp(filePath)
        .resize({
          width: width,
          height: height,
        })
        .toFile(thumbnailFilePath);
    } catch (error) {
      console.log(error);
    }
  }
}
