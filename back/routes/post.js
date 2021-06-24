const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Image, Comment, User } = require('../models');
const { isLoggedIn } = require('./middlewares');


try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) { 
      const ext = path.extname(file.originalname); 
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext); 
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { 
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (req.body.image) {
      if (Array.isArray(req.body.image)) { 
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else { 
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User, 
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: User, 
        as: 'Likers',
        attributes: ['id'],
      }]
    })
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});