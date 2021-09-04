const multer = require("multer");
const path = require("path");
const fs = require("fs");

try {
    fs.accessSync("uploads");
} catch (error) {
    console.log("image 폴더 생성");
    fs.mkdirSync("uploads");
}

exports.upload = (directory) =>
    multer({
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, directory);
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                const basename = path.basename(file.originalname, ext);
                done(null, basename + "_" + new Date().getTime() + ext);
            },
        }),
        limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    });
