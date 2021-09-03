const express = require("express");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const { Post, Image, User, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
    // GET /posts
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [["id", "DESC"]],
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
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/popular", async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            limit: parseInt(req.query.limit, 10),
            //attributes: ["id", "title", "rating", "likeCount"],
            order: [
                ["likeCount", "DESC"],
                ["rating", "DESC"],
            ],
            include: [
                {
                    model: Image,
                },
            ],
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/drama", async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            limit: parseInt(req.query.limit, 10),
            where: {
                category: "DRAMA",
            },
            // order: [
            //     ["likeCount", "DESC"],
            //     ["rating", "DESC"],
            // ],
            include: [
                {
                    model: Image,
                },
            ],
        });
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/search/:searchWord", async (req, res, next) => {
    try {
        const searchWord = req.params.searchWord;
        const where = {};
        where.title = { [Op.like]: "%" + searchWord + "%" };
        if (where.title && parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [["id", "DESC"]],
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
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
