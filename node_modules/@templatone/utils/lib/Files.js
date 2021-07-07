export class Files {
  static async readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result);
      }, {once: true});
      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject("Invalid file source.");
      }
    });
  }
  static async readAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result);
      }, {once: true});
      if (file) {
        reader.readAsArrayBuffer(file);
      } else {
        reject("Invalid file source.");
      }
    });
  }
  static async readAsText(file, encoding) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result);
      }, {once: true});
      if (file) {
        reader.readAsText(file, encoding);
      } else {
        reject("Invalid file source.");
      }
    });
  }
  static async readAsBinaryString(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result);
      }, {once: true});
      if (file) {
        reader.readAsBinaryString(file);
      } else {
        reject("Invalid file source.");
      }
    });
  }
}
