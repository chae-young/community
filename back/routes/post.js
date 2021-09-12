const express = require("express");
const router = express.Router();

const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const { upload } = require("./file");

router.post(
    "/",
    upload("uploads").single("singleimage"),
    async (req, res, next) => {
        try {
            const post = await Post.create({
                content: req.body.content,
                title: req.body.title,
                rating: req.body.rating,
                UserId: req.user.id,
                category: req.body.category,
            });

            if (req.body.imagePath) {
                const image = await Image.create({ src: req.body.imagePath });
                await post.addImages(image);
            }

            const fullPost = await Post.findOne({
                where: { id: post.id },
                include: [
                    {
                        model: Image,
                    },
                    {
                        model: Comment,
                        include: [
                            {
                                model: User,
                                attributes: ["id", "nickname"],
                            },
                        ],
                    },
                    {
                        model: User,
                        attributes: ["id", "nickname"],
                    },
                    {
                        model: User,
                        as: "Likers",
                        attributes: ["id"],
                    },
                ],
            });
            res.status(201).json(fullPost);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.get("/:postId", async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [
                {
                    model: User,
                    attributes: ["id", "nickname", "src"],
                },
                {
                    model: Image,
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["id", "nickname", "src"],
                            order: [["createdAt", "DESC"]],
                        },
                    ],
                },
                {
                    model: User,
                    as: "Likers",
                    attributes: ["id"],
                },
            ],
        });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch("/:postId", async (req, res, next) => {
    try {
        await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                rating: req.body.rating,
                category: req.body.category,
            },
            {
                where: { id: req.params.postId },
            }
        );
        const image = await Image.findOne({
            where: { PostId: req.params.postId },
        });

        await Image.update(
            { src: req.body.imagePath },
            { where: { id: image.id } }
        );
        //await post.addImages(image);

        res.status(200).send("ok");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete("/:postId", async (req, res, next) => {
    try {
        const id = parseInt(req.params.postId);
        const image = await Image.findOne({
            where: { PostId: id },
        });

        await Image.destroy({
            where: {
                id: image.id,
            },
        });
        const comment = await Comment.findOne({
            where: { PostId: id },
        });
        if (comment) {
            await Comment.destroy({
                where: {
                    id: comment.id,
                },
            });
        }
        await Post.destroy({
            where: {
                id,
                UserId: req.user.id,
            },
        });
        res.status(200).send("ok");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글입니다.");
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [
                {
                    model: User,
                    attributes: ["id", "nickname", "src"],
                },
            ],
        });
        res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch("/:commentId/comment", async (req, res, next) => {
    try {
        await Comment.update(
            {
                content: req.body.content,
            },
            {
                where: { id: req.params.commentId },
            }
        );
        const post = await Comment.findOne({
            where: { id: req.params.commentId },
            attributes: ["PostId"],
        });
        res.status(201).json({
            CommentId: parseInt(req.params.commentId),
            PostId: post.PostId,
            content: req.body.content,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete("/:commentId/comment", async (req, res, next) => {
    try {
        const post = await Comment.findOne({
            where: { id: req.params.commentId },
            attributes: ["PostId"],
        });
        await Comment.destroy({ where: { id: req.params.commentId } });
        res.status(201).json({
            CommentId: parseInt(req.params.commentId),
            PostId: post.id,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch("/:postId/like", async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(403).send("게시글이 존재하지 않습니다.");
        }
        await Post.update(
            {
                likeCount: req.body.count,
            },
            {
                where: { id: post.id },
            }
        );
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete("/:postId/like", async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send("게시글이 존재하지 않습니다.");
        }
        await Post.update(
            {
                likeCount: req.body.count,
            },
            {
                where: { id: post.id },
            }
        );
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post(
    "/image",
    upload("uploads").single("singleimage"),
    (req, res, next) => {
        // POST /post/images
        console.log(req.file);
        res.json(req.file.location);
    }
);

module.exports = router;
