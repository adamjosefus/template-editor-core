export class Blobs {
  static async canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob)
          resolve(blob);
        else
          reject();
      });
    });
  }
}
