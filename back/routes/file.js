const multer = require("multer");
const path = require("path");
const fs = require("fs");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

try {
    fs.accessSync("uploads");
} catch (error) {
    console.log("image 폴더 생성");
    fs.mkdirSync("uploads");
}

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
});

exports.upload = (directory) =>
    multer({
        storage: multerS3({
            s3: new AWS.S3(),
            bucket: "emotion-feed",
            key(req, file, cb) {
                cb(
                    null,
                    `original/${Date.now()}_${path.basename(file.originalname)}`
                );
            },
        }),
        limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    });
