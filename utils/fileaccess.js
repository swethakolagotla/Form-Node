import fs from "fs";

const readFile = (pathname) => {
  return new Promise((res, rej) => {
    fs.readFile(pathname, "utf-8", (err, data) => {
      if (err) {
        return rej("File doesn't exist !");
      }
      res(data);
    });
  });
};
const writeFile = (pathname, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(pathname, data, (err) => {
      if (err) return reject("Creation of file failed.");

      resolve("File creation success!");
    });
  });
export { readFile, writeFile };
