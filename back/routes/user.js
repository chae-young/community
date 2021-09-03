const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User, Post, Image, Comment } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { upload } = require("./file");

router.get("/", async (req, res, next) => {
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: Post,
                        attributes: ["id"],
                    },
                    {
                        model: User,
                        as: "Followings",
                        attributes: ["id"],
                    },
                    {
                        model: User,
                        as: "Followers",
                        attributes: ["id"],
                    },
                ],
            });
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/:id/posts", async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (user) {
            const where = {};
            if (parseInt(req.query.lastId, 10)) {
                where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
            }
            const posts = await user.getPosts({
                where,
                limit: 10,
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
            res.status(200).json(posts);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/:userId/followers", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            res.status(403).send("존재하지 않는 사용자입니다.");
        }
        const followers = await user.getFollowers({
            attributes: ["id", "nickname", "src"],
            limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/:userId/followings", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            res.status(403).send("존재하지 않는 사용자입니다.");
        }
        const followings = await user.getFollowings({
            attributes: ["id", "nickname", "src"],
            limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const fullUserWithoutPassword = await User.findOne({
            where: { id: req.params.id },
            attributes: {
                exclude: ["password"],
            },
            include: [
                {
                    model: Post,
                    attributes: ["id"],
                },
                {
                    model: User,
                    as: "Followings",
                    attributes: ["id"],
                },
                {
                    model: User,
                    as: "Followers",
                    attributes: ["id"],
                },
            ],
        });
        if (fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;
            data.Followings = data.Followings.length;
            data.Followers = data.Followers.length;
            res.status(200).json(data);
        } else {
            res.status(404).json("존재하지 않는 사용자입니다.");
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: Post,
                        attributes: ["id"],
                    },
                    {
                        model: User,
                        as: "Followings",
                        attributes: ["id"],
                    },
                    {
                        model: User,
                        as: "Followers",
                        attributes: ["id"],
                    },
                ],
            });
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
    // POST /user/
    try {
        const exUser = await User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if (exUser) {
            return res.status(403).send("이미 사용 중인 아이디입니다.");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            userId: req.body.userId,
            name: req.body.name,
            nickname: req.body.nickname,
            password: hashedPassword,
            //src: null,
        });
        res.status(201).send("ok");
    } catch (error) {
        console.error(error);
        next(error); // status 500
    }
});

router.post("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("ok");
});

router.patch(
    "/profile",
    upload("uploads/profile").single("singleimage"),
    async (req, res, next) => {
        try {
            console.log(req.body.image);
            await User.update(
                {
                    nickname: req.body.nickname,
                    src: req.body.image,
                },
                {
                    where: { id: req.user.id },
                }
            );
            res.status(200).json(req.body);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.post(
    "/image",
    upload("uploads/profile").single("singleimage"),
    (req, res, next) => {
        console.log(req.file);
        res.json(req.file.filename);
    }
);

router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            res.status(403).send("존재하지 않는 사용자입니다");
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            res.status(403).send("존재하지 않는 사용자입니다");
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
